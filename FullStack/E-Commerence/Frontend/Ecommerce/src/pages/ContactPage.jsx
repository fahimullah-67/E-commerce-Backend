// src/pages/ContactPage.jsx

import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  UserCircleIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: null, type: null });

  const API_BASE_URL = "/api/contact/message";

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    // --- GSAP Animation Logic ---
    let ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
        });
      }
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
      setTimeout(() => ScrollTrigger.refresh(), 500);
    }, document.body);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: null, type: null });

    try {
      // Call the Express backend route that uses the Resend API
      await axios.post(API_BASE_URL, formData);

      setStatus({
        message: "Thank you! Your project inquiry has been sent successfully.",
        type: "success",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Form Submission Error:", err);
      const errMsg =
        err.response?.data?.message ||
        "Failed to send message. Please verify your details or check console.";
      setStatus({ message: errMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* === 1. Hero Section: Contact Headline === */}
        <section
          ref={heroRef}
          className="bg-gray-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Let's Discuss Your Project
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Ready to launch your scalable application? Connect directly with the
            developer.
          </p>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* === 2. Developer Profile Card (Left) === */}
            <section className="md:col-span-1 space-y-6">
              {/* Developer Card (Fahim Ullah) */}
              <div
                ref={addToRefs}
                className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-indigo-600 space-y-4 text-center"
              >
                <UserCircleIcon className="w-16 h-16 text-indigo-600 mx-auto" />
                <h3 className="text-2xl font-extrabold text-gray-900">
                  Fahim Ullah
                </h3>
                <p className="text-indigo-600 font-semibold text-lg">
                  Full-Stack MERN Developer
                </p>
                <p className="text-gray-700 text-sm">
                  Specializing in reliable APIs, clean React state management,
                  and modern UI implementation.
                </p>
              </div>

              {/* Direct Contact Info */}
              <div
                ref={addToRefs}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-3"
              >
                <h3 className="text-xl font-bold mb-2">Direct Contact</h3>
                <div className="space-y-2">
                  <p className="flex items-center text-gray-700">
                    <EnvelopeIcon className="w-5 h-5 mr-2 text-indigo-500" />{" "}
                    developer@example.com
                  </p>
                  <p className="flex items-center text-gray-700">
                    <PhoneIcon className="w-5 h-5 mr-2 text-indigo-500" /> (123)
                    456-7890
                  </p>
                  <p className="flex items-center text-gray-700">
                    <MapPinIcon className="w-5 h-5 mr-2 text-indigo-500" />{" "}
                    Remote / Global
                  </p>
                </div>
              </div>
            </section>

            {/* === 3. Contact Form (Right) === */}
            <section
              ref={addToRefs}
              className="md:col-span-2 bg-white p-8 rounded-xl shadow-2xl border-t-4 border-indigo-600"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center">
                <CodeBracketIcon className="w-6 h-6 mr-2" /> Project Inquiry
                Form
              </h2>

              {/* Status Message Display */}
              {status.message && (
                <div
                  className={`p-3 mb-4 rounded-lg text-sm font-semibold ${
                    status.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Name
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
                    Your Email (for response)
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
                    Project Details or Inquiry
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm"
                    placeholder="Tell me about your project, timeline, or collaboration idea..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 text-white font-semibold rounded-lg transition duration-150 ${
                    loading
                      ? "bg-gray-400 cursor-wait"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {loading ? "Sending Inquiry..." : "Submit Project Request"}
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
