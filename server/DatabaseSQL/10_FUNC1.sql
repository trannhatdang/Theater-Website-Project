DELIMITER $$
drop function if exists ham_tinh_chi_phi_luong_ca_theo_rap$$

CREATE FUNCTION ham_tinh_chi_phi_luong_ca_theo_rap(
p_ngay_lam DATE,
    p_ten_ca VARCHAR(100),
    p_ma_rap VARCHAR(10) 
) RETURNS int(11)
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE v_tong_chi_phi INT DEFAULT 0;
    
    DECLARE v_luong_gio INT;    
    DECLARE v_so_gio_lam INT;   
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_check INT;
    DECLARE cur_nhan_vien CURSOR FOR 
        SELECT nv.luong, clv.thoi_gian_lam
        FROM ca_lam_viec clv
        JOIN nhan_vien nv ON clv.ma_nv = nv.ma_nv
        WHERE clv.ngay_lam = p_ngay_lam 
          AND clv.ca_lam_viec = p_ten_ca
          AND nv.ma_rap_phim = p_ma_rap; 

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    IF p_ngay_lam IS NULL OR p_ten_ca IS NULL OR p_ma_rap IS NULL THEN
         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Lỗi: Ngày, tên ca và mã rạp không được để trống.';
    END IF;
    SELECT COUNT(*) INTO v_check 
    FROM ca_lam_viec clv
    JOIN nhan_vien nv ON clv.ma_nv = nv.ma_nv
    WHERE clv.ngay_lam = p_ngay_lam 
      AND clv.ca_lam_viec = p_ten_ca
      AND nv.ma_rap_phim = p_ma_rap;

    IF v_check = 0 THEN
         RETURN 0;
    END IF;

    OPEN cur_nhan_vien;

    read_loop: LOOP
        FETCH cur_nhan_vien INTO v_luong_gio, v_so_gio_lam;
        
        IF done THEN
            LEAVE read_loop;
        END IF;

        IF v_so_gio_lam IS NULL THEN
            SET v_so_gio_lam = 0;
        END IF;

        SET v_tong_chi_phi = v_tong_chi_phi + (v_luong_gio * v_so_gio_lam);

    END LOOP;

    CLOSE cur_nhan_vien;

    RETURN v_tong_chi_phi;
END$$
DELIMITER ;
