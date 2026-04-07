 const About = () => {
  return (
    <section className="min-h-screen linear-gradient-to-br from-black via-orange-900 to-red-700 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-orange-200 mb-4">
            About Global Dine
          </h1>
          <p className="text-lg text-orange-100 opacity-90 max-w-2xl mx-auto">
            Making restaurant menus globally accessible with real-time currency conversion and seamless digital experiences.
          </p>
        </div>

        {/* WHAT WE DO */}
        <div className="bg-black/80 border border-orange-400 rounded-2xl p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-orange-200 mb-4">
            What is Global Dine?
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Global Dine is a modern web platform that helps restaurants present their menus to customers anywhere in the world. 
            With real-time currency conversion, users can instantly view prices in their local currency, making dining decisions easier and more transparent.
          </p>
        </div>

        {/* WHY IT MATTERS */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-black/80 border border-orange-300/60 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-orange-200 mb-2">
              🌍 Global Accessibility
            </h3>
            <p className="text-gray-300">
              Customers from different countries can understand menu prices instantly without confusion.
            </p>
          </div>

          <div className="bg-black/80 border border-orange-300/60 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-orange-200 mb-2">
              ⚡ Real-Time Conversion
            </h3>
            <p className="text-gray-300">
              Live exchange rates ensure accurate pricing for a better user experience.
            </p>
          </div>

          <div className="bg-black/80 border border-orange-300/60 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-orange-200 mb-2">
              💼 Business Growth
            </h3>
            <p className="text-gray-300">
              Restaurants can attract international customers and increase trust.
            </p>
          </div>

          <div className="bg-black/80 border border-orange-300/60 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-orange-200 mb-2">
              📱 Modern Experience
            </h3>
            <p className="text-gray-300">
              Clean, responsive design built for today’s web users.
            </p>
          </div>
        </div>

        {/* ABOUT YOU */}
        <div className="bg-black/80 border border-orange-400 rounded-2xl p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-orange-200 mb-4">
            About the Developer
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Global Dine was developed by a passionate frontend developer focused on building modern, user-friendly web applications. 
            The goal is to solve real-world problems with clean design, efficient code, and scalable solutions.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center bg-orange-500/20 border border-orange-400 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-orange-200 mb-3">
            Want to work with me?
          </h2>
          <p className="text-gray-200 mb-4">
            Let’s build something amazing together — from restaurant platforms to full business websites.
          </p>

          <button className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-xl font-bold">
            Contact Me
          </button>
        </div>

      </div>
    </section>
  );
};

export default About;