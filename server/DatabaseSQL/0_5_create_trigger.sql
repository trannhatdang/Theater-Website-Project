use myDB;

DELIMITER $$

CREATE TRIGGER trg_check_khuyen_mai_before_insert_rap_phim
BEFORE INSERT ON rap_phim_ap_dung_khuyen_mai
FOR EACH ROW
BEGIN
    DECLARE v_bd DATE;
    DECLARE v_kt DATE;
    DECLARE v_msg VARCHAR(255);

    IF NEW.ma_km IS NOT NULL THEN

        SELECT thoi_gian_bat_dau, thoi_gian_ket_thuc
        INTO v_bd, v_kt
        FROM khuyen_mai
        WHERE ma_km = NEW.ma_km;

        IF v_bd IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Mã khuyến mãi không tồn tại!';
        END IF;

        IF CURDATE() < v_bd THEN
            SET v_msg = CONCAT('Chương trình khuyến mãi chưa bắt đầu! Ngày bắt đầu: ', v_bd);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_msg;
        ELSEIF CURDATE() > v_kt THEN
            SET v_msg = CONCAT('Chương trình khuyến mãi đã hết hạn! Ngày kết thúc: ', v_kt);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_msg;
        END IF;
    END IF;
END$$

CREATE TRIGGER trg_check_khuyen_mai_before_insert_quy_doi
BEFORE INSERT ON quy_doi_khuyen_mai
FOR EACH ROW
BEGIN
    DECLARE v_bd DATE;
    DECLARE v_kt DATE;
    DECLARE v_msg VARCHAR(255);

    IF NEW.ma_km IS NOT NULL THEN

        SELECT thoi_gian_bat_dau, thoi_gian_ket_thuc
        INTO v_bd, v_kt
        FROM khuyen_mai
        WHERE ma_km = NEW.ma_km;

        IF v_bd IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Mã khuyến mãi không tồn tại!';
        END IF;

        IF CURDATE() < v_bd THEN
            SET v_msg = CONCAT('Chương trình khuyến mãi chưa bắt đầu! Ngày bắt đầu: ', v_bd);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_msg;
        ELSEIF CURDATE() > v_kt THEN
            SET v_msg = CONCAT('Chương trình khuyến mãi đã hết hạn! Ngày kết thúc: ', v_kt);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_msg;
        END IF;
    END IF;
END$$



CREATE TRIGGER trg_check_khuyen_mai_before_insert_hoa_don
BEFORE INSERT ON hoa_don
FOR EACH ROW
BEGIN
    DECLARE v_bd DATE;
    DECLARE v_kt DATE;
    DECLARE v_msg VARCHAR(255);

    IF NEW.ma_km IS NOT NULL THEN

        SELECT thoi_gian_bat_dau, thoi_gian_ket_thuc
        INTO v_bd, v_kt
        FROM khuyen_mai
        WHERE ma_km = NEW.ma_km;

        IF v_bd IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Mã khuyến mãi không tồn tại!';
        END IF;

        IF CURDATE() < v_bd THEN
            SET v_msg = CONCAT('Chương trình khuyến mãi chưa bắt đầu! Ngày bắt đầu: ', v_bd);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_msg;
        ELSEIF CURDATE() > v_kt THEN
            SET v_msg = CONCAT('Chương trình khuyến mãi đã hết hạn! Ngày kết thúc: ', v_kt);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_msg;
        END IF;
    END IF;
END$$



CREATE TRIGGER trg_update_tong_tien_after_insert_ve
AFTER INSERT ON ve
FOR EACH ROW
BEGIN
    DECLARE v_tong_ve INT DEFAULT 0;
    DECLARE v_tong_do_an INT DEFAULT 0;
    DECLARE v_giam INT DEFAULT 0;


    SELECT COALESCE(SUM(gia_ve), 0)
    INTO v_tong_ve
    FROM ve
    WHERE ma_hoa_don = NEW.ma_hoa_don;


    SELECT COALESCE(SUM(d.gia_tien * h.so_luong), 0)
    INTO v_tong_do_an
    FROM hoa_don_bao_gom_do_an_thuc_uong h
    JOIN do_an_thuc_uong d ON h.ma_do_an_thuc_uong = d.ma_sp
    WHERE h.ma_hoa_don = NEW.ma_hoa_don;

    SELECT COALESCE(k.gia_tri, 0)
    INTO v_giam
    FROM hoa_don hd
    LEFT JOIN khuyen_mai k ON hd.ma_km = k.ma_km
    WHERE hd.ma_hoa_don = NEW.ma_hoa_don;


    UPDATE hoa_don
    SET tong_tien = GREATEST(v_tong_ve + v_tong_do_an - v_giam, 0)
    WHERE ma_hoa_don = NEW.ma_hoa_don;
END$$

CREATE TRIGGER trg_update_tong_tien_after_delete_ve
AFTER DELETE ON ve
FOR EACH ROW
BEGIN
    DECLARE v_tong_ve INT DEFAULT 0;
    DECLARE v_tong_do_an INT DEFAULT 0;
    DECLARE v_giam INT DEFAULT 0;

    SELECT COALESCE(SUM(gia_ve), 0)
    INTO v_tong_ve
    FROM ve
    WHERE ma_hoa_don = OLD.ma_hoa_don;

    SELECT COALESCE(SUM(d.gia_tien * h.so_luong), 0)
    INTO v_tong_do_an
    FROM hoa_don_bao_gom_do_an_thuc_uong h
    JOIN do_an_thuc_uong d ON h.ma_do_an_thuc_uong = d.ma_sp
    WHERE h.ma_hoa_don = OLD.ma_hoa_don;

    SELECT COALESCE(k.gia_tri, 0)
    INTO v_giam
    FROM hoa_don hd
    LEFT JOIN khuyen_mai k ON hd.ma_km = k.ma_km
    WHERE hd.ma_hoa_don = OLD.ma_hoa_don;

    UPDATE hoa_don
    SET tong_tien = GREATEST(v_tong_ve + v_tong_do_an - v_giam, 0)
    WHERE ma_hoa_don = OLD.ma_hoa_don;
END$$

CREATE TRIGGER trg_update_tong_tien_after_insert_do_an
AFTER INSERT ON hoa_don_bao_gom_do_an_thuc_uong
FOR EACH ROW
BEGIN
    DECLARE v_tong_ve INT DEFAULT 0;
    DECLARE v_tong_do_an INT DEFAULT 0;
    DECLARE v_giam INT DEFAULT 0;

    SELECT COALESCE(SUM(gia_ve), 0)
    INTO v_tong_ve
    FROM ve
    WHERE ma_hoa_don = NEW.ma_hoa_don;

    SELECT COALESCE(SUM(d.gia_tien * h.so_luong), 0)
    INTO v_tong_do_an
    FROM hoa_don_bao_gom_do_an_thuc_uong h
    JOIN do_an_thuc_uong d ON h.ma_do_an_thuc_uong = d.ma_sp
    WHERE h.ma_hoa_don = NEW.ma_hoa_don;

    SELECT COALESCE(k.gia_tri, 0)
    INTO v_giam
    FROM hoa_don hd
    LEFT JOIN khuyen_mai k ON hd.ma_km = k.ma_km
    WHERE hd.ma_hoa_don = NEW.ma_hoa_don;

    UPDATE hoa_don
    SET tong_tien = GREATEST(v_tong_ve + v_tong_do_an - v_giam, 0)
    WHERE ma_hoa_don = NEW.ma_hoa_don;
END$$

CREATE TRIGGER trg_update_tong_tien_after_delete_do_an
AFTER DELETE ON hoa_don_bao_gom_do_an_thuc_uong
FOR EACH ROW
BEGIN
    DECLARE v_tong_ve INT DEFAULT 0;
    DECLARE v_tong_do_an INT DEFAULT 0;
    DECLARE v_giam INT DEFAULT 0;

    SELECT COALESCE(SUM(gia_ve), 0)
    INTO v_tong_ve
    FROM ve
    WHERE ma_hoa_don = OLD.ma_hoa_don;

    SELECT COALESCE(SUM(d.gia_tien * h.so_luong), 0)
    INTO v_tong_do_an
    FROM hoa_don_bao_gom_do_an_thuc_uong h
    JOIN do_an_thuc_uong d ON h.ma_do_an_thuc_uong = d.ma_sp
    WHERE h.ma_hoa_don = OLD.ma_hoa_don;

    SELECT COALESCE(k.gia_tri, 0)
    INTO v_giam
    FROM hoa_don hd
    LEFT JOIN khuyen_mai k ON hd.ma_km = k.ma_km
    WHERE hd.ma_hoa_don = OLD.ma_hoa_don;

    UPDATE hoa_don
    SET tong_tien = GREATEST(v_tong_ve + v_tong_do_an - v_giam, 0)
    WHERE ma_hoa_don = OLD.ma_hoa_don;
END$$

DELIMITER ;

 