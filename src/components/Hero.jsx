import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const heroRef = useRef(null)
    const textRef = useRef(null)
    const cursorRef = useRef(null)
    const nameRef = useRef(null)
    const descriptionRef = useRef(null)
    const buttonsRef = useRef(null)
    const techStackRef = useRef(null)
    const backgroundRef = useRef(null)
    const parallaxRef = useRef(null)
    const greetingRef = useRef(null)
    const titleRef = useRef(null)

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
        const animationDuration = isMobile ? 0.6 : 1
        const animationEase = isMobile ? "power2.out" : "power3.out"
        const staggerDelay = isMobile ? 0.05 : 0.1

        const tl = gsap.timeline()

        // Animate background elements with parallax (reduced complexity on mobile)
        gsap.fromTo(backgroundRef.current.querySelectorAll('div'),
            {
                opacity: 0,
                scale: 0.8,
                rotation: isMobile ? 0 : 0 // Disable rotation on mobile for better performance
            },
            {
                opacity: 1,
                scale: 1,
                rotation: isMobile ? 0 : 360,
                duration: isMobile ? 1.5 : 2,
                ease: "power2.out",
                stagger: isMobile ? 0.2 : 0.3
            }
        )

        // Animate greeting text with beautiful reveal
        const greetingText = greetingRef.current.textContent
        greetingRef.current.textContent = ''

        // Create spans for each character in greeting
        greetingText.split('').forEach((char, index) => {
            const span = document.createElement('span')
            span.textContent = char === ' ' ? '\u00A0' : char
            span.style.opacity = '0'
            span.style.transform = 'translateY(30px)'
            span.style.display = 'inline-block'
            greetingRef.current.appendChild(span)
        })

        // Animate greeting characters
        const greetingChars = greetingRef.current.querySelectorAll('span')
        tl.fromTo(greetingChars,
            {
                opacity: 0,
                y: 30,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: isMobile ? 0.4 : 0.6,
                ease: "back.out(1.7)",
                stagger: isMobile ? 0.02 : 0.03
            }
        )

        // Animate name with letter spacing reveal
        const nameText = nameRef.current.textContent
        nameRef.current.textContent = ''

        // Create spans for each letter
        nameText.split('').forEach((letter, index) => {
            const span = document.createElement('span')
            span.textContent = letter === ' ' ? '\u00A0' : letter
            span.style.opacity = '0'
            span.style.transform = 'translateY(50px)'
            span.style.display = 'inline-block'
            nameRef.current.appendChild(span)
        })

        // Animate each letter (optimized for mobile)
        const letters = nameRef.current.querySelectorAll('span')
        tl.fromTo(letters,
            {
                opacity: 0,
                y: 50,
                letterSpacing: isMobile ? '10px' : '20px'
            },
            {
                opacity: 1,
                y: 0,
                letterSpacing: '2px',
                duration: isMobile ? 0.6 : 0.8,
                ease: animationEase,
                stagger: isMobile ? 0.03 : 0.05
            },
            "-=0.3"
        )

        // Animate the title box
        tl.fromTo(titleRef.current,
            { opacity: 0, y: 30, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: animationDuration, ease: animationEase },
            "-=0.5"
        )

        // Animate the cursor
        tl.fromTo(cursorRef.current,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.3"
        )

        // Animate description
        tl.fromTo(descriptionRef.current,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: animationDuration, ease: animationEase },
            "-=0.5"
        )

        // Animate buttons (appear much earlier)
        tl.fromTo(buttonsRef.current.querySelectorAll('a'),
            { opacity: 0, y: 30, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: isMobile ? 0.6 : 0.8,
                ease: "back.out(1.7)",
                stagger: isMobile ? 0.1 : 0.2
            },
            "-=1.2"
        )

        // Animate tech stack (appear earlier)
        tl.fromTo(techStackRef.current.querySelectorAll('span'),
            { opacity: 0, y: 20, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: isMobile ? 0.4 : 0.6,
                ease: "power2.out",
                stagger: isMobile ? 0.05 : 0.1
            },
            "-=0.8"
        )

        // Cursor blink animation
        gsap.to(cursorRef.current, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        })

        // Enhanced parallax effect with ScrollTrigger (optimized for mobile)
        if (!isMobile) {
            gsap.to(parallaxRef.current, {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    fastScrollEnd: true,
                    preventOverlaps: true
                }
            })

            // Parallax for background elements (disabled on mobile for performance)
            gsap.to(backgroundRef.current.querySelectorAll('div'), {
                yPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                    fastScrollEnd: true,
                    preventOverlaps: true
                }
            })
        }

        // Animate elements on scroll into view (optimized for mobile)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    gsap.fromTo(entry.target,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: animationDuration,
                            ease: animationEase,
                            scrollTrigger: {
                                trigger: entry.target,
                                start: "top 80%",
                                end: "bottom 20%",
                                toggleActions: "play none none reverse",
                                fastScrollEnd: isMobile,
                                preventOverlaps: true
                            }
                        }
                    )
                }
            })
        }, { threshold: isMobile ? 0.05 : 0.1 })

        // Observe elements for scroll animations
        const elementsToObserve = [
            textRef.current,
            descriptionRef.current,
            buttonsRef.current,
            techStackRef.current
        ]

        elementsToObserve.forEach(el => {
            if (el) observer.observe(el)
        })

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
            observer.disconnect()
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('orientationchange', handleOrientationChange)
            clearTimeout(window.resizeTimeout)
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
            tl.kill()
        }
    }, [])

    return (
        <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 sm:pt-36">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900"></div>

            {/* Animated background elements */}
            <div ref={backgroundRef} className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Main content */}
            <div ref={parallaxRef} className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                {/* Greeting */}
                <div className="mb-4 sm:mb-6">
                    <h2 ref={greetingRef} className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
                        Hi, I'm
                    </h2>
                </div>

                {/* Main heading with beautiful styling */}
                <div className="mb-6 sm:mb-8">
                    <h1 ref={nameRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Wolde
                        </span>
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                            medihn
                        </span>
                    </h1>
                </div>

                {/* Title Box - Beautiful rounded design */}
                <div ref={titleRef} className="mb-8 sm:mb-12">
                    <div className="inline-block bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-blue-500/20 dark:border-blue-400/20 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 shadow-lg">
                        <div ref={textRef} className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-semibold">
                            <span className="text-blue-600 dark:text-blue-400">Full Stack Engineer</span>
                            <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                            <span className="text-purple-600 dark:text-purple-400">Specializing in</span>
                            <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                            <span className="text-pink-600 dark:text-pink-400">React Three Fiber</span>
                            <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                            <span className="text-green-600 dark:text-green-400">GSAP</span>
                            <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                            <span className="text-orange-600 dark:text-orange-400">Next.js</span>
                            <span ref={cursorRef} className="inline-block w-1 h-8 bg-blue-500 ml-2 animate-pulse"></span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div ref={descriptionRef} className="mb-8 sm:mb-12">
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
                        I'm a Senior Frontend Engineer with Fullstack experience,<br className="hidden sm:block" />
                        specializing in fast, scalable apps across web and mobile.<br className="hidden sm:block" />
                        I turn Figma designs and complex specs into clean, responsive UIs.<br className="hidden sm:block" />
                        Also a skilled Three.js developer crafting interactive 3D experiences.
                    </p>
                </div>

                {/* Action Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
                    <Link
                        to="/resume"
                        className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden touch-feedback"
                    >
                        <span className="relative z-10 flex items-center space-x-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm sm:text-base">View Resume</span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
                    </Link>

                    <Link
                        to="/contact"
                        className="group inline-flex items-center space-x-3 border-2 border-blue-500 text-blue-500 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 relative overflow-hidden touch-feedback"
                    >
                        <span className="relative z-10 flex items-center space-x-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm sm:text-base">Get In Touch</span>
                        </span>
                        <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </Link>
                </div>

                {/* Tech Stack Preview */}
                <div ref={techStackRef} className="mt-12">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Tech Stack</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['React', 'Three.js', 'GSAP', 'R3F', 'Next.js', 'TypeScript'].map((tech) => (
                            <span
                                key={tech}
                                className="bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm font-medium border border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg touch-feedback"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div> {/* End of main content container */}

            {/* Scroll indicator - moved outside main content to prevent overlap */}
            <div className="w-full flex justify-center mt-8 sm:mt-0 absolute left-0 right-0" style={{ bottom: 0 }}>
                <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center animate-bounce">
                    <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    )
}

export default Hero 