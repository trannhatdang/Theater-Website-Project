export interface EmployeeProps {
  ma_nv: string;
  cccd: string;
  ten: string;
  luong: number;
  ngay_sinh: Date;
  chuc_vu: string;
  dia_chi: string;
  sdt: string;
  gioi_tinh: string;
  ma_nv_quan_ly: string;
  ma_rap_phim: string;
}

export type EmployeeFilters = {
  ma_nv?: string;
  cccd?: string;
  ten?: string;
  min_luong?: number;
  max_luong?: number;
  min_ngay_sinh?: Date;
  max_ngay_sinh?: Date;
  chuc_vu?: string;
  dia_chi?: string;
  sdt?: string;
  gioi_tinh?: string;
  ma_nv_quan_ly?: string;
  ma_rap_phim?: string;
};