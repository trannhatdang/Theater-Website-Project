DELIMITER $$ 

CREATE PROCEDURE thu_tuc_them_nhan_vien(
    IN nv_ma_nv VARCHAR(10),
    IN nv_ten VARCHAR(50),
    IN nv_cccd INT,
    IN nv_sdt VARCHAR(10),
    IN nv_ngay_sinh date,
    IN nv_gioi_tinh VARCHAR(3),
    IN nv_luong INT,
    IN nv_chuc_vu VARCHAR(50),
    IN nv_dia_chi VARCHAR(100),
	IN nv_ma_nv_quan_ly VARCHAR(10) ,
    IN nv_ma_rap_phim VARCHAR(10)
)
BEGIN 
	DECLARE v_error_msg VARCHAR(255);
	DECLARE v_count INT;

    SELECT COUNT(*) INTO v_count
    FROM nhan_vien
    WHERE ma_nv = nv_ma_nv;

    IF v_count > 0 THEN
        SET v_error_msg = CONCAT('Lỗi: Mã nhân viên ', nv_ma_nv, ' đã tồn tại.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;
    
    IF TIMESTAMPDIFF(YEAR, nv_ngay_sinh, CURDATE()) < 18 THEN 
		SET v_error_msg = CONCAT('Lỗi: Nhân viên ',nv_ten,' chưa đủ 18 tuổi.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
	END IF;
    
    IF nv_sdt NOT REGEXP '^[0-9]{10}$' THEN 
		SET v_error_msg = CONCAT('Lỗi: SĐT ',nv_sdt,' không hợp lệ, cần đủ 10 số.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
	END IF;
    
	IF nv_luong < 0 THEN
        SET v_error_msg = CONCAT('Lỗi: Lương ', nv_luong, ' không hợp lệ.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;

    IF nv_luong > 45000 THEN
        SET v_error_msg = CONCAT('Lỗi: Lương ', nv_luong, ' vượt quá mức tối đa 45,000.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;
    
	IF nv_cccd NOT REGEXP '^[0-9]{10}$' THEN
        SET v_error_msg = CONCAT('Lỗi: CCCD ', nv_cccd, ' không hợp lệ.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;

    SELECT COUNT(*) INTO v_count
    FROM rap_phim
    WHERE ma_rap = nv_ma_rap_phim;

    IF v_count = 0 THEN
        SET v_error_msg = CONCAT('Lỗi: Mã rạp ', nv_ma_rap_phim, ' không tồn tại.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;
    
    INSERT INTO nhan_vien(ma_nv, ten, cccd, sdt, ngay_sinh, gioi_tinh, luong, chuc_vu, dia_chi, ma_nv_quan_ly, ma_rap_phim)
    VALUES(nv_ma_nv, nv_ten, nv_cccd, nv_sdt, nv_ngay_sinh, nv_gioi_tinh, nv_luong, nv_chuc_vu, nv_dia_chi, nv_ma_nv_quan_ly, nv_ma_rap_phim);
END$$

DELIMITER ;



DELIMITER $$

CREATE PROCEDURE thu_tuc_cap_nhat_nhan_vien(
    IN nv_ma_nv VARCHAR(10),
    IN nv_sdt VARCHAR(10),
    IN nv_dia_chi VARCHAR(100),
    IN nv_luong INT,
    IN nv_ma_rap_phim VARCHAR(10),
    IN nv_ma_nv_quan_ly VARCHAR(10)
)
BEGIN
    DECLARE v_error_msg VARCHAR(255);
    DECLARE v_count INT;

    SELECT COUNT(*) INTO v_count FROM nhan_vien WHERE ma_nv = nv_ma_nv;

    IF v_count = 0 THEN
		SET v_error_msg = 'Lỗi: Mã nhân viên cần cập nhật không tồn tại.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;

    IF nv_sdt IS NOT NULL AND nv_sdt NOT REGEXP '^[0-9]{10}$' THEN
        SET v_error_msg = CONCAT('Lỗi: SĐT ', nv_sdt, ' không hợp lệ.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;

    IF nv_luong < 0 THEN
		SET v_error_msg = CONCAT('Lỗi: Lương không được nhỏ hơn 0.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;

	IF nv_luong > 45000 THEN
		SET v_error_msg = CONCAT('Lỗi: Lương ', nv_luong, ' vượt quá mức tối đa 45000.');
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
	END IF;

    SELECT COUNT(*) INTO v_count FROM rap_phim WHERE ma_rap = nv_ma_rap_phim;

    IF v_count = 0 THEN
		SET v_error_msg = CONCAT('Lỗi: Mã rạp ', nv_ma_rap_phim, ' không tồn tại.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
	END IF;
    
    IF nv_ma_nv_quan_ly IS NOT NULL THEN
        IF nv_ma_nv_quan_ly = nv_ma_nv THEN
			SET v_error_msg = 'Lỗi: Nhân viên không thể tự quản lý chính mình.';
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
        END IF;

        SELECT COUNT(*) INTO v_count FROM nhan_vien WHERE ma_nv = nv_ma_nv_quan_ly;

        IF v_count = 0 THEN
			SET v_error_msg = CONCAT('Lỗi: Mã nhân viên quản lý ', nv_ma_nv_quan_ly, ' không tồn tại.');
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
        END IF;
    END IF;
    
    UPDATE nhan_vien
    SET 
        sdt = nv_sdt,
        dia_chi = nv_dia_chi,
        luong = nv_luong,
        ma_rap_phim = nv_ma_rap_phim,
        ma_nv_quan_ly = nv_ma_nv_quan_ly
    WHERE ma_nv = nv_ma_nv;

END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE thu_tuc_xoa_nhan_vien(
    IN nv_ma_nv VARCHAR(10)
)
BEGIN
    DECLARE v_error_msg VARCHAR(255);
    DECLARE v_count INT;

    SELECT COUNT(*) INTO v_count FROM nhan_vien WHERE ma_nv = nv_ma_nv;

    IF v_count = 0 THEN
        SET v_error_msg = CONCAT('Lỗi: Mã nhân viên ', nv_ma_nv, ' không tồn tại.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;

    SELECT COUNT(*) INTO v_count FROM nhan_vien WHERE ma_nv_quan_ly = nv_ma_nv;

    IF v_count > 0 THEN
        SET v_error_msg = CONCAT('Lỗi: Nhân viên ', nv_ma_nv, ' đang quản lý người khác, không thể xóa.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;

    SELECT COUNT(*) INTO v_count FROM ca_lam_viec WHERE ma_nv = nv_ma_nv;

    IF v_count > 0 THEN
        SET v_error_msg = CONCAT('Lỗi: Nhân viên ', nv_ma_nv, ' đang có ca làm việc, không thể xóa.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;

    DELETE FROM nhan_vien
    WHERE ma_nv = nv_ma_nv;

END$$

DELIMITER ;

