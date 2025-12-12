import { useQuery } from "@tanstack/react-query";

export type Event = {
  ma_sk: string;
  ten_sk: string;
  quy_mo: string;
  do_tuoi_gioi_han: number;
  chi_phi: number;
  thoi_gian: string;
  noi_dung_su_kien: string;
};

export default function EventPage() {
  const eventQuery = useQuery({
    queryKey: ["events"],
    queryFn: async (): Promise<Event[]> => {
      const res = await fetch("http://localhost:3069/event");
      if (!res.ok) throw new Error("Failed to fetch event data");
      return res.json();
    },
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-cyan-600">
        Upcoming Events
      </h1>

      {eventQuery.isPending && (
        <p className="text-center text-gray-500">Loading events...</p>
      )}
      {eventQuery.isError && (
        <p className="text-center text-red-500">Error loading events.</p>
      )}

      {eventQuery.data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventQuery.data.map((event) => (
            <div
              key={event.ma_sk}
              className="bg-gradient-to-br from-white to-cyan-50 text-black p-5 rounded-xl shadow-lg border hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-cyan-700">{event.ten_sk}</h2>

              <p className="mt-2 text-gray-700">
                <strong>Scale:</strong> {event.quy_mo}
              </p>

              <p className="text-gray-700">
                <strong>Age Limit:</strong> {event.do_tuoi_gioi_han}+
              </p>

              <p className="text-gray-700">
                <strong>Cost:</strong>{" "}
                {event.chi_phi.toLocaleString("en-US")} VND
              </p>

              <p className="mt-2 text-gray-600">
                <strong>Date & Time:</strong>{" "}
                {new Date(event.thoi_gian).toLocaleString()}
              </p>

              <p className="mt-3 text-gray-800">
                <strong>Description:</strong> {event.noi_dung_su_kien}
              </p>

              <p className="text-gray-500 mt-2">
                <strong>Event ID:</strong> {event.ma_sk}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}