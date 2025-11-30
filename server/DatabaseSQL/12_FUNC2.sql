DELIMITER $$

DROP FUNCTION IF EXISTS ham_danh_gia_hot_theo_rap$$

CREATE FUNCTION ham_danh_gia_hot_theo_rap(
    p_ma_phim VARCHAR(10),
    p_ma_rap VARCHAR(10),
    p_thang INT,
    p_nam INT
) 
RETURNS VARCHAR(100)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE v_ket_qua VARCHAR(100);
    
    DECLARE v_ma_luot_chieu VARCHAR(10);
    DECLARE v_ma_phong VARCHAR(10);
    
    DECLARE v_tong_ghe_cung_ung INT DEFAULT 0;
    DECLARE v_tong_ve_ban_ra INT DEFAULT 0;
    DECLARE v_ghe_cua_suat_nay INT DEFAULT 0;
    DECLARE v_ve_cua_suat_nay INT DEFAULT 0;
    DECLARE v_ty_le_lap_day FLOAT DEFAULT 0.0;
    DECLARE done INT DEFAULT FALSE;
   
   DECLARE cur_suat_chieu CURSOR FOR 
        SELECT ma_luot_chieu, ma_phong_chieu
        FROM suat_chieu
        WHERE ma_phim = p_ma_phim 
          AND ma_rap = p_ma_rap
          AND MONTH(thoi_gian_bat_dau) = p_thang
          AND YEAR(thoi_gian_bat_dau) = p_nam;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    IF NOT EXISTS (SELECT 1 FROM rap_phim WHERE ma_rap = p_ma_rap) THEN
        RETURN 'Lỗi: Mã rạp không tồn tại';
    END IF;

    OPEN cur_suat_chieu;
    read_loop: LOOP
        FETCH cur_suat_chieu INTO v_ma_luot_chieu, v_ma_phong;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
			-- đếm số ghế từ bảng ghế 
		SELECT COUNT(*) INTO v_ghe_cua_suat_nay
		FROM ghe
		WHERE ma_rap = p_ma_rap AND ma_phong = v_ma_phong;

        -- đếm số vé đã bán
        SELECT COUNT(*) INTO v_ve_cua_suat_nay
        FROM ve
        WHERE ma_luot_chieu = v_ma_luot_chieu;

        SET v_tong_ghe_cung_ung = v_tong_ghe_cung_ung + v_ghe_cua_suat_nay;
        SET v_tong_ve_ban_ra = v_tong_ve_ban_ra + v_ve_cua_suat_nay;

    END LOOP;

    CLOSE cur_suat_chieu;
    IF v_tong_ghe_cung_ung = 0 THEN
        RETURN 'Chưa có suất chiếu nào';
    END IF;

    SET v_ty_le_lap_day = v_tong_ve_ban_ra / v_tong_ghe_cung_ung;

    IF v_ty_le_lap_day >= 0.8 THEN
        SET v_ket_qua = CONCAT('SIÊU HOT (Đầy ', ROUND(v_ty_le_lap_day * 100, 0), '%) - Cần tăng suất');
    ELSEIF v_ty_le_lap_day >= 0.5 THEN
        SET v_ket_qua = CONCAT('Bình thường (Đầy ', ROUND(v_ty_le_lap_day * 100, 0), '%) - Giữ nguyên');
    ELSEIF v_ty_le_lap_day >= 0.2 THEN
        SET v_ket_qua = CONCAT('Vắng khách (Đầy ', ROUND(v_ty_le_lap_day * 100, 0), '%) - Cân nhắc giảm');
    ELSE
        SET v_ket_qua = CONCAT('Ế ẩm (Đầy ', ROUND(v_ty_le_lap_day * 100, 0), '%) - Nên cắt suất ngay');
    END IF;

    RETURN v_ket_qua;
END$$

DELIMITER ;