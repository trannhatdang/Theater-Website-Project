-- === Thành công ===
CALL thu_tuc_them_nhan_vien('NV001', 'Nguyen Van A', '1234562890', '0912345678', '1995-05-01', 'Nam', 20000, 'Nhân viên', 'Hà Nội', NULL, 'R001');
CALL thu_tuc_them_nhan_vien('NV01020', 'Le Thi B', '1987854321', '0987654321', '1990-03-15', 'Nữ', 35000, 'Nhân viên', 'Hà Nội', 'QL01001', 'R001');

-- === Lỗi ===

-- Mã nhân viên trùng
CALL thu_tuc_them_nhan_vien('NV001', 'Tran Van C', '1234567890', '0912345678', '1995-01-01', 'Nam', 20000, 'Nhân viên', 'HN', NULL, 'R001');

-- Tuổi < 18
CALL thu_tuc_them_nhan_vien('NV003', 'Nguyen Van D', '1234567890', '0912345678', '2010-01-01', 'Nam', 20000, 'Nhân viên', 'HN', NULL, 'R001');

-- SĐT không đúng 10 số
CALL thu_tuc_them_nhan_vien('NV004', 'Le Van E', '1234567890', '091234567', '1995-01-01', 'Nam', 20000, 'Nhân viên', 'HN', NULL, 'R001');

-- Lương < 0
CALL thu_tuc_them_nhan_vien('NV005', 'Pham Van F', '1234567890', '0912345678', '1995-01-01', 'Nam', -1000, 'Nhân viên', 'HN', NULL, 'R001');

-- Lương > 45000
CALL thu_tuc_them_nhan_vien('NV006', 'Hoang Van G', '1234567890', '0912345678', '1995-01-01', 'Nam', 50000, 'Nhân viên', 'HN', NULL, 'R001');

-- CCCD không đúng 10 số
CALL thu_tuc_them_nhan_vien('NV007', 'Nguyen Van H', '12345', '0912345678', '1995-01-01', 'Nam', 20000, 'Nhân viên', 'HN', NULL, 'R001');

-- Mã rạp không tồn tại
CALL thu_tuc_them_nhan_vien('NV008', 'Tran Van I', '1234567890', '0912345678', '1995-01-01', 'Nam', 20000, 'Nhân viên', 'HN', NULL, 'R999');


-- === Thành công ===
CALL thu_tuc_cap_nhat_nhan_vien('NV01001', '0911111111', 'HN mới', 22000, 'R001', 'QL02001');

-- === Lỗi ===

-- Mã nhân viên không tồn tại
CALL thu_tuc_cap_nhat_nhan_vien('NV999', '0911111111', 'HN mới', 22000, 'R001', 'NV002');

-- SĐT sai định dạng
CALL thu_tuc_cap_nhat_nhan_vien('NV001', '09111', 'HN mới', 22000, 'R001', 'NV002');

-- Lương < 0
CALL thu_tuc_cap_nhat_nhan_vien('NV001', '0911111111', 'HN mới', -1000, 'R001', 'NV002');

-- Lương > 45000
CALL thu_tuc_cap_nhat_nhan_vien('NV001', '0911111111', 'HN mới', 50000, 'R001', 'NV002');

-- Mã rạp không tồn tại
CALL thu_tuc_cap_nhat_nhan_vien('NV001', '0911111111', 'HN mới', 22000, 'R999', 'NV002');

-- Nhân viên tự quản lý chính mình
CALL thu_tuc_cap_nhat_nhan_vien('NV001', '0911111111', 'HN mới', 22000, 'R001', 'NV001');

-- Mã nhân viên quản lý không tồn tại
CALL thu_tuc_cap_nhat_nhan_vien('NV001', '0911111111', 'HN mới', 22000, 'R001', 'NV999');


-- === Thành công ===
CALL thu_tuc_xoa_nhan_vien('NV01020'); -- giả sử NV002 không quản lý ai và không có ca làm việc

-- === Lỗi ===

-- Mã nhân viên không tồn tại
CALL thu_tuc_xoa_nhan_vien('NV999');

-- Nhân viên đang quản lý người khác
CALL thu_tuc_xoa_nhan_vien('QL01001'); -- giả sử NV001 là quản lý NV002

-- Nhân viên đang có ca làm việc
CALL thu_tuc_xoa_nhan_vien('NV01001'); -- giả sử NV003 có ca làm việc trong ca_lam_viec
