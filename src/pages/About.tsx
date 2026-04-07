import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="min-h-screen bg-linear-to-br from-black via-orange-900 to-red-700 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-black text-orange-200 mb-4">
            About Global Dine
          </h1>
          <p className="text-lg text-orange-100/90 max-w-2xl mx-auto">
            Making restaurant menus easier to understand worldwide with real-time currency conversion and a seamless dining experience.
          </p>
        </motion.div>

        {/* WHAT IT IS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/5 border border-orange-400/40 rounded-2xl p-8 mb-10 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-orange-200 mb-4">
            What is Global Dine?
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Global Dine is a smart platform that allows customers to view restaurant menus in their local currency.
            Whether you're traveling or ordering from abroad, you can instantly understand prices without confusion.
          </p>
        </motion.div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            {
              title: "🌍 Easy for Travelers",
              text: "View menu prices in your own currency wherever you are in the world.",
            },
            {
              title: "⚡ Real-Time Conversion",
              text: "Live exchange rates ensure accurate and up-to-date pricing.",
            },
            {
              title: "🍽️ Restaurant Friendly",
              text: "Restaurants can reach international customers more easily.",
            },
            {
              title: "📱 Smooth Experience",
              text: "Simple, fast, and responsive design across all devices.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="backdrop-blur-md bg-white/5 border border-orange-300/30 rounded-2xl p-6 hover:scale-105 transition-all"
            >
              <h3 className="text-xl font-semibold text-orange-200 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* TRUST / SUPPORT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-white/5 border border-orange-400/40 rounded-2xl p-8 mb-10"
        >
          <h2 className="text-2xl font-bold text-orange-200 mb-4">
            Why Choose Global Dine?
          </h2>
          <p className="text-gray-200 leading-relaxed">
            We focus on simplicity, accuracy, and user experience. Whether you're a customer exploring menus or a restaurant aiming to serve a global audience, Global Dine makes the process smooth and reliable.
          </p>
        </motion.div>

        {/* CTA (PRODUCT STYLE) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center backdrop-blur-lg bg-orange-500/10 border border-orange-400 rounded-2xl p-10"
        >
          <h2 className="text-2xl font-bold text-orange-200 mb-3">
            Explore Menus Globally
          </h2>
          <p className="text-gray-200 mb-6">
            Start converting menu prices instantly and enjoy a better dining experience anywhere in the world.
          </p>

          <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105">
            Start Converting
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default About;