 import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Menu Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const subjects = ["Menu Inquiry", "Partnership", "Support"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can integrate API / email sending logic
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "Menu Inquiry", message: "" });
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-black via-orange-900 to-red-700 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-black text-orange-200 mb-4">
            Contact & Support
          </h1>
          <p className="text-lg text-orange-100/90 max-w-2xl mx-auto">
            Have a question about a menu, want to partner with Global Dine, or need support? Fill out the form below and we’ll get back to you quickly.
          </p>
        </motion.div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/5 border border-orange-400/40 rounded-2xl p-8 shadow-2xl mb-10"
        >
          {submitted && (
            <div className="bg-green-600/20 text-green-100 px-4 py-2 mb-4 rounded-md">
              Thank you! Your message has been sent.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full rounded-xl px-4 py-2 bg-orange-100/10 text-white border border-orange-300/40"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full rounded-xl px-4 py-2 bg-orange-100/10 text-white border border-orange-300/40"
                required
              />
            </div>

            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-2 bg-orange-100/10 text-white border border-orange-300/40"
            >
              {subjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              className="w-full rounded-xl px-4 py-2 bg-orange-100/10 text-white border border-orange-300/40 resize-none"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        {/* INFO / SUPPORT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/5 border border-orange-400/40 rounded-2xl p-8 shadow-inner"
        >
          <h2 className="text-2xl font-bold text-orange-200 mb-4">
            Global Dine Support
          </h2>
          <p className="text-gray-200 leading-relaxed mb-2">
            Email: <a href="mailto:support@globaldine.com" className="text-orange-200 underline">support@globaldine.com</a>
          </p>
          <p className="text-gray-200 leading-relaxed mb-2">
            Phone: <a href="tel:+1234567890" className="text-orange-200 underline">+1 (234) 567-890</a>
          </p>
          <p className="text-gray-200 leading-relaxed">
            Address: 123 Global Dine St, Food City, World
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;