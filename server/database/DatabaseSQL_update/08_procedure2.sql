DELIMITER $$
DROP PROCEDURE IF EXISTS thu_tuc_thong_ke_hieu_suat_nhan_vien$$
CREATE PROCEDURE thu_tuc_thong_ke_hieu_suat_nhan_vien(
    IN p_thang INT,             
    IN p_nam INT,               
    IN p_doanh_thu_min INT      
)
BEGIN
    DECLARE v_message VARCHAR(255);       
    DECLARE v_nam_hien_tai INT;           
    SET v_nam_hien_tai = YEAR(CURDATE());

    IF p_thang IS NOT NULL AND (p_thang < 1 OR p_thang > 12) THEN
        SET v_message = 'Lỗi: Tháng không hợp lệ. Vui lòng nhập từ 1 đến 12.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_message;
    END IF;
    IF p_nam IS NOT NULL THEN
        IF p_nam < 1990 THEN
            SET v_message = 'Lỗi: Năm thống kê quá cũ (phải từ năm 1970 trở đi).';
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_message;
        ELSEIF p_nam > v_nam_hien_tai + 1 THEN
            SET v_message = CONCAT('Lỗi: Năm ', p_nam, ' chưa đến. Năm hiện tại là ', v_nam_hien_tai);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_message;
        END IF;
    END IF;

    IF p_doanh_thu_min IS NOT NULL AND p_doanh_thu_min < 0 THEN
        SET v_message = 'Lỗi: Doanh thu tối thiểu không được là số âm.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_message;
    END IF;
    SELECT 
        rp.ten AS ten_rap,                  
        nv.ma_nv,                           
        nv.ten AS ten_nhan_vien,            
        COUNT(v.ma_ve) AS so_ve_da_ban,     
        SUM(v.gia_ve) AS doanh_so_ban_ve,   
        COUNT(DISTINCT hd.ma_hoa_don) AS so_don_hang_xu_ly 
    FROM 
        nhan_vien nv
    JOIN 
        rap_phim rp ON nv.ma_rap_phim = rp.ma_rap
    JOIN 
        nhan_vien_ban_hang nvbh ON nv.ma_nv = nvbh.ma_nv
    JOIN 
        hoa_don hd ON nvbh.ma_nv = hd.ma_nhan_vien_phu_trach
    JOIN 
        ve v ON hd.ma_hoa_don = v.ma_hoa_don
    WHERE 
        hd.trang_thai_thanh_toan = TRUE 
        AND (p_thang IS NULL OR MONTH(hd.thoi_gian) = p_thang)
        AND (p_nam IS NULL OR YEAR(hd.thoi_gian) = p_nam)
    GROUP BY 
        rp.ten, nv.ma_nv, nv.ten 
    HAVING 
        (p_doanh_thu_min IS NULL OR SUM(v.gia_ve) >= p_doanh_thu_min)
    ORDER BY 
        doanh_so_ban_ve DESC;
END$$

DELIMITER ;