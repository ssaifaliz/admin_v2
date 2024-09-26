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
  id: string;
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
  value: number;
  label: string;
}

interface Schedule {
  id: number;
  date: string;
  profileId: number;
  shiftId: number;
  deptId: number;
  createdAt: string;
  updatedAt: string;
  department: Department;
  profile: Profile;
  shift: Shift;
  value: number;
  label: string;
  schedule_dept: ScheduleDept;
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
