import { useQuery } from "@tanstack/react-query";

export type Promotion = {
  ma_km: string;
  ten_km: string;
  loai_km: string;
  thoi_gian_bat_dau: string;
  thoi_gian_ket_thuc: string;
  gia_tri: number;
  ma_nv_quan_ly: string;
};

export default function PromotionPage() {
  const promoQuery = useQuery({
    queryKey: ["promotions"],
    queryFn: async (): Promise<Promotion[]> => {
      const res = await fetch("http://localhost:3069/promotion");
      if (!res.ok) throw new Error("Failed to fetch promotions");
      return res.json();
    },
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-cyan-600">
        Current Promotions
      </h1>

      {promoQuery.isPending && (
        <p className="text-center text-gray-500">Loading promotions...</p>
      )}
      {promoQuery.isError && (
        <p className="text-center text-red-500">Error loading promotions.</p>
      )}

      {promoQuery.data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promoQuery.data.map((promo) => (
            <div
              key={promo.ma_km}
              className="bg-gradient-to-br from-white to-cyan-50 p-5 rounded-xl shadow-lg border hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-cyan-700">{promo.ten_km}</h2>

              <p className="mt-2 text-gray-700">
                <strong>Type:</strong> {promo.loai_km}
              </p>

              <p className="text-gray-700">
                <strong>Value:</strong>{" "}
                {promo.loai_km.toLowerCase().includes("quy đổi")
                  ? `${promo.gia_tri} VND`
                  : `${promo.gia_tri}%`}
              </p>

              <p className="mt-2 text-gray-600">
                <strong>Start Date:</strong>{" "}
                {new Date(promo.thoi_gian_bat_dau).toLocaleDateString()}
              </p>

              <p className="text-gray-600">
                <strong>End Date:</strong>{" "}
                {new Date(promo.thoi_gian_ket_thuc).toLocaleDateString()}
              </p>

              <p className="text-gray-500 mt-2">
                <strong>Manager ID:</strong> {promo.ma_nv_quan_ly}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}