import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import BackButton from '../components/BackButton'

const Resume = () => {
    const pageRef = useRef(null)
    const [isDownloading, setIsDownloading] = useState(false)
    const [isViewing, setIsViewing] = useState(false)

    useEffect(() => {
        // Page entrance animation
        gsap.fromTo(pageRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power2.out" }
        )

        // Animate resume sections
        const sections = pageRef.current.querySelectorAll('.resume-section')
        gsap.fromTo(sections,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.2
            }
        )
    }, [])

    const handleDownload = async () => {
        setIsDownloading(true)
        try {
            // Download the PDF from public folder
            const link = document.createElement('a')
            link.href = '/wolde-Resume.pdf'
            link.download = 'Woldemedihn_Mezene_Resume.pdf'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error('Download failed:', error)
        } finally {
            setIsDownloading(false)
        }
    }

    const handleViewPDF = () => {
        setIsViewing(true)
        try {
            // Open the PDF in a new tab for viewing
            window.open('/wolde-Resume.pdf', '_blank')
        } catch (error) {
            console.error('Failed to open PDF:', error)
        } finally {
            setIsViewing(false)
        }
    }

    return (
        <div ref={pageRef} className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                {/* Back Button */}
                <div className="mb-8">
                    <BackButton />
                </div>

                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                        My <span className="text-blue-500">Resume</span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Senior Frontend Engineer with Fullstack experience and 3D Creative Technologist
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        {/* View PDF Button */}
                        <button
                            onClick={handleViewPDF}
                            disabled={isViewing}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isViewing ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Opening...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span>View PDF</span>
                                </>
                            )}
                        </button>

                        {/* Download PDF Button */}
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDownloading ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Downloading...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Download PDF</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Resume Content */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    {/* Resume Header */}
                    <div className="resume-section bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 sm:p-12">
                        <div className="text-center sm:text-left">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Woldemedihn Mezene</h2>
                            <p className="text-xl sm:text-2xl text-blue-100 mb-4">Software Engineering Student | Passionate Problem Solver</p>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                <div className="flex flex-col sm:flex-row sm:space-x-6 text-blue-100">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        woldemedihnmezene@gmail.com
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        +2519 04660160
                                    </span>
                                </div>
                                <div className="flex justify-center sm:justify-end space-x-4">
                                    <a href="https://github.com/welidemezene" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.linkedin.com/in/welidemedhinmezene/" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resume Body */}
                    <div className="p-8 sm:p-12 space-y-8">
                        {/* Profile */}
                        <div className="resume-section">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Profile
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                I'm a Senior Frontend Engineer with Fullstack experience and 3D Creative Technologist with expertise in modern web development, Three.js, and interactive animations. Built 10+ production-ready projects including immersive 3D experiences, modern e-commerce platforms, and interactive web applications. Demonstrated mastery of React, Three.js, GSAP animations, and competitive programming with 500+ solved challenges. Passionate about creating engaging user experiences through cutting-edge technology and creative problem-solving.
                            </p>
                        </div>

                        {/* Education */}
                        <div className="resume-section">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                    </svg>
                                </span>
                                Education
                            </h3>
                            <div className="space-y-6">
                                <div className="border-l-4 border-green-500 pl-6">
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Software Engineering</h4>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium">Adama Science and Technology University</p>
                                    <p className="text-gray-500 dark:text-gray-400">2024 – 2028</p>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2">CGPA: 3.5/4.0</p>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                                        <strong>Relevant Coursework:</strong> Introduction to programming (Python), Fundamental of Programming (C++), Data Structures and Algorithms, Database Management, Object Oriented Programming.
                                    </p>
                                </div>
                                <div className="border-l-4 border-blue-500 pl-6">
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Fullstack Web Application Development</h4>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium">Evangadi</p>
                                    <p className="text-gray-500 dark:text-gray-400">04/2024 – 04/2025</p>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                                        Evangadi is a dynamic network dedicated to empowering individuals through coding education and mentorship. Founded by Adugna Bekele, Evangadi aims to transform lives by fostering collaboration and providing resources for those interested in technology careers.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="resume-section">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                    </svg>
                                </span>
                                Skills
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Programming Languages</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Python', 'C++', 'JavaScript', 'Java'].map((skill) => (
                                                <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Frontend Development</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'GSAP', 'React-Three-Fiber'].map((skill) => (
                                                <span key={skill} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">3D Development</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Three.js', 'WebGL', '3D Modeling', 'Animation', 'Interactive Experiences'].map((skill) => (
                                                <span key={skill} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Animation & Graphics</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['GSAP', 'CSS Animations', 'Canvas API', 'SVG Animations'].map((skill) => (
                                                <span key={skill} className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tools & Frameworks</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Git', 'GitHub', 'VS Code', 'Webpack', 'Vite'].map((skill) => (
                                                <span key={skill} className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Databases</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['MySQL'].map((skill) => (
                                                <span key={skill} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="resume-section">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Projects
                            </h3>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "Modern Portfolio Website",
                                        tech: "React, Three.js, GSAP, Tailwind CSS",
                                        type: "Personal Brand",
                                        description: "Built sophisticated portfolio with advanced animations and smooth page transitions. Implemented 3D background animations and interactive project showcases. Created responsive design with modern UI/UX principles and accessibility features. Integrated blog system, contact forms, and dynamic content management."
                                    },
                                    {
                                        title: "3D Interactive Portfolio Experience",
                                        tech: "Three.js, React, GSAP",
                                        type: "Personal Portfolio",
                                        description: "Developed immersive 3D interactive room experience with real-time lighting and physics. Implemented smooth camera controls, object interactions, and dynamic animations. Created responsive 3D environment with optimized performance for web browsers. Integrated music player functionality and interactive elements within 3D space."
                                    },
                                    {
                                        title: "iPhone 17 Pro Apple-Inspired Website",
                                        tech: "React, Three.js, GSAP",
                                        type: "E-commerce Clone",
                                        description: "Developed pixel-perfect Apple-inspired website with advanced 3D product visualization. Implemented smooth scroll animations, parallax effects, and interactive product demos. Created responsive design matching Apple's design language and user experience. Integrated product galleries, specifications, and purchase flow."
                                    },
                                    {
                                        title: "Flight Booking System",
                                        tech: "React, Node.js, Database Design",
                                        type: "Travel Platform",
                                        description: "Developed complete flight booking platform with search, filtering, and reservation system. Implemented real-time pricing, seat selection, and booking confirmation. Created responsive design with interactive maps and flight tracking. Integrated payment processing and email notification systems."
                                    },
                                    {
                                        title: "Snake Game - Modern Edition",
                                        tech: "JavaScript, Canvas API, GSAP",
                                        type: "Gaming Application",
                                        description: "Developed modern snake game with advanced graphics and smooth animations. Implemented responsive controls, score tracking, and progressive difficulty levels. Created engaging visual effects and sound integration for enhanced gameplay. Optimized for mobile devices with touch controls and adaptive layouts."
                                    },
                                    {
                                        title: "Chocolate E-Commerce Website",
                                        tech: "React, Three.js, GSAP",
                                        type: "Product Showcase",
                                        description: "Built immersive chocolate product website with 3D product visualization. Implemented interactive product tours and virtual tasting experiences. Created responsive design with smooth animations and engaging user interface. Developed product catalog with advanced filtering and recommendation system."
                                    },
                                    {
                                        title: "Crowny Hotel Booking Platform",
                                        tech: "React, Node.js, MySQL",
                                        type: "Full-Stack Application",
                                        description: "Built comprehensive hotel booking system with real-time availability and booking management. Implemented user authentication, payment processing, and review systems. Created responsive design with modern animations and intuitive user interface. Developed admin dashboard for hotel management and booking analytics."
                                    },
                                    {
                                        title: "PointCar E-Commerce Website",
                                        tech: "React, Node.js",
                                        type: "E-commerce Platform",
                                        description: "Designed and developed a user-friendly platform for buying and selling cars. Implemented product search, filter, and sorting functionality to enhance user experience. Utilized React for front-end and Node.js for back-end, ensuring smooth performance."
                                    }
                                ].map((project, index) => (
                                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                                            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1 sm:mt-0">{project.type}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{project.tech}</p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="resume-section">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                    </svg>
                                </span>
                                Experience
                            </h3>
                            <div className="space-y-6">
                                <div className="border-l-4 border-teal-500 pl-6">
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Freelance Full-Stack Developer & 3D Creative Technologist</h4>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium">Self-Employed</p>
                                    <p className="text-gray-500 dark:text-gray-400">2023 - Present</p>
                                    <ul className="text-gray-600 dark:text-gray-300 mt-3 space-y-1 text-sm">
                                        <li>• <strong>Delivered 10+ production-ready projects</strong> across various industries and technologies</li>
                                        <li>• Specialized in creating immersive 3D web experiences and interactive applications</li>
                                        <li>• Implemented modern development practices including responsive design and performance optimization</li>
                                        <li>• Collaborated with clients to deliver custom solutions meeting specific business requirements</li>
                                    </ul>
                                </div>
                                <div className="border-l-4 border-blue-500 pl-6">
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Competitive Programming & Problem Solving</h4>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium">CSEC Club Member</p>
                                    <p className="text-gray-500 dark:text-gray-400">2024 - Present</p>
                                    <ul className="text-gray-600 dark:text-gray-300 mt-3 space-y-1 text-sm">
                                        <li>• <strong>Solved 500+ programming challenges</strong> across LeetCode, Codeforces, and HackerRank</li>
                                        <li>• Developed efficient algorithms and optimized solutions for complex computational problems</li>
                                        <li>• Participated in coding competitions and hackathons, consistently ranking in top 20%</li>
                                        <li>• Mentored junior students in problem-solving techniques and algorithm design</li>
                                    </ul>
                                </div>
                                <div className="border-l-4 border-purple-500 pl-6">
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">3D Development & Animation Specialist</h4>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium">Personal Projects</p>
                                    <p className="text-gray-500 dark:text-gray-400">2022 - Present</p>
                                    <ul className="text-gray-600 dark:text-gray-300 mt-3 space-y-1 text-sm">
                                        <li>• Created immersive 3D web experiences using Three.js and WebGL technologies</li>
                                        <li>• Developed interactive animations and visual effects using GSAP and modern CSS</li>
                                        <li>• Implemented responsive 3D graphics optimized for various devices and browsers</li>
                                        <li>• Built custom 3D components and reusable animation libraries</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="resume-section">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </span>
                                Achievements & Leadership
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Project Portfolio: Successfully delivered 10+ diverse projects showcasing full-stack and 3D development skills",
                                    "Technical Excellence: Mastered modern web technologies including React, Three.js, and GSAP animations",
                                    "Problem-Solving Champion: Solved 500+ programming challenges with 85% success rate",
                                    "Academic Performance: Maintained 3.5 GPA while building extensive project portfolio",
                                    "Community Contribution: Active CSEC Club member and technical mentor"
                                ].map((achievement, index) => (
                                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <svg className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{achievement}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="resume-section">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Languages
                            </h3>
                            <div className="flex space-x-6">
                                <div className="flex items-center space-x-2">
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                    <span className="text-gray-900 dark:text-white font-medium">English</span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">(Fluent)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                    <span className="text-gray-900 dark:text-white font-medium">Amharic</span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">(Native)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resume 