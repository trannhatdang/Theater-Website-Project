- ============Lỗi===============
-- Tháng không nằm trong từ 1-12
CALL thu_tuc_thong_ke_hieu_suat_nhan_vien(13, 2025, 0);
-- Doanh thu là số âm
CALL thu_tuc_thong_ke_hieu_suat_nhan_vien(1, 2025, -1000);
-- Năm chưa tới
CALL thu_tuc_thong_ke_hieu_suat_nhan_vien(1, 2030, 0);
- ========Thành công============
CALL thu_tuc_thong_ke_hieu_suat_nhan_vien(NULL, 2025, 0);
CALL thu_tuc_thong_ke_hieu_suat_nhan_vien(12, 2025, 0);
CALL thu_tuc_thong_ke_hieu_suat_nhan_vien(5, 2025, 0);