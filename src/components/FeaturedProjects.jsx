import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getFeaturedProjects } from '../data/projects'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const FeaturedProjects = () => {
    const sectionRef = useRef(null)
    const projectsRef = useRef(null)
    const navButtonsRef = useRef(null)
    const [activeCard, setActiveCard] = useState(null)
    const [showPrivatePopup, setShowPrivatePopup] = useState(false)
    const featuredProjects = getFeaturedProjects()

    // Additional portfolio projects to ensure we always have 3
    const additionalProjects = [
        {
            id: 'woldemedihn-portfolio',
            title: 'Woldemedihn Portfolio',
            description: 'A modern, interactive portfolio website built with React, Three.js, and GSAP. Features smooth animations, 3D elements, and a responsive design that showcases my skills and projects.',
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
            technologies: ['React', 'Three.js', 'GSAP', 'Tailwind CSS', 'Vite'],
            category: 'portfolio',
            liveUrl: 'https://wolide.dev',
            githubUrl: 'https://github.com/woldemedihn/wolide.dev',
            featured: true
        },
        {
            id: 'interactive-3d-portfolio',
            title: 'Interactive 3D Portfolio',
            description: 'A stunning 3D portfolio website featuring interactive elements, smooth animations, and immersive user experience built with modern web technologies.',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            technologies: ['Three.js', 'React', 'GSAP', 'WebGL', 'Framer Motion'],
            category: '3d',
            liveUrl: '#',
            githubUrl: '#',
            featured: true
        }
    ]

    // Ensure we show exactly 3 projects
    const getDisplayProjects = () => {
        const availableProjects = [...featuredProjects]
        const needed = 3 - availableProjects.length

        if (needed > 0) {
            // Add additional projects to fill the gap
            availableProjects.push(...additionalProjects.slice(0, needed))
        }

        return availableProjects.slice(0, 3)
    }

    const displayProjects = getDisplayProjects()

    useEffect(() => {
        // Enhanced mobile detection and optimization
        const isMobile = window.innerWidth < 768
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

        // Optimize ScrollTrigger for mobile devices
        ScrollTrigger.config({
            ignoreMobileResize: true,
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
            // Mobile-specific optimizations
            preventOverlaps: true,
            fastScrollEnd: true,
            syncInterval: isMobile ? 60 : 30
        })

        // Set mobile-specific animation settings
        const animationDuration = isMobile ? 0.6 : 0.8
        const animationEase = isMobile ? "power2.out" : "back.out(1.7)"
        const staggerDelay = isMobile ? 0.1 : 0.2

        // Animate section title and description
        const title = sectionRef.current?.querySelector('.section-title')
        const description = sectionRef.current?.querySelector('.section-description')

        if (title && description) {
            gsap.fromTo([title, description],
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: animationDuration,
                    ease: animationEase,
                    stagger: staggerDelay,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse",
                        markers: false,
                        invalidateOnRefresh: true,
                        // Mobile-specific trigger settings
                        fastScrollEnd: isMobile,
                        preventOverlaps: true
                    }
                }
            )
        }

        // Animate navigation buttons
        const navButtons = navButtonsRef.current?.querySelectorAll('.nav-button')

        if (navButtons) {
            gsap.fromTo(navButtons,
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: animationDuration,
                    ease: animationEase,
                    stagger: staggerDelay,
                    scrollTrigger: {
                        trigger: navButtonsRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse",
                        markers: false,
                        invalidateOnRefresh: true,
                        fastScrollEnd: isMobile,
                        preventOverlaps: true
                    }
                }
            )
        }

        // Animate project cards with stagger
        const projectCards = projectsRef.current?.querySelectorAll('.project-card')

        if (projectCards) {
            gsap.fromTo(projectCards,
                { opacity: 0, y: 60, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: animationDuration,
                    ease: animationEase,
                    stagger: staggerDelay,
                    scrollTrigger: {
                        trigger: projectsRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse",
                        markers: false,
                        invalidateOnRefresh: true,
                        fastScrollEnd: isMobile,
                        preventOverlaps: true
                    }
                }
            )
        }

        // Enhanced resize handling for mobile
        const handleResize = () => {
            // Debounce resize events
            clearTimeout(window.resizeTimeout)
            window.resizeTimeout = setTimeout(() => {
                ScrollTrigger.refresh()
            }, 250)
        }

        // Enhanced orientation change handling
        const handleOrientationChange = () => {
            setTimeout(() => {
                ScrollTrigger.refresh()
            }, 500)
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('orientationchange', handleOrientationChange)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('orientationchange', handleOrientationChange)
            clearTimeout(window.resizeTimeout)
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    const handleLiveDemoClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const handleGitHubClick = (e, project) => {
        // If it's the portfolio project and GitHub URL is '#', show private popup
        if (project.id === 'portfolio' && project.githubUrl === '#') {
            e.preventDefault()
            setShowPrivatePopup(true)
            // Hide popup after 3 seconds
            setTimeout(() => setShowPrivatePopup(false), 3000)
        }
    }

    const handleCardTouch = (projectId) => {
        setActiveCard(activeCard === projectId ? null : projectId)
    }

    // Enhanced touch handling for mobile
    const handleTouchStart = (projectId) => {
        setActiveCard(projectId)
    }

    const handleTouchEnd = () => {
        // Keep active state for a moment on mobile for better UX
        setTimeout(() => {
            setActiveCard(null)
        }, 300)
    }

    return (
        <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                        Featured Projects
                    </h2>
                    <p className="section-description text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
                        Here are some of my recent projects that showcase my skills in 3D web development,
                        interactive design, and modern web technologies.
                    </p>
                </div>

                {/* Navigation Buttons Section - Top */}
                <div ref={navButtonsRef} className="text-center mb-12 sm:mb-16">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                        <Link
                            to="/projects"
                            className="nav-button group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden touch-feedback"
                        >
                            <span className="relative z-10 flex items-center space-x-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <span className="text-sm sm:text-base">All Projects</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
                        </Link>

                        <Link
                            to="/blog"
                            className="nav-button group inline-flex items-center space-x-3 border-2 border-blue-500 text-blue-500 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 relative overflow-hidden touch-feedback"
                        >
                            <span className="relative z-10 flex items-center space-x-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span className="text-sm sm:text-base">All Blogs</span>
                            </span>
                            <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </Link>
                    </div>
                </div>

                <div ref={projectsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                    {displayProjects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card group gsap-animation touch-feedback"
                            onTouchStart={() => handleTouchStart(project.id)}
                            onTouchEnd={handleTouchEnd}
                            onMouseEnter={() => setActiveCard(project.id)}
                            onMouseLeave={() => setActiveCard(null)}
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transform hover:-translate-y-2 group-active:-translate-y-1">
                                {/* Project Image */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover group-hover:scale-110 group-active:scale-105 transition-transform duration-700"
                                        style={{ imageRendering: 'crisp-edges' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"></div>

                                    {/* Live Demo Button Overlay - Enhanced for mobile */}
                                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${activeCard === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'}`}>
                                        <button
                                            onClick={() => handleLiveDemoClick(project.liveUrl)}
                                            className="group/btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden touch-feedback"
                                        >
                                            <span className="relative z-10 flex items-center space-x-2">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                <span className="text-sm sm:text-base">Live Demo</span>
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover/btn:opacity-100 group-active/btn:opacity-100 transition-opacity duration-300"></div>
                                        </button>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                                        <span className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Enhanced Mobile Touch Indicator */}
                                    <div className="absolute top-3 right-3 sm:hidden">
                                        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeCard === project.id ? 'bg-blue-500 scale-150 shadow-lg' : 'bg-gray-400'}`}></div>
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="p-4 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-500 group-active:text-blue-500 transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                                        {project.technologies.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                                                +{project.technologies.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2 sm:space-x-3">
                                        <Link
                                            to={`/projects/${project.id}`}
                                            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 text-center group/btn touch-feedback"
                                        >
                                            <span className="group-hover/btn:text-blue-500 group-active/btn:text-blue-500 transition-colors duration-300 text-sm sm:text-base">
                                                View Details
                                            </span>
                                        </Link>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => handleGitHubClick(e, project)}
                                            className="flex-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 sm:px-4 py-2 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 text-center group/btn touch-feedback"
                                        >
                                            <span className="group-hover/btn:text-blue-500 dark:group-hover/btn:text-blue-600 group-active/btn:text-blue-500 dark:group-active/btn:text-blue-600 transition-colors duration-300 text-sm sm:text-base">
                                                GitHub
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll Down Arrow */}
                <div className="text-center mt-12 sm:mt-16">
                    <button
                        onClick={() => {
                            const skillsSection = document.querySelector('#skills') || document.querySelector('[data-section="skills"]')
                            if (skillsSection) {
                                skillsSection.scrollIntoView({ behavior: 'smooth' })
                            }
                        }}
                        className="group inline-flex flex-col items-center space-y-2 text-gray-400 hover:text-blue-500 transition-colors duration-300 touch-feedback"
                    >
                        <span className="text-sm font-medium">Scroll to Skills</span>
                        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center group-hover:scale-110 group-active:scale-105 transition-transform duration-300">
                            <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce"></div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Private Repository Popup */}
            {showPrivatePopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowPrivatePopup(false)}></div>
                    <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl transform transition-all duration-300 scale-100">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Private Repository</h3>
                            <p className="text-gray-600 dark:text-gray-400">This project's source code is private and not publicly accessible.</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default FeaturedProjects 