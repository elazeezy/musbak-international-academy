import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Role } from "@/lib/supabase/database.types";

export type PortalRecord = { id: string; title: string; detail: string; status?: string; group?: string; created_at?: string; bucket?: string; object_path?: string };

export async function getPortalRecords(role: Role, userId: string, section: string, childId?: string): Promise<{ records: PortalRecord[]; classes: { id: string; name: string }[]; students: { id: string; name: string }[]; selectedChild?: string; error?: string }> {
  const db = await createSupabaseServerClient();
  let groupIds: string[] = [];
  let studentIds: string[] = [];
  let selectedChild: string | undefined;
  const classes: { id: string; name: string }[] = [];
  const students: { id: string; name: string }[] = [];

  if (role === "teacher") {
    const { data: staff, error } = await db.from("staff_members").select("id").eq("user_id", userId).maybeSingle();
    if (error) return { records: [], classes, students, error: error.message };
    if (staff) {
      const assignments = await db.from("teacher_assignments").select("class_group_id").eq("staff_member_id", staff.id);
      if (assignments.error) return { records: [], classes, students, error: assignments.error.message };
      groupIds = [...new Set((assignments.data ?? []).map((item) => item.class_group_id))];
    }
    if (groupIds.length) {
      const [groups, enrollments] = await Promise.all([
        db.from("class_groups").select("id,name").in("id", groupIds),
        db.from("enrollments").select("student_id").in("class_group_id", groupIds).eq("status", "active"),
      ]);
      for (const group of groups.data ?? []) classes.push({ id: group.id, name: group.name });
      studentIds = [...new Set((enrollments.data ?? []).map((item) => item.student_id))];
    }
  } else if (role === "parent") {
    const links = await db.from("guardian_student_relationships").select("student_id").eq("guardian_user_id", userId).is("revoked_at", null);
    if (links.error) return { records: [], classes, students, error: links.error.message };
    const linkedIds = [...new Set((links.data ?? []).map((item) => item.student_id))];
    if (childId) {
      if (!linkedIds.includes(childId)) return { records: [], classes, students, error: "You do not have access to this student." };
      studentIds = [childId]; selectedChild = childId;
    } else studentIds = linkedIds;
  } else {
    const student = await db.from("students").select("id").eq("auth_user_id", userId).maybeSingle();
    if (student.error) return { records: [], classes, students, error: student.error.message };
    if (student.data) studentIds = [student.data.id];
  }

  if (studentIds.length) {
    const [people, enrollments] = await Promise.all([
      db.from("students").select("id,display_name").in("id", studentIds),
      db.from("enrollments").select("class_group_id").in("student_id", studentIds).eq("status", "active"),
    ]);
    for (const person of people.data ?? []) students.push({ id: person.id, name: person.display_name });
    groupIds = [...new Set([...groupIds, ...(enrollments.data ?? []).map((item) => item.class_group_id)])];
    if (groupIds.length) {
      const { data } = await db.from("class_groups").select("id,name").in("id", groupIds);
      for (const group of data ?? []) if (!classes.some((item) => item.id === group.id)) classes.push({ id: group.id, name: group.name });
    }
  }

  let records: PortalRecord[] = [];
  if (section === "classes") {
    const { data, error } = groupIds.length ? await db.from("class_groups").select("id,name,status,course_id,capacity").in("id", groupIds).order("name").limit(100) : { data: [], error: null };
    if (error) return { records, classes, students, selectedChild, error: error.message };
    const courses = data?.length ? await db.from("courses").select("id,code").in("id", [...new Set(data.map((item) => item.course_id))]) : { data: [] };
    const courseNames = new Map((courses.data ?? []).map((item) => [item.id, item.code]));
    records = (data ?? []).map((item) => ({ id: item.id, title: item.name, detail: `${courseNames.get(item.course_id) ?? "Course"}${item.capacity ? ` · ${item.capacity} places` : ""}`, status: item.status }));
  } else if (section === "schedule") {
    const request = groupIds.length ? db.from("class_sessions").select("id,class_group_id,starts_at,ends_at,status").in("class_group_id", groupIds).order("starts_at", { ascending: true }).limit(100) : null;
    const { data, error } = request ? await request : { data: [], error: null };
    if (error) return { records, classes, students, selectedChild, error: error.message };
    const classNames = new Map(classes.map((item) => [item.id, item.name]));
    records = (data ?? []).map((item) => ({ id: item.id, title: classNames.get(item.class_group_id) ?? "Class session", detail: `${new Date(item.starts_at).toLocaleString()} – ${new Date(item.ends_at).toLocaleTimeString()}`, status: item.status }));
  } else if (section === "attendance") {
    const request = studentIds.length ? db.from("attendance").select("id,student_id,session_id,status,recorded_at").in("student_id", studentIds).order("recorded_at", { ascending: false }).limit(100) : null;
    const { data, error } = request ? await request : { data: [], error: null };
    if (error) return { records, classes, students, selectedChild, error: error.message };
    const people = new Map(students.map((item) => [item.id, item.name]));
    records = (data ?? []).map((item) => ({ id: item.id, title: people.get(item.student_id) ?? "Attendance", detail: new Date(item.recorded_at).toLocaleString(), status: item.status }));
  } else if (section === "assignments") {
    const request = groupIds.length ? db.from("assignments").select("id,class_group_id,title,description,due_at,status").in("class_group_id", groupIds).order("created_at", { ascending: false }).limit(100) : null;
    const { data, error } = request ? await request : { data: [], error: null };
    if (error) return { records, classes, students, selectedChild, error: error.message };
    const classNames = new Map(classes.map((item) => [item.id, item.name]));
    records = (data ?? []).map((item) => ({ id: item.id, title: item.title, detail: `${classNames.get(item.class_group_id) ?? "Class"}${item.due_at ? ` · Due ${new Date(item.due_at).toLocaleString()}` : ""}${item.description ? ` · ${item.description}` : ""}`, status: item.status, group: item.class_group_id }));
  } else if (section === "progress") {
    const request = studentIds.length ? db.from("progress_entries").select("id,student_id,skill,score,note,created_at").in("student_id", studentIds).order("created_at", { ascending: false }).limit(100) : null;
    const { data, error } = request ? await request : { data: [], error: null };
    if (error) return { records, classes, students, selectedChild, error: error.message };
    const people = new Map(students.map((item) => [item.id, item.name]));
    records = (data ?? []).map((item) => ({ id: item.id, title: `${people.get(item.student_id) ?? "Student"} · ${item.skill}`, detail: `${item.note}${item.score !== null ? ` · ${item.score}%` : ""}`, created_at: item.created_at }));
  } else if (section === "payments") {
    const request = role === "parent" && studentIds.length ? db.from("invoices").select("id,invoice_number,total_minor,currency,status,due_at,student_id").in("student_id", studentIds).order("created_at", { ascending: false }).limit(100) : null;
    const { data, error } = request ? await request : { data: [], error: null };
    if (error) return { records, classes, students, selectedChild, error: error.message };
    const people = new Map(students.map((item) => [item.id, item.name]));
    records = (data ?? []).map((item) => ({ id: item.id, title: item.invoice_number, detail: `${people.get(item.student_id ?? "") ?? "Invoice"} · ${new Intl.NumberFormat("en", { style: "currency", currency: item.currency }).format(item.total_minor / 100)}${item.due_at ? ` · Due ${new Date(item.due_at).toLocaleDateString()}` : ""}`, status: item.status }));
  } else if (section === "materials") {
    const request = groupIds.length ? db.from("learning_materials").select("id,title,description,created_at").in("class_group_id", groupIds).order("created_at", { ascending: false }).limit(100) : null;
    const { data, error } = request ? await request : { data: [], error: null };
    if (error) return { records, classes, students, selectedChild, error: error.message };
    records = (data ?? []).map((item) => ({ id: item.id, title: item.title, detail: item.description || "Shared learning material", created_at: item.created_at }));
  }
  return { records, classes, students, selectedChild };
}
