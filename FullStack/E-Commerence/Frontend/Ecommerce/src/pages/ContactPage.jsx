// src/pages/ContactPage.jsx (FULL COMPONENT)

import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  BoltIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const heroRef = useRef(null);
  const sectionRefs = useRef([]);
  sectionRefs.current = [];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // --- Hero Animation ---
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
        });
      }
      // --- Scroll-Triggered Animation ---
      sectionRefs.current.forEach((el, index) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
      // CRITICAL FIX: Refresh ScrollTrigger
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }, document.body);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Form Submission (Simulated):\nName: ${formData.name}\nEmail: ${formData.email}`
    );
    // In a real application, you would send this data to a POST /api/contact endpoint
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* === 1. Hero Section: Contact Headline === */}
        <section
          ref={heroRef}
          className="bg-indigo-600 text-white py-24 px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Let's Talk Code and Projects
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Ready to collaborate? Reach out directly or send a message through
            the form below.
          </p>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* === 2. Contact Information Cards === */}
            <section className="md:col-span-1 space-y-6">
              <div
                ref={addToRefs}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-3"
              >
                <EnvelopeIcon className="w-8 h-8 text-indigo-600" />
                <h3 className="text-xl font-bold">Email Support</h3>
                <p className="text-gray-700">developer@example.com</p>
              </div>
              <div
                ref={addToRefs}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-3"
              >
                <PhoneIcon className="w-8 h-8 text-indigo-600" />
                <h3 className="text-xl font-bold">Phone</h3>
                <p className="text-gray-700">(123) 456-7890</p>
              </div>
              <div
                ref={addToRefs}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-3"
              >
                <MapPinIcon className="w-8 h-8 text-indigo-600" />
                <h3 className="text-xl font-bold">Location</h3>
                <p className="text-gray-700">Remote / Based in City, Country</p>
              </div>
            </section>

            {/* === 3. Contact Form === */}
            <section
              ref={addToRefs}
              className="md:col-span-2 bg-white p-8 rounded-xl shadow-2xl border-t-4 border-indigo-600"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    How can I help?
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150"
                >
                  Send Message
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
