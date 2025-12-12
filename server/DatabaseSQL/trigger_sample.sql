USE cinemaDB;

INSERT INTO quy_doi_khuyen_mai (ma_km, ma_khach_hang, ten_tai_khoan) VALUES
('KMQD005', 'KH006', 'hoang_thanh_thanh_diep');
INSERT INTO rap_phim_ap_dung_khuyen_mai(ma_rap_phim,ma_km) VALUES
('R003','KMTQ006');

INSERT INTO quy_doi_khuyen_mai (ma_km, ma_khach_hang, ten_tai_khoan) VALUES
('KMQD006', 'KH006', 'hoang_thanh_thanh_diep');
INSERT INTO rap_phim_ap_dung_khuyen_mai(ma_rap_phim,ma_km) VALUES
('R002','KMTQ005');

INSERT INTO quy_doi_khuyen_mai (ma_km, ma_khach_hang, ten_tai_khoan) VALUES
('KMQD007', 'KH006', 'hoang_thanh_thanh_diep');
INSERT INTO rap_phim_ap_dung_khuyen_mai(ma_rap_phim,ma_km) VALUES
('R002','KMTQ007');

INSERT INTO ve (ma_ve, gia_ve, ma_rap, ma_phong, ma_ghe, ma_luot_chieu, ma_hoa_don, ma_nhan_vien_ban_ve, thoi_gian_thanh_toan, ma_khach_hang) VALUES
('VE013', 120000,'R002', 'P002', 'A10', 'LC005', 'HD0005', 'NV02004', '2025-01-14 11:27:00', 'KH010');
DELETE FROM ve
WHERE ma_ve = 'VE013';

INSERT INTO hoa_don_bao_gom_do_an_thuc_uong (ma_hoa_don, ma_do_an_thuc_uong, so_luong) VALUES
('HD0005', 'DA0011', 2);
DELETE FROM hoa_don_bao_gom_do_an_thuc_uong
WHERE ma_do_an_thuc_uong = 'DA0011';
SELECT ma_hoa_don,tong_tien from hoa_don
where	ma_hoa_don = 'HD0005';
