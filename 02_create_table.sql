CREATE database myDB;
use myDB;

# tao rap
CREATE TABLE rap_phim (
	ma_rap VARCHAR(10) PRIMARY KEY,
    ten VARCHAR(100),
    dia_chi VARCHAR(255),
    sdt VARCHAR(10),
    so_phong INT
);

CREATE TABLE phong_chieu_phim (
    ma_rap VARCHAR(10) NOT NULL,
    ma_phong VARCHAR(10)  NOT NULL,
    so_ghe INT,
    
	PRIMARY KEY(ma_rap,ma_phong),
    
    FOREIGN KEY (ma_rap) REFERENCES rap_phim(ma_rap)
);

CREATE TABLE ghe(
	ma_rap VARCHAR(10)  NOT NULL,
    ma_phong VARCHAR(10) NOT NULL,
    ma_ghe VARCHAR(3) NOT NULL,
    loai_ghe VARCHAR(10) NOT NULL,
    
    PRIMARY KEY(ma_rap,ma_phong,ma_ghe),
    
    FOREIGN KEY (ma_rap,ma_phong) REFERENCES phong_chieu_phim(ma_rap,ma_phong)
);

#tao nhan vien
CREATE TABLE nhan_vien (
	ma_nv VARCHAR(10) PRIMARY KEY,
    ten VARCHAR(50),
    cccd VARCHAR(15) NOT NULL,
    sdt VARCHAR(10),
    ngay_sinh date,
    gioi_tinh VARCHAR(3),
    luong INT CHECK(luong >0),
    chuc_vu VARCHAR(50),
    dia_chi VARCHAR(100),
	ma_nv_quan_ly VARCHAR(10) ,
    ma_rap_phim VARCHAR(10) NOT NULL,
   
    FOREIGN KEY (ma_rap_phim) REFERENCES rap_phim(ma_rap)
);

CREATE TABLE quan_tri_vien(
	ma_nv VARCHAR(10) PRIMARY KEY,
    
    FOREIGN KEY (ma_nv) REFERENCES nhan_vien(ma_nv)
);

CREATE TABLE nhan_vien_ban_hang(
	ma_nv VARCHAR(10) PRIMARY KEY,
    
    FOREIGN KEY (ma_nv) REFERENCES nhan_vien(ma_nv)
);


CREATE TABLE ca_lam_viec(
	ma_nv VARCHAR(10) NOT NULL,
    ca_lam_viec VARCHAR(100) NOT NULL,
    ngay_lam DATE NOT NULL  ,
    thoi_gian_lam INT DEFAULT 8,
    
    PRIMARY KEY(ma_nv,ca_lam_viec),
    FOREIGN KEY (ma_nv) REFERENCES nhan_vien(ma_nv)
);


ALTER TABLE nhan_vien
ADD CONSTRAINT fk_nv_quan_ly
FOREIGN KEY (ma_nv_quan_ly) REFERENCES quan_tri_vien(ma_nv);

#tao khach hang
CREATE TABLE khach_hang(
	ma_khach_hang VARCHAR(10) PRIMARY KEY auto_increment,
    ten VARCHAR(50),
    sdt VARCHAR(10),
    gioi_tinh VARCHAR(3),
    email VARCHAR(100)
);

CREATE TABLE cap_do(
	cap INT PRIMARY KEY auto_increment,
    so_diem_can INT ,
    ten_cap_do VARCHAR(20)
);

CREATE TABLE tai_khoan_khach_hang(
	ten_tai_khoan VARCHAR(50) NOT NULL,
    ma_khach_hang VARCHAR(10) NOT NULL,
    mat_khau VARCHAR(50),
    cap INT,
    so_diem_tich_duoc INT ,
    so_diem_can_len_cap INT,
    
    PRIMARY KEY(ten_tai_khoan,ma_khach_hang),
    FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang),
    FOREIGN KEY (cap) REFERENCES cap_do(cap)
);

#tao phim
CREATE TABLE phim(
	ma_phim VARCHAR(10) PRIMARY KEY,
    ten_phim VARCHAR(100),
    thoi_luong TIME,
    do_tuoi_yeu_cau INT,
    thoi_gian_cong_chieu DATE,
    tom_tat_noi_dung VARCHAR(1000),
    dao_dien VARCHAR(50)
);

CREATE TABLE the_loai(
	ma_phim VARCHAR(10) NOT NULL,
    the_loai VARCHAR(100) NOT NULL,
    PRIMARY KEY(ma_phim,the_loai),
    
    FOREIGN KEY (ma_phim) REFERENCES phim(ma_phim)
);

CREATE TABLE dien_vien(
	ma_phim VARCHAR(10) NOT NULL,
    dien_vien VARCHAR(50) NOT NULL,
    PRIMARY KEY(ma_phim,dien_vien),
    
    FOREIGN KEY (ma_phim) REFERENCES phim(ma_phim)
);

CREATE TABLE suat_chieu(
	ma_luot_chieu VARCHAR(10) PRIMARY KEY,
    thoi_gian_bat_dau DATETIME,
    thoi_gian_ket_thuc DATETIME,
    hinh_thuc_chieu VARCHAR(10),
    ngon_ngu VARCHAR(20),
    phu_de_hoac_long_tieng VARCHAR(10),
    ma_phim VARCHAR(10) NOT NULL,
	ma_rap VARCHAR(10) NOT NULL,
    ma_phong_chieu VARCHAR(10) NOT NULL,
    ma_nhan_vien_quan_ly VARCHAR(10) NOT NULL,

	FOREIGN KEY (ma_phim) REFERENCES phim(ma_phim),
    FOREIGN KEY (ma_nhan_vien_quan_ly) REFERENCES quan_tri_vien(ma_nv),
    FOREIGN KEY (ma_rap,ma_phong_chieu) REFERENCES phong_chieu_phim(ma_rap,ma_phong)
);

#tao khuyen mai
CREATE TABLE khuyen_mai(
	ma_km VARCHAR(10) PRIMARY KEY,
    ten_km VARCHAR(50),
    loai_km VARCHAR(50),
    thoi_gian_bat_dau DATE	NOT NULL,
    thoi_gian_ket_thuc DATE NOT NULL,
    gia_tri INT,
    ma_nv_quan_ly VARCHAR(10),
    FOREIGN KEY (ma_nv_quan_ly) REFERENCES quan_tri_vien(ma_nv)
);

CREATE TABLE khuyen_mai_toan_rap(
	ma_km VARCHAR(10) PRIMARY KEY,
    
    FOREIGN KEY(ma_km) REFERENCES khuyen_mai(ma_km)
);

CREATE TABLE khuyen_mai_quy_doi(
	ma_km VARCHAR(10) PRIMARY KEY,
    
    FOREIGN KEY (ma_km) REFERENCES khuyen_mai(ma_km)
);

CREATE TABLE rap_phim_ap_dung_khuyen_mai(
	ma_rap_phim VARCHAR(10) NOT NULL,
    ma_km VARCHAR(10) NOT NULL,
    
    PRIMARY KEY(ma_rap_phim,ma_km),
    FOREIGN KEY (ma_rap_phim) REFERENCES rap_phim(ma_rap),
    FOREIGN KEY (ma_km) REFERENCES khuyen_mai_toan_rap(ma_km)
);

CREATE TABLE quy_doi_khuyen_mai(
	ma_km VARCHAR(10) NOT NULL,
    ma_khach_hang VARCHAR(10) NOT NULL,
    ten_tai_khoan VARCHAR(50) NOT NULL,
    
    PRIMARY KEY(ma_km,ma_khach_hang,ten_tai_khoan),
    FOREIGN KEY (ma_km) REFERENCES khuyen_mai_quy_doi(ma_km),
    FOREIGN KEY (ten_tai_khoan, ma_khach_hang) REFERENCES tai_khoan_khach_hang(ten_tai_khoan, ma_khach_hang)

);

CREATE TABLE do_an_thuc_uong(
	ma_sp VARCHAR(10) PRIMARY KEY,
    ten VARCHAR(100),
    kich_co INT ,
    gia_tien INT check(gia_tien >= 0),
    ma_nhan_vien_phuc_vu VARCHAR(10) NOT NULL,
    ma_khach_hang VARCHAR(10),
    
    FOREIGN KEY (ma_nhan_vien_phuc_vu) REFERENCES nhan_vien_ban_hang(ma_nv),
    FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang)
);

#tao hoa don
CREATE TABLE hoa_don(
	ma_hoa_don VARCHAR(10) PRIMARY KEY,
	trang_thai_thanh_toan BOOLEAN NOT NULL,
    thoi_gian DATETIME,
    phuong_thuc_thanh_toan VARCHAR(20),
    ma_nhan_vien_phu_trach VARCHAR(10),
    ma_khach_hang VARCHAR(10),
    ma_km VARCHAR(10),
    tong_tien INT,
    
    FOREIGN KEY (ma_nhan_vien_phu_trach) REFERENCES nhan_vien_ban_hang(ma_nv),
    FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang),
    FOREIGN KEY (ma_km) REFERENCES khuyen_mai(ma_km)
);

CREATE TABLE hoa_don_bao_gom_do_an_thuc_uong(
    ma_hoa_don VARCHAR(10) NOT NULL,
    ma_do_an_thuc_uong VARCHAR(10) NOT NULL,
    so_luong int CHECK (so_luong > 0),

    PRIMARY KEY(ma_hoa_don,ma_do_an_thuc_uong),

    FOREIGN KEY (ma_hoa_don) REFERENCES hoa_don(ma_hoa_don),
    FOREIGN KEY (ma_do_an_thuc_uong) REFERENCES do_an_thuc_uong(ma_sp)
);

#tao ve
CREATE TABLE ve(
	ma_ve VARCHAR(10) PRIMARY KEY,
    gia_ve INT,
    ma_rap VARCHAR(10) NOT NULL,
    ma_phong VARCHAR(10) NOT NULL,
	ma_ghe VARCHAR(3) NOT NULL,
    ma_luot_chieu VARCHAR(10) NOT NULL,
	ma_hoa_don VARCHAR(10) NOT NULL,
    ma_nhan_vien_ban_ve VARCHAR(10) NOT NULL,
    thoi_gian_thanh_toan DATETIME,
    ma_khach_hang VARCHAR(10),
    
    FOREIGN KEY (ma_rap,ma_phong,ma_ghe) REFERENCES ghe(ma_rap,ma_phong,ma_ghe),
    FOREIGN KEY (ma_luot_chieu) REFERENCES suat_chieu(ma_luot_chieu),
    FOREIGN KEY (ma_nhan_vien_ban_ve) REFERENCES nhan_vien_ban_hang(ma_nv),
    FOREIGN KEY (ma_hoa_don) REFERENCES hoa_don(ma_hoa_don),
    FOREIGN KEY (ma_khach_hang) REFERENCES khach_hang(ma_khach_hang)
);

# tao su kien
CREATE TABLE su_kien(
	ma_sk VARCHAR(10) PRIMARY KEY,
    ten_sk VARCHAR(50),
    quy_mo VARCHAR(20),
	do_tuoi_gioi_han INT,
    chi_phi INT ,
    thoi_gian DATETIME,
    noi_dung_su_kien VARCHAR(1000)
);


CREATE TABLE don_vi_to_chuc(
	ma_so_rieng VARCHAR(10) PRIMARY KEY

);

CREATE TABLE to_chuc(
	ma_so_rieng VARCHAR(10) PRIMARY KEY,
    ten_to_chuc VARCHAR(50),
    email VARCHAR(50),
    sdt VARCHAR(10),
    
    FOREIGN KEY (ma_so_rieng) REFERENCES don_vi_to_chuc(ma_so_rieng)
);

CREATE TABLE ca_nhan(
	cccd VARCHAR(15) PRIMARY KEY,
    ten VARCHAR(50),
    email VARCHAR(50),
    sdt VARCHAR(10),
    
    FOREIGN KEY (cccd) REFERENCES don_vi_to_chuc(ma_so_rieng)
);

CREATE TABLE to_chuc_su_kien(
    ma_don_vi_to_chuc VARCHAR(10) NOT NULL,
    ma_su_kien VARCHAR(10) NOT NULL,
	ma_rap_phim VARCHAR(10) NOT NULL,
	ma_phong_phim VARCHAR(10) NOT NULL,
    
    PRIMARY KEY(ma_rap_phim,ma_don_vi_to_chuc,ma_su_kien),
    
    FOREIGN KEY(ma_rap_phim) REFERENCES rap_phim(ma_rap),
    FOREIGN KEY (ma_don_vi_to_chuc) REFERENCES don_vi_to_chuc(ma_so_rieng),
    FOREIGN KEY (ma_su_kien) REFERENCES su_kien(ma_sk)
);






