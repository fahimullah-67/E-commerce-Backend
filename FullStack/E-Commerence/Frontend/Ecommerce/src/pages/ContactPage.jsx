import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// Updated Icons for a developer/portfolio page focus
import { CodeBracketIcon, BoltIcon, RocketLaunchIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'; 
import gsap from 'gsap'; 
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
gsap.registerPlugin(ScrollTrigger); 

const ContactPage = () => {
    // Refs for animation targets
    const heroRef = useRef(null);
    const sectionRefs = useRef([]);
    sectionRefs.current = []; 

    const addToRefs = (el) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current.push(el);
        }
    };

    useEffect(() => {
        // --- Hero Entrance Animation ---
        if (heroRef.current) {
            gsap.from(heroRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power3.out",
            });
        }

        // --- Scroll-Triggered Animation for Content Sections ---
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
                }
            });
        });

    }, []); 

    const SKILLS = ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Git & GitHub', 'PHP'];
    const ENHANCEMENTS = ['API Rate Limiting', 'Payment Gateway Integration (Stripe/PayPal)', 'Admin Dashboard for Product/Order Management', 'Advanced Search & Filtering', 'User Review System'];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow">
                {/* === 1. Hero Section: Short Bio === */}
                <section ref={heroRef} className="bg-gray-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
                    <CodeBracketIcon className="w-16 h-16 text-indigo-400 mx-auto mb-4"/>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        Building the Future of E-commerce
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto border-t border-b border-indigo-400 py-3 mt-8">
                        "I'm a **full-stack MERN and PHP developer** passionate about creating fast, secure, and scalable applications."
                    </p>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    
                    {/* === 2. Purpose of This Website === */}
                    <section ref={addToRefs} className="mb-16 text-center bg-white p-8 rounded-xl shadow-lg">
                        <BoltIcon className="w-10 h-10 text-indigo-600 mx-auto mb-3"/>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Purpose: Simple E-commerce Store</h2>
                        <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
                            This project serves as a **full-stack demonstration** of the MERN architecture. It showcases proficiency in **RESTful API development**, **secure user authentication (JWT)**, and **complex state management** (Cart/Checkout flow) in a real-world application.
                        </p>
                    </section>
                    
                    {/* === 3. Skills and Mission/Vision (Two Columns) === */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        
                        {/* SKILLS */}
                        <section ref={addToRefs} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Technical Skills & Tools</h2>
                            <div className="flex flex-wrap gap-3">
                                {SKILLS.map((skill, index) => (
                                    <span key={index} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-md">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* MISSION / VISION */}
                        <section ref={addToRefs} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Mission / Vision</h2>
                            <p className="text-gray-700 font-semibold">
                                Mission: To build performant, modular, and reusable full-stack systems.
                            </p>
                            <p className="text-gray-700 font-semibold">
                                Vision: To master cloud-native development and architecture design patterns.
                            </p>
                        </section>
                    </div>

                    {/* === 4. Contact Info and Future Enhancements === */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        
                        {/* CONTACT INFO */}
                        <section ref={addToRefs} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Contact Info</h2>
                            <div className="space-y-3 text-gray-700">
                                <p className="flex items-center"><EnvelopeIcon className="w-5 h-5 mr-2 text-indigo-500" /> developer@example.com</p>
                                <p className="flex items-center"><PhoneIcon className="w-5 h-5 mr-2 text-indigo-500" /> (123) 456-7890</p>
                            </div>
                        </section>

                        {/* FUTURE ENHANCEMENTS */}
                        <section ref={addToRefs} className="bg-gray-900 text-white p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 border-b pb-2 flex items-center">
                                <RocketLaunchIcon className="w-6 h-6 mr-2 text-indigo-400" />
                                Future Enhancements
                            </h2>
                            <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
                                {ENHANCEMENTS.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;