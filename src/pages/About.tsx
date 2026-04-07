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
            A modern solution for restaurants to go global — built with performance, usability, and real-world impact in mind.
          </p>
        </motion.div>

        {/* GLASS CARD */}
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
            Global Dine helps restaurants reach international customers by converting menu prices into local currencies in real time.
            It removes confusion, builds trust, and creates a better dining experience for users worldwide.
          </p>
        </motion.div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            {
              title: "🌍 Global Reach",
              text: "Expand your restaurant to a worldwide audience effortlessly.",
            },
            {
              title: "⚡ Real-Time Data",
              text: "Live exchange rates ensure accuracy and trust.",
            },
            {
              title: "💼 Business Ready",
              text: "Designed to help businesses scale and attract global customers.",
            },
            {
              title: "📱 Modern UX",
              text: "Clean, fast, and responsive across all devices.",
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

        {/* DEVELOPER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-white/5 border border-orange-400/40 rounded-2xl p-8 mb-10"
        >
          <h2 className="text-2xl font-bold text-orange-200 mb-4">
            About the Developer
          </h2>
          <p className="text-gray-200 leading-relaxed">
            I specialize in building modern, responsive web applications that solve real-world problems.
            My focus is on clean UI, performance, and scalable solutions that businesses can rely on.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center backdrop-blur-lg bg-orange-500/10 border border-orange-400 rounded-2xl p-10"
        >
          <h2 className="text-2xl font-bold text-orange-200 mb-3">
            Let’s Build Something Great
          </h2>
          <p className="text-gray-200 mb-6">
            Looking for a modern website or web app? I can help you bring your ideas to life.
          </p>

          <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105">
            Contact Me
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default About;