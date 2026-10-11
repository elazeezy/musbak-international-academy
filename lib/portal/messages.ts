import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Role } from "@/lib/supabase/database.types";

export type MessageStartOption = { value: string; label: string; studentId: string; recipientId: string };

/** Returns only counterpart options justified by the caller's current academy relationships. */
export async function getMessageStartOptions(userId: string, roles: Role[]): Promise<MessageStartOption[]> {
  const db = createSupabaseAdminClient();
  const groups = new Set<string>();
  const students = new Map<string, string>();
  const recipients = new Map<string, Map<string, string>>();
  const today = new Date().toISOString().slice(0, 10);

  if (roles.includes("teacher")) {
    const { data: staff } = await db.from("staff_members").select("id").eq("user_id", userId).eq("status", "active").maybeSingle();
    const assignments = staff ? await db.from("teacher_assignments").select("class_group_id").eq("staff_member_id", staff.id).lte("starts_on", today).or(`ends_on.is.null,ends_on.gte.${today}`) : { data: [] };
    const assignedGroupIds = [...new Set((assignments.data ?? []).map((row) => row.class_group_id))];
    const activeGroups = assignedGroupIds.length ? await db.from("class_groups").select("id").in("id", assignedGroupIds).eq("status", "active") : { data: [] };
    for (const group of activeGroups.data ?? []) groups.add(group.id);
    const groupIds = [...groups];
    const enrollments = groupIds.length ? await db.from("enrollments").select("student_id").in("class_group_id", groupIds).eq("status", "active") : { data: [] };
    const studentIds = [...new Set((enrollments.data ?? []).map((row) => row.student_id))];
    const people = studentIds.length ? await db.from("students").select("id,display_name,auth_user_id").in("id", studentIds).eq("status", "active") : { data: [] };
    for (const person of people.data ?? []) students.set(person.id, person.display_name);
    const links = studentIds.length ? await db.from("guardian_student_relationships").select("student_id,guardian_user_id").in("student_id", studentIds).eq("can_view_academic", true).is("revoked_at", null) : { data: [] };
    const parentIds = [...new Set((links.data ?? []).map((row) => row.guardian_user_id))];
    const parents = parentIds.length ? await db.from("user_roles").select("user_id").in("user_id", parentIds).eq("role", "parent").is("revoked_at", null) : { data: [] };
    const activeParentIds = new Set((parents.data ?? []).map((row) => row.user_id));
    const adultIds = [...new Set((people.data ?? []).flatMap((row) => row.auth_user_id ? [row.auth_user_id] : []))];
    const adults = adultIds.length ? await db.from("user_roles").select("user_id").in("user_id", adultIds).eq("role", "adult_student").is("revoked_at", null) : { data: [] };
    const activeAdultIds = new Set((adults.data ?? []).map((row) => row.user_id));
    const recipientIds = [...new Set([...links.data ?? []].filter((row) => activeParentIds.has(row.guardian_user_id)).map((row) => row.guardian_user_id).concat((people.data ?? []).flatMap((row) => row.auth_user_id && activeAdultIds.has(row.auth_user_id) ? [row.auth_user_id] : [])))];
    const profiles = recipientIds.length ? await db.from("profiles").select("id,display_name,status").in("id", recipientIds).eq("status", "active") : { data: [] };
    const names = new Map((profiles.data ?? []).map((row) => [row.id, row.display_name]));
    for (const link of links.data ?? []) if (activeParentIds.has(link.guardian_user_id) && names.has(link.guardian_user_id)) {
      const byStudent = recipients.get(link.student_id) ?? new Map<string, string>(); byStudent.set(link.guardian_user_id, names.get(link.guardian_user_id) ?? "Parent"); recipients.set(link.student_id, byStudent);
    }
    for (const person of people.data ?? []) if (person.auth_user_id && activeAdultIds.has(person.auth_user_id) && names.has(person.auth_user_id)) {
      const byStudent = recipients.get(person.id) ?? new Map<string, string>(); byStudent.set(person.auth_user_id, names.get(person.auth_user_id) ?? "Student"); recipients.set(person.id, byStudent);
    }
  }

  if (roles.includes("parent")) {
    const links = await db.from("guardian_student_relationships").select("student_id").eq("guardian_user_id", userId).eq("can_view_academic", true).is("revoked_at", null);
    const studentIds = [...new Set((links.data ?? []).map((row) => row.student_id))];
    const people = studentIds.length ? await db.from("students").select("id,display_name").in("id", studentIds).eq("status", "active") : { data: [] };
    for (const person of people.data ?? []) students.set(person.id, person.display_name);
    await addAssignedTeachers(db, studentIds, recipients);
  }

  if (roles.includes("adult_student")) {
    const { data: people } = await db.from("students").select("id,display_name").eq("auth_user_id", userId).eq("status", "active").maybeSingle();
    if (people) {
      students.set(people.id, people.display_name);
      await addAssignedTeachers(db, [people.id], recipients);
    }
  }

  return [...students.entries()].flatMap(([studentId, studentName]) => [...(recipients.get(studentId)?.entries() ?? [])].filter(([recipientId]) => recipientId !== userId).map(([recipientId, recipientName]) => ({
    value: `${studentId}:${recipientId}`,
    studentId,
    recipientId,
    label: `${studentName} · ${recipientName}`,
  }))).sort((left, right) => left.label.localeCompare(right.label));
}

async function addAssignedTeachers(db: ReturnType<typeof createSupabaseAdminClient>, studentIds: string[], recipients: Map<string, Map<string, string>>) {
  if (!studentIds.length) return;
  const today = new Date().toISOString().slice(0, 10);
  const enrollments = await db.from("enrollments").select("student_id,class_group_id").in("student_id", studentIds).eq("status", "active");
  const enrollmentGroupIds = [...new Set((enrollments.data ?? []).map((row) => row.class_group_id))];
  const groups = enrollmentGroupIds.length ? await db.from("class_groups").select("id").in("id", enrollmentGroupIds).eq("status", "active") : { data: [] };
  const groupIds = new Set((groups.data ?? []).map((row) => row.id));
  const activeEnrollments = (enrollments.data ?? []).filter((row) => groupIds.has(row.class_group_id));
  const assignments = groupIds.size ? await db.from("teacher_assignments").select("class_group_id,staff_member_id").in("class_group_id", [...groupIds]).lte("starts_on", today).or(`ends_on.is.null,ends_on.gte.${today}`) : { data: [] };
  const staffIds = [...new Set((assignments.data ?? []).map((row) => row.staff_member_id))];
  const staff = staffIds.length ? await db.from("staff_members").select("id,user_id").in("id", staffIds).eq("status", "active") : { data: [] };
  const teacherIds = [...new Set((staff.data ?? []).map((row) => row.user_id))];
  const [roles, profiles] = await Promise.all([
    teacherIds.length ? db.from("user_roles").select("user_id").in("user_id", teacherIds).eq("role", "teacher").is("revoked_at", null) : Promise.resolve({ data: [] }),
    teacherIds.length ? db.from("profiles").select("id,display_name,status").in("id", teacherIds).eq("status", "active") : Promise.resolve({ data: [] }),
  ]);
  const activeTeacherIds = new Set((roles.data ?? []).map((row) => row.user_id));
  const names = new Map((profiles.data ?? []).map((row) => [row.id, row.display_name]));
  const staffUserIds = new Map((staff.data ?? []).map((row) => [row.id, row.user_id]));
  const studentByGroup = new Map<string, string[]>();
  for (const enrollment of activeEnrollments) studentByGroup.set(enrollment.class_group_id, [...(studentByGroup.get(enrollment.class_group_id) ?? []), enrollment.student_id]);
  for (const assignment of assignments.data ?? []) {
    const teacherId = staffUserIds.get(assignment.staff_member_id);
    if (!teacherId || !activeTeacherIds.has(teacherId) || !names.has(teacherId)) continue;
    for (const studentId of studentByGroup.get(assignment.class_group_id) ?? []) {
      const byStudent = recipients.get(studentId) ?? new Map<string, string>(); byStudent.set(teacherId, names.get(teacherId) ?? "Teacher"); recipients.set(studentId, byStudent);
    }
  }
}
