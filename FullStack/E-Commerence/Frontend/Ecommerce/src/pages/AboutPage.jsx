// src/pages/AboutPage.jsx (REFINED MEET OUR FOUNDERS SECTION)

import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SparklesIcon, UsersIcon, ShieldCheckIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap'; 
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
gsap.registerPlugin(ScrollTrigger); 

const AboutPage = () => {
    // Refs for animation targets
    const heroRef = useRef(null);
    const uspRefs = useRef([]);
    uspRefs.current = []; // Array to store refs for scroll animation

    // Function to dynamically add elements to the refs array
    const addToRefs = (el) => {
        if (el && !uspRefs.current.includes(el)) {
            uspRefs.current.push(el);
        }
    };

    useEffect(() => {
        // --- 1. Hero Entrance Animation ---
        if (heroRef.current) {
            gsap.from(heroRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.3, 
                ease: "power3.out",
            });
        }

        // --- 2. Scroll-Triggered Animation (Targeting ALL items added via addToRefs) ---
        uspRefs.current.forEach((el, index) => {
            gsap.from(el, {
                opacity: 0,
                y: 50, // Added vertical shift for a better fade-up effect
                duration: 1,
                delay: index * 0.1, // Stagger effect for items in the same section
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%", // Start animation slightly earlier
                    toggleActions: "play none none none",
                }
            });
        });

    }, []); 

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow">
                {/* === 1. Hero Section: Company Title & Mission === */}
                <section ref={heroRef} className="bg-indigo-700 text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        Building the Future of E-commerce
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        We are a passionate team committed to style, sustainability, and seamless shopping.
                    </p>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    
                    {/* === 2. Our Mission and Vision (Applying addToRefs for animation) === */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        <div ref={addToRefs} className="space-y-4 p-4 rounded-lg bg-white shadow">
                            <SparklesIcon className="w-10 h-10 text-indigo-600" />
                            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                            <p className="text-gray-700 leading-relaxed">
                                To curate a seamless and ethical shopping experience by connecting consumers with high-quality, sustainable, and trend-setting fashion from around the globe.
                            </p>
                        </div>
                        <div ref={addToRefs} className="space-y-4 p-4 rounded-lg bg-white shadow">
                            <ShieldCheckIcon className="w-10 h-10 text-indigo-600" />
                            <h2 className="text-3xl font-bold text-gray-900">Our Commitment</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We are committed to ethical sourcing, fair labor practices, and reducing our environmental footprint. Every purchase supports our mission to make the fashion industry more responsible.
                            </p>
                        </div>
                    </section>
                    
                    {/* === 3. Milestones & History (Completed Section) === */}
                    <section className="text-center mb-20 bg-gray-100 p-10 rounded-xl shadow-inner">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Milestones & History</h2>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div ref={addToRefs} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500">
                                <CalendarDaysIcon className="w-6 h-6 text-indigo-500 mb-2 mx-auto"/>
                                <h4 className="text-2xl font-bold">2018</h4>
                                <p className="text-sm text-gray-600">Founded SHOP.CO as a small boutique marketplace.</p>
                            </div>
                            <div ref={addToRefs} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500">
                                <CalendarDaysIcon className="w-6 h-6 text-indigo-500 mb-2 mx-auto"/>
                                <h4 className="text-2xl font-bold">2021</h4>
                                <p className="text-sm text-gray-600">Launched Global Shipping and integrated our first 100 sustainable brands.</p>
                            </div>
                            <div ref={addToRefs} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500">
                                <CalendarDaysIcon className="w-6 h-6 text-indigo-500 mb-2 mx-auto"/>
                                <h4 className="text-2xl font-bold">2024</h4>
                                <p className="text-sm text-gray-600">Hit 1 Million Orders milestone and expanded into home goods.</p>
                            </div>
                        </div>
                    </section>

                    {/* === 4. Meet the Team (Finalized Section) === */}
                    <section className="text-center">
                        <UsersIcon className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-12">Meet Our Founders</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* Team Member 1 - Alex Johnson */}
                            <div ref={addToRefs} className="space-y-3 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                                <img src="https://via.placeholder.com/150/4f46e5/ffffff?text=Alex+J" alt="Alex Johnson" className="w-32 h-32 mx-auto rounded-full object-cover shadow-md" />
                                <h3 className="text-2xl font-bold text-gray-900">Alex Johnson</h3>
                                <p className="text-indigo-600 font-medium text-lg">CEO & Platform Visionary</p>
                                <p className="text-sm text-gray-600">Alex oversees technology and strategic growth, ensuring a seamless digital experience for all users.</p>
                            </div>
                            {/* Team Member 2 - Maria Chen */}
                            <div ref={addToRefs} className="space-y-3 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                                <img src="https://via.placeholder.com/150/6366f1/ffffff?text=Maria+C" alt="Maria Chen" className="w-32 h-32 mx-auto rounded-full object-cover shadow-md" />
                                <h3 className="text-2xl font-bold text-gray-900">Maria Chen</h3>
                                <p className="text-indigo-600 font-medium text-lg">Head of Design & Sourcing</p>
                                <p className="text-sm text-gray-600">Maria is responsible for curating our collections and upholding our strict standards for quality and ethical sourcing.</p>
                            </div>
                            {/* Team Member 3 - David Lee */}
                            <div ref={addToRefs} className="space-y-3 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                                <img src="https://via.placeholder.com/150/4338ca/ffffff?text=David+L" alt="David Lee" className="w-32 h-32 mx-auto rounded-full object-cover shadow-md" />
                                <h3 className="text-2xl font-bold text-gray-900">David Lee</h3>
                                <p className="text-indigo-600 font-medium text-lg">Chief Operations Officer (COO)</p>
                                <p className="text-sm text-gray-600">David manages all logistics, fulfillment, and customer support operations to ensure every order arrives quickly and safely.</p>
                            </div>
                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;