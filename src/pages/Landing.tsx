import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const featuredDishes = [
  { emoji: "🍣", name: "Tokyo Rainbow Sushi", description: "Ocean-fresh sashimi with a burst of citrus and heat.", priceUSD: 14.99 },
  { emoji: "🍕", name: "Napoli Fire Pizza", description: "Wood-fired Margherita with stretchy burrata and basil.", priceUSD: 12.49 },
  { emoji: "🍜", name: "Seoul Spicy Ramen", description: "Rich broth, slow-cooked pork, and a spicy kick.", priceUSD: 11.29 },
  { emoji: "🥗", name: "Mediterranean Bowl", description: "Colorful greens, feta, and herb vinaigrette.", priceUSD: 9.99 },
];

const Landing = () => {
  const [activeDish, setActiveDish] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDish((prev) => (prev + 1) % featuredDishes.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const currentDish = featuredDishes[activeDish];

  return (
    <main className="relative min-h-screen bg-linear-to-br from-black via-orange-900 to-red-700 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 w-28 h-28 rounded-full bg-orange-300/40 animate-spin-slow" />
        <div className="absolute top-32 right-20 w-20 h-20 rounded-full bg-red-400/40 animate-pulse" />
        <div className="absolute bottom-24 left-20 w-24 h-24 rounded-full bg-amber-400/40 animate-bounce-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,140,0,0.25),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,0,0,0.22),transparent_45%)]" />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
          Global Dine
          <span className="block text-orange-300 animate-text-loop"> — Taste everything, worldwide.</span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl mb-6">
          A captivating, high-contrast food discovery experience for global customers and kitchen teams.
          Switch moods, explore menus, and convert prices instantly.
        </p>

        <div className="px-4 py-6 mb-8 rounded-2xl bg-black/40 border border-orange-300 shadow-xl w-full max-w-2xl">
          <h2 className="text-xl font-bold text-orange-200">Featured Dish</h2>
          <p className="text-4xl mb-2">{currentDish.emoji} {currentDish.name}</p>
          <p className="text-sm text-gray-200 mb-2">{currentDish.description}</p>
          <p className="text-sm tracking-wide text-orange-100">${currentDish.priceUSD.toFixed(2)} USD • €{(currentDish.priceUSD * 0.93).toFixed(2)} • ₹{(currentDish.priceUSD * 83).toFixed(0)}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link to="/menu" className="rounded-lg bg-red-500 text-white px-6 py-3 font-semibold shadow-lg hover:bg-orange-500 hover:scale-105 focus:ring-2 focus:ring-red-200 transition transform">
            Explore Menu
          </Link>
          <Link to="/currency" className="rounded-lg border-2 border-red-500 text-red-500 px-6 py-3 font-semibold hover:bg-red-100 dark:hover:bg-red-900 hover:scale-105 focus:ring-2 focus:ring-orange-200 transition transform">
            Currency Tool
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl text-left">
          {[
            { emoji: "🍣", title: "Sushi", desc: "Fresh global delicacies in vibrant presentation." },
            { emoji: "🍕", title: "Pizza", desc: "Crispy crust, melty cheese, and triple-flavor goodness." },
            { emoji: "🍜", title: "Ramen", desc: "Warm broth that matches your mood and lifestyle." },
            { emoji: "🥗", title: "Salad", desc: "Crisp, healthy, and perfectly balanced for global taste." },
          ].map((item, idx) => (
            <article
              key={item.title}
              className="p-5 rounded-2xl border border-orange-300 dark:border-orange-500 backdrop-blur-lg shadow-lg bg-white/15 dark:bg-black/50 transition-transform duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="text-4xl mb-3 animate-pulse">{item.emoji}</div>
              <h3 className="text-xl font-semibold mb-1 text-orange-200">{item.title}</h3>
              <p className="text-sm text-orange-100/90">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Landing;
