interface Locations {
  id: number;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface Department {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface Position {
  createdAt: string;
  deletedAt: string | null;
  id: string;
  title: string;
  updatedAt: string;
}

interface Permission {
  created_at: string;
  deleted_at: string | null;
  id: string;
  title: string;
  updated_at: string;
}

interface Role {
  id: number;
  title: string;
  code_name: string;
  permission: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  value: number;
  label: string;
}

interface Shift {
  created_at: string;
  deleted_at: string | null;
  end_time: string;
  id: number;
  shift_name: string;
  shift_type: string;
  start_time: string;
  updated_at: string;
}

interface Schedule_dept {
  city: string;
  dept_name: string;
  deptid: number;
  hospitalname: string;
  state: string;
}

interface Profile {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string | null;
  role_id: number;
  prefered_language: string;
  is_admin: boolean;
  is_active: boolean;
  created_by: number | null;
  designation: string;
  title: string;
  contact_number: string;
  department_id: number;
  location_id: number;
  position_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  Department: Department;
  Location: Location;
  Position: Position;
  Role: Role;
}

interface Schedule {
  id: number;
  hours_worked: number;
  overtime_hours: number;
  start_date_id: number;
  end_date_id: number;
  shift_id: number;
  start_time: string | null;
  end_time: string | null;
  user_id: number;
  leave_id: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  Profile: Profile;
  StartDate: PrefilledDate;
  EndDate: PrefilledDate;
  Shift: Shift;
}

interface PrefilledDate {
  id: number;
  full_date: string;
  day_of_week: number;
  week_in_a_year: number;
  day_of_year: number;
  is_holiday: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  value: string;
  label: string;
}

interface ScheduleDept {
  deptid: number;
  dept_name: string;
  hospitalname: string;
  city: string;
  state: string;
}

interface ScheduleInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  birthdate: string;
  profilePicture: string | null;
  emp_id: number;
  userId: number;
  deptId: number;
  positionId: number;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  department: Department;
  position: Position;
  role: Role;
  schedules: Schedule[];
}

interface SwapRequest {
  id: number;
  status: string;
  message: string | null;
  requested_by: number;
  requested_to: number;
  requested_shift_swap: number | null;
  original_schedule_id: number;
  requested_schedule_id: number;
  approved_by: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  ByProfile: Profile;
  ToProfile: Profile;
  OriginalSchedule: Schedule;
  RequestedSchedule: Schedule;
}

interface Leave {
  id: number;
  leave_type: string;
  start_date_id: number;
  end_date_id: number;
  total_days: number;
  total_holidays: number;
  approved_by: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
