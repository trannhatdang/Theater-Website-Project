DELIMITER $$
DROP PROCEDURE IF EXISTS thu_tuc_thong_ke_doanh_thu_phim$$
CREATE PROCEDURE thu_tuc_thong_ke_doanh_thu_phim(
	IN p_ten_phim VARCHAR(255)
)
BEGIN
	SELECT
		ph.ten_phim AS ten_phim,
		COUNT(v.ma_ve) AS so_ve_da_ban,
		SUM(v.gia_ve) AS doanh_so_ban_ve,
		COUNT(DISTINCT hd.ma_hoa_don) AS so_don_hang_xu_ly
	FROM
		ve v
	JOIN
		hoa_don hd ON v.ma_hoa_don = hd.ma_hoa_don
	JOIN 
		suat_chieu sc ON v.ma_luot_chieu = sc.ma_luot_chieu
	JOIN
		phim ph ON sc.ma_phim = ph.ma_phim
	WHERE 
		(p_ten_phim IS NULL OR ph.ten_phim LIKE p_ten_phim)
	GROUP BY 
		ph.ten_phim;
END$$

DELIMITER ;
