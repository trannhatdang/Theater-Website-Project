
-- ===========Lỗi============ 
-- Lương âm
CALL thu_tuc_tim_kiem_nhan_vien_nang_cao(NULL, NULL, -5000, NULL, NULL, NULL, NULL, NULL);
-- Lương tối thiểu lớn hơn lương tối đa
CALL thu_tuc_tim_kiem_nhan_vien_nang_cao(NULL, NULL, 20000, 10000, NULL, NULL, NULL, NULL);
-- Sai giới tính
CALL thu_tuc_tim_kiem_nhan_vien_nang_cao(NULL, 'Gay', NULL, NULL, NULL, NULL, NULL, NULL);
-- Sắp xếp sai
CALL thu_tuc_tim_kiem_nhan_vien_nang_cao(NULL, NULL, NULL, NULL, NULL, NULL, 'ten', 'ABC');

- ==========Thành công============
CALL thu_tuc_tim_kiem_nhan_vien_nang_cao('Lam', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
CALL thu_tuc_tim_kiem_nhan_vien_nang_cao(NULL, 'Nu', NULL, NULL, NULL, 'Dĩ An', NULL, NULL);
CALL thu_tuc_tim_kiem_nhan_vien_nang_cao(NULL, NULL, 13000, 14000, 'NhanVien', NULL, NULL, NULL);
CALL thu_tuc_tim_kiem_nhan_vien_nang_cao(NULL, NULL, NULL, NULL, NULL, NULL, 'luong', 'DESC');
CALL thu_tuc_tim_kiem_nhan_vien_nang_cao(NULL, 'Nam', 10000, NULL, NULL, 'Hồ Chí Minh', 'ngay_sinh', 'ASC');         