export type ScreeningFilters = {
	ma_luot_chieu? : string,
	min_thoi_gian_bat_dau? : Date,
	max_thoi_gian_bat_dau? : Date,
	min_thoi_gian_ket_thuc? : Date,
	max_thoi_gian_ket_thuc? : Date,
	hinh_thuc_chieu? : string,
	ngon_ngu? : string,
	phu_de_hoac_long_tieng? : string,
	ma_phim? : string,
	ma_rap? : string,
	ma_phong_chieu? : string,
	ma_nhan_vien_quan_ly? : string,
	isStrict?: string,
}

export type ScreeningProps = {
	ma_luot_chieu : string,
	thoi_gian_bat_dau : Date,
	thoi_gian_ket_thuc : Date,
	hinh_thuc_chieu : string,
	ngon_ngu : string,
	phu_de_hoac_long_tieng : string,
	ma_phim : string,
	ma_rap : string,
	ma_phong_chieu : string,
	ma_nhan_vien_quan_ly : string,
}
