export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export type Role = "admin" | "teacher" | "parent" | "adult_student";

type Table<Row, Insert = Partial<Row>, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<{ id: string; display_name: string; phone: string | null; preferred_language: "en" | "ar" | "fr"; timezone: string; status: "active" | "inactive" | "archived"; created_at: string; updated_at: string }>;
      user_roles: Table<{ user_id: string; role: Role; granted_by: string | null; created_at: string; revoked_at: string | null }>;
      invitations: Table<{ id: string; email: string; role: Exclude<Role, "admin">; invited_by: string; auth_user_id: string | null; status: string; expires_at: string; accepted_at: string | null; created_at: string }>;
      staff_members: Table<{ id: string; user_id: string; staff_number: string | null; title: string | null; status: "active" | "inactive" | "archived"; started_on: string | null; ended_on: string | null; created_at: string }>;
      students: Table<{ id: string; auth_user_id: string | null; student_number: string | null; display_name: string; preferred_language: "en" | "ar" | "fr"; timezone: string; status: "active" | "inactive" | "archived"; created_at: string; updated_at: string }>;
      student_private_details: Table<{ student_id: string; legal_name: string; date_of_birth: string | null; created_at: string }>;
      guardian_student_relationships: Table<{ id: string; guardian_user_id: string; student_id: string; relationship: string; can_view_academic: boolean; can_view_financial: boolean; can_manage: boolean; created_by: string | null; revoked_at: string | null; created_at: string }>;
      academic_years: Table<{ id: string; name: string; starts_on: string; ends_on: string; status: "active" | "inactive" | "archived" }>;
      terms: Table<{ id: string; academic_year_id: string; name: string; starts_on: string; ends_on: string }>;
      courses: Table<{ id: string; code: string; category: string; active: boolean; created_at: string }>;
      course_translations: Table<{ course_id: string; locale: "en" | "ar" | "fr"; name: string; description: string }>;
      class_groups: Table<{ id: string; course_id: string; term_id: string | null; name: string; capacity: number | null; status: "draft" | "active" | "completed" | "cancelled"; created_at: string }>;
      teacher_assignments: Table<{ id: string; class_group_id: string; staff_member_id: string; starts_on: string; ends_on: string | null; created_at: string }>;
      enrollments: Table<{ id: string; student_id: string; class_group_id: string; status: "active" | "inactive" | "archived"; enrolled_at: string; ended_at: string | null }>;
      schedules: Table<{ id: string; class_group_id: string; weekday: number; local_start: string; duration_minutes: number; timezone: string; starts_on: string; ends_on: string | null; active: boolean }>;
      class_sessions: Table<{ id: string; class_group_id: string; starts_at: string; ends_at: string; status: string; meeting_url: string | null; created_at: string }>;
      attendance: Table<{ id: string; session_id: string; student_id: string; status: "present" | "absent" | "late" | "excused"; note: string | null; recorded_by: string | null; recorded_at: string }>;
      assignments: Table<{ id: string; class_group_id: string; created_by: string; title: string; description: string; due_at: string | null; status: "draft" | "published" | "closed"; created_at: string }>;
      submissions: Table<{ id: string; assignment_id: string; student_id: string; text_response: string | null; submitted_at: string | null; grade: number | null; feedback: string | null; graded_by: string | null; graded_at: string | null }>;
      learning_materials: Table<{ id: string; class_group_id: string; student_id: string | null; uploaded_by: string; title: string; description: string; bucket: string; object_path: string; mime_type: string; size_bytes: number; created_at: string }>;
      progress_entries: Table<{ id: string; student_id: string; course_id: string | null; class_group_id: string | null; author_id: string; skill: string; score: number | null; note: string; created_at: string }>;
      assessments: Table<{ id: string; class_group_id: string; created_by: string; title: string; max_score: number; assessed_at: string }>;
      assessment_results: Table<{ id: string; assessment_id: string; student_id: string; score: number; feedback: string }>;
      invoices: Table<{ id: string; invoice_number: string; billed_to: string; student_id: string | null; currency: string; total_minor: number; status: "draft" | "issued" | "partially_paid" | "paid" | "overdue" | "void"; due_at: string | null; created_at: string }>;
      invoice_items: Table<{ id: string; invoice_id: string; description: string; quantity: number; amount_minor: number }>;
      payments: Table<{ id: string; invoice_id: string; provider: string; provider_reference: string; amount_minor: number; currency: string; status: "pending" | "succeeded" | "failed" | "refunded"; paid_at: string | null; created_at: string }>;
      conversations: Table<{ id: string; student_id: string | null; created_by: string; created_at: string; last_message_at: string | null; last_message_preview: string | null }>;
      conversation_participants: Table<{ conversation_id: string; user_id: string }>;
      messages: Table<{ id: string; conversation_id: string; sender_id: string; body: string; created_at: string }>;
      notifications: Table<{ id: string; user_id: string; event_type: string; source_key: string | null; title: string; body: string; href: string | null; read_at: string | null; created_at: string }>;
      notification_outbox: Table<{ id: string; event_type: string; recipient_id: string; payload: Json; idempotency_key: string; status: string; attempts: number; available_at: string; created_at: string }>;
      files: Table<{ id: string; bucket: string; object_path: string; uploaded_by: string; purpose: string; mime_type: string; size_bytes: number; created_at: string }>;
      audit_logs: Table<{ id: number; actor_id: string | null; action: string; target_table: string; target_id: string | null; safe_details: Json; created_at: string }>;
      system_settings: Table<{ key: string; value: Json; updated_by: string | null; updated_at: string }>;
    };
    Views: Record<string, never>;
    Functions: {
      has_role: { Args: { required_role: Role }; Returns: boolean };
      is_guardian_of: { Args: { target_student: string; academic?: boolean }; Returns: boolean };
      is_teacher_of: { Args: { target_group: string }; Returns: boolean };
      is_enrolled_in: { Args: { target_group: string; target_student?: string | null }; Returns: boolean };
      is_classmate: { Args: { target_student: string; target_group: string }; Returns: boolean };
      grade_submission: { Args: { target_submission: string; new_grade: number; new_feedback: string }; Returns: undefined };
      start_student_conversation: { Args: { target_student: string; target_recipient: string; first_message: string }; Returns: string };
    };
    Enums: {
      account_role: Role;
      record_status: "active" | "inactive" | "archived";
      class_status: "draft" | "active" | "completed" | "cancelled";
      attendance_status: "present" | "absent" | "late" | "excused";
      work_status: "draft" | "published" | "closed";
      invoice_status: "draft" | "issued" | "partially_paid" | "paid" | "overdue" | "void";
      payment_status: "pending" | "succeeded" | "failed" | "refunded";
    };
    CompositeTypes: Record<string, never>;
  };
};
