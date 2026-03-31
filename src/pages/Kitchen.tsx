import { useEffect, useMemo, useState } from "react";

type OrderItem = {
  id: number;
  table: number;
  dish: string;
  qty: number;
  status: "Received" | "Preparing" | "Ready" | "Served";
  requestedAt: string;
  note?: string;
};

const initialOrders: OrderItem[] = [
  { id: 101, table: 2, dish: "Neapolitan Pizza", qty: 1, status: "Received", requestedAt: "12:05 PM", note: "No olives" },
  { id: 102, table: 5, dish: "Chicken Tikka Masala", qty: 2, status: "Preparing", requestedAt: "12:07 PM" },
  { id: 103, table: 8, dish: "Thai Curry Ramen", qty: 1, status: "Ready", requestedAt: "12:08 PM", note: "Extra chili" },
  { id: 104, table: 1, dish: "Carne Asada Tacos", qty: 3, status: "Received", requestedAt: "12:10 PM" },
];

const Kitchen = () => {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [filter, setFilter] = useState<"All" | "Received" | "Preparing" | "Ready" | "Served">("All");
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;
    const tick = setInterval(() => {
      setOrders((prev) => {
        const next = [...prev];
        const activeOrder = next.find((o) => o.status !== "Served");
        if (!activeOrder) return prev;

        const advancedStatus =
          activeOrder.status === "Received" ? "Preparing" :
          activeOrder.status === "Preparing" ? "Ready" :
          activeOrder.status === "Ready" ? "Served" : activeOrder.status;

        return next.map((o) => (o.id === activeOrder.id ? { ...o, status: advancedStatus } : o));
      });
    }, 6000);

    return () => clearInterval(tick);
  }, [live]);

  const filteredOrders = useMemo(() => {
    if (filter === "All") return orders;
    return orders.filter((order) => order.status === filter);
  }, [orders, filter]);

  const updateStatus = (id: number, status: OrderItem["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  return (
    <div className="min-h-screen p-6 lg:p-10 bg-linear-to-br from-black via-orange-900 to-red-700 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-orange-200">Kitchen Dashboard</h1>
          <p className="text-gray-200 mt-2">Manage incoming orders and keep the kitchen running smoothly.</p>
        </header>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          {(["All", "Received", "Preparing", "Ready", "Served"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full border ${filter === status ? "bg-orange-500 border-orange-300" : "border-orange-200/50 bg-black/30"}`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setLive((prev) => !prev)}
            className={`px-4 py-2 rounded-full ${live ? "bg-green-400 text-black" : "bg-gray-200 text-black"}`}
          >
            {live ? "Live Auto Flow: On" : "Live Auto Flow: Off"}
          </button>
          <span className={`px-3 py-1 rounded-full text-sm ${live ? "bg-green-500/70" : "bg-red-500/70"}`}>
            {live ? "Running" : "Paused"}
          </span>
        </div>

        <div className="grid gap-4">
          {filteredOrders.length === 0 ? (
            <div className="rounded-xl border border-orange-300/40 p-6 text-center text-gray-200">No orders in this status.</div>
          ) : (
            filteredOrders.map((order) => (
              <article key={order.id} className="rounded-xl bg-white/10 border border-orange-200/40 p-5 shadow-lg">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-orange-200">Order #{order.id} (Table {order.table})</h2>
                    <p className="text-sm text-gray-300">{order.dish} x{order.qty} • {order.requestedAt}</p>
                    {order.note && <p className="text-sm text-orange-100 mt-1">Note: {order.note}</p>}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-black bg-orange-300">{order.status}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {order.status !== "Preparing" && <button onClick={() => updateStatus(order.id, "Preparing") } className="rounded-md bg-orange-500 px-3 py-1 text-sm font-semibold text-black hover:bg-orange-400">Set Preparing</button>}
                  {order.status !== "Ready" && <button onClick={() => updateStatus(order.id, "Ready") } className="rounded-md bg-amber-400 px-3 py-1 text-sm font-semibold text-black hover:bg-amber-300">Set Ready</button>}
                  {order.status !== "Served" && <button onClick={() => updateStatus(order.id, "Served") } className="rounded-md bg-green-400 px-3 py-1 text-sm font-semibold text-black hover:bg-green-300">Set Served</button>}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
