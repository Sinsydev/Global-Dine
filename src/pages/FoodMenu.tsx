import { useMemo, useState } from "react";

type FoodItem = {
  id: number;
  image: string;
  imageUrl?: string;
  title: string;
  category: "Asian" | "Italian" | "Mexican" | "Healthy";
  desc: string;
  price: number;
  rating: number;
};

const foodItems: FoodItem[] = [
  { id: 1, image: "🍜", title: "Thai Curry Ramen", category: "Asian", desc: "Creamy coconut broth and hand-made noodles.", price: 11.5, rating: 4.8 },
  { id: 2, image: "🍣", title: "Salmon Dragon Roll", category: "Asian", desc: "Fresh sashimi with avocado and spicy mayo.", price: 13.0, rating: 4.9 },
  { id: 3, image: "🍕", title: "Neapolitan Pizza", category: "Italian", desc: "Charcoal crust, San Marzano tomato, mozzarella.", price: 12.0, rating: 4.7 },
  { id: 4, image: "🥗", title: "Quinoa Power Bowl", category: "Healthy", desc: "Superfoods mix with lemon-tahini dressing.", price: 10.0, rating: 4.6 },
  { id: 5, image: "🌮", title: "Carne Asada Tacos", category: "Mexican", desc: "Spiced steak, salsa fresca, and cilantro.", price: 9.5, rating: 4.7 },
  { id: 6, image: "🍝", title: "Truffle Fettuccine", category: "Italian", desc: "Creamy sauce, shaved truffle, parmesan.", price: 14.4, rating: 4.8 },
  { id: 7, image: "🍛", title: "Chicken Tikka Masala", category: "Asian", desc: "Rich tomato curry with basmati rice.", price: 12.9, rating: 4.6 },
  { id: 8, image: "🥑", title: "Avocado Toast", category: "Healthy", desc: "Whole grain bread with crushed avocado and chili.", price: 8.9, rating: 4.4 },
];

const categories = ["All", "Asian", "Italian", "Mexican", "Healthy"] as const;

const FoodMenu = () => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});

  const addToCart = (itemId: number) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] ?? 0) + 1 }));
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (!next[itemId]) return prev;
      if (next[itemId] === 1) delete next[itemId];
      else next[itemId] -= 1;
      return next;
    });
  };

  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const item = foodItems.find((f) => f.id === Number(id));
      if (!item) return null;
      return { item, qty };
    }).filter(Boolean) as { item: FoodItem; qty: number }[];
  }, [cart]);

  const cartTotal = cartItems.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0);

  const [itemsWithImages] = useState<FoodItem[]>(() => {
    const colorsByCategory: Record<string, string> = {
      Asian: "orange",
      Italian: "red",
      Mexican: "green",
      Healthy: "yellow",
    };

    return foodItems.map((item) => {
      const color = colorsByCategory[item.category] || "food";
      const query = `${encodeURIComponent(item.title)},${encodeURIComponent(item.category)},${encodeURIComponent(color)},food`;

      return {
        ...item,
        imageUrl: `https://source.unsplash.com/800x500/?${query}`,
      };
    });
  });

  const [detailItem, setDetailItem] = useState<FoodItem | null>(null);

  const filtered = useMemo(() => {
    return itemsWithImages.filter((item) => {
      const matchCategory = activeCategory === "All" || item.category === activeCategory;
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, search, itemsWithImages])

  return (
    <div className="px-4 sm:px-8 py-8 lg:px-16 bg-linear-to-br from-black via-orange-900 to-red-700 min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-orange-300 mb-2">Food Gallery</h1>
          <p className="text-sm md:text-base text-gray-200">Explore international tastes, filter by category, and discover best sellers.</p>
        </header>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-2 rounded-full border ${activeCategory === category ? "bg-orange-500 border-orange-400" : "bg-black/30 border-orange-200/40"} transition`}
              >
                {category}
              </button>
            ))}
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes..."
            className="rounded-xl px-4 py-2 text-black w-full md:w-64"
          />
        </div>

        {cartItems.length > 0 && (
          <aside className="fixed top-28 right-6 z-50 w-72 rounded-xl border border-orange-200/50 bg-black/70 p-4 text-white backdrop-blur-lg shadow-2xl">
            <h3 className="text-lg font-bold mb-2">Cart ({cartItems.length})</h3>
            {cartItems.map(({ item, qty }) => (
              <div key={item.id} className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xl">{item.image}</span>
                  <div className="text-sm">{item.title}</div>
                  <div className="text-xs text-gray-300">x{qty}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">${(item.price * qty).toFixed(2)}</div>
                  <div className="flex gap-1 mt-1">
                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-300 hover:text-red-500">-</button>
                    <button onClick={() => addToCart(item.id)} className="text-xs text-green-300 hover:text-green-400">+</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-orange-400/50 pt-2 mt-2 text-right">
              <div className="text-sm text-gray-300">Total:</div>
              <div className="text-lg font-bold text-orange-200">${cartTotal.toFixed(2)}</div>
            </div>
          </aside>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length ? (
            filtered.map((item) => (
              <article key={item.id} className="bg-white/10 border border-orange-200/40 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-xl mb-4 h-40 bg-black/20">
                <img
                  src={item.imageUrl || `https://source.unsplash.com/400x300/?${encodeURIComponent(item.title)}`}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-2 left-2 text-xl">{item.image}</span>
              </div>
                <h3 className="text-2xl font-bold mb-1 text-orange-100">{item.title}</h3>
                <p className="text-sm text-gray-200 mb-3">{item.desc}</p>
                <div className="flex items-center justify-between text-sm text-gray-100 mb-3">
                  <span className="bg-orange-500/30 px-2 py-1 rounded-md">{item.category}</span>
                  <div className="text-orange-200 font-semibold">${item.price.toFixed(2)}</div>
                </div>
                <div className="mt-3 text-xs text-gray-200">Rating: {item.rating.toFixed(1)} ⭐</div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => addToCart(item.id)}
                    className="flex-1 py-2 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-400 transition"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => setDetailItem(item)}
                    className="flex-1 py-2 rounded-lg border border-orange-300 text-orange-100 hover:bg-orange-300/20 transition"
                  >
                    View details
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-200 py-10 rounded-xl border border-orange-200/30">No items found.</div>
          )}
        </div>
      </div>

      {detailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-gray-900 text-white p-6 shadow-2xl relative">
            <button
              onClick={() => setDetailItem(null)}
              className="absolute top-3 right-3 text-orange-200 hover:text-white"
            >
              ✕
            </button>
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={detailItem.imageUrl || `https://source.unsplash.com/400x300/?${encodeURIComponent(detailItem.title)}`}
                alt={detailItem.title}
                className="h-40 w-full md:w-48 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-orange-300 mb-2">{detailItem.title}</h2>
                <p className="text-sm text-gray-200 mb-2">{detailItem.desc}</p>
                <p className="text-xs text-gray-400 mb-3">Category: {detailItem.category}</p>
                <p className="text-lg font-semibold text-orange-200 mb-2">${detailItem.price.toFixed(2)}</p>
                <p className="text-sm text-gray-300">Rating: {detailItem.rating.toFixed(1)} ⭐</p>
                <button
                  onClick={() => {
                    addToCart(detailItem.id);
                    setDetailItem(null);
                  }}
                  className="mt-4 w-full py-2 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-400 transition"
                >
                  Add to cart & close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodMenu;