DELIMITER $$

DROP PROCEDURE IF EXISTS thu_tuc_tim_kiem_nhan_vien_nang_cao$$

CREATE PROCEDURE thu_tuc_tim_kiem_nhan_vien_nang_cao(
    IN p_tu_khoa VARCHAR(100),       
    IN p_gioi_tinh VARCHAR(3),       
    IN p_luong_min INT,              
    IN p_luong_max INT,              
    IN p_chuc_vu VARCHAR(50),        
    IN p_ten_rap VARCHAR(100),       
    IN p_cot_sap_xep VARCHAR(20),    
    IN p_kieu_sap_xep VARCHAR(4)     
)
BEGIN
    DECLARE v_message VARCHAR(255); 
    IF (p_luong_min IS NOT NULL AND p_luong_min < 0) OR (p_luong_max IS NOT NULL AND p_luong_max < 0) THEN
        SET v_message = 'Lỗi: Mức lương tìm kiếm không được là số âm.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_message;
    END IF;
    IF p_luong_min IS NOT NULL AND p_luong_max IS NOT NULL AND p_luong_min > p_luong_max THEN
        SET v_message = CONCAT('Lỗi: Lương tối thiểu (', p_luong_min, ') không được lớn hơn lương tối đa (', p_luong_max, ').');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_message;
    END IF;
    IF p_gioi_tinh IS NOT NULL AND p_gioi_tinh != '' AND p_gioi_tinh NOT IN ('Nam', 'Nu') THEN
        SET v_message = 'Lỗi: Giới tính không hợp lệ (Chỉ chấp nhận "Nam" hoặc "Nu").';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_message;
    END IF;

    IF p_kieu_sap_xep IS NOT NULL AND p_kieu_sap_xep != '' AND UPPER(p_kieu_sap_xep) NOT IN ('ASC', 'DESC') THEN
        SET v_message = 'Lỗi: Kiểu sắp xếp phải là ASC (tăng dần) hoặc DESC (giảm dần).';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_message;
    END IF;
    SELECT 
        nv.ma_nv, 
        nv.ten AS ten_nhan_vien, 
        nv.gioi_tinh, 
        nv.ngay_sinh, 
        nv.sdt, 
        nv.luong, 
        nv.chuc_vu, 
        nv.dia_chi,
        rp.ten AS ten_rap_lam_viec,
        ql.ten AS ten_quan_ly
    FROM 
        nhan_vien nv
    JOIN 
        rap_phim rp ON nv.ma_rap_phim = rp.ma_rap
    LEFT JOIN 
        nhan_vien ql ON nv.ma_nv_quan_ly = ql.ma_nv
    WHERE 
        (p_tu_khoa IS NULL OR p_tu_khoa = '' OR 
         nv.ma_nv LIKE CONCAT('%', p_tu_khoa, '%') OR 
         nv.ten LIKE CONCAT('%', p_tu_khoa, '%') OR 
         nv.sdt LIKE CONCAT('%', p_tu_khoa, '%'))
        AND (p_gioi_tinh IS NULL OR p_gioi_tinh = '' OR nv.gioi_tinh = p_gioi_tinh)
        AND (p_luong_min IS NULL OR nv.luong >= p_luong_min)
        AND (p_luong_max IS NULL OR nv.luong <= p_luong_max)
        AND (p_chuc_vu IS NULL OR p_chuc_vu = '' OR nv.chuc_vu = p_chuc_vu)
        AND (p_ten_rap IS NULL OR p_ten_rap = '' OR rp.ten LIKE CONCAT('%', p_ten_rap, '%'))
    ORDER BY
        CASE 
            WHEN UPPER(p_kieu_sap_xep) = 'DESC' THEN
                CASE 
                    WHEN p_cot_sap_xep = 'luong' THEN nv.luong
                    WHEN p_cot_sap_xep = 'ngay_sinh' THEN nv.ngay_sinh
                    ELSE nv.ten
                END
        END DESC,
        CASE 
            WHEN p_kieu_sap_xep IS NULL OR UPPER(p_kieu_sap_xep) != 'DESC' THEN
                CASE 
                    WHEN p_cot_sap_xep = 'luong' THEN nv.luong
                    WHEN p_cot_sap_xep = 'ngay_sinh' THEN nv.ngay_sinh
                    ELSE nv.ten 
                END
        END ASC;
END$$

DELIMITER ;