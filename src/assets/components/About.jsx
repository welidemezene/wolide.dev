import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const About = () => {
    const sectionRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.fromTo(contentRef.current,
                            { opacity: 0, y: 50 },
                            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
                        )
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.3 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section id="about" ref={sectionRef} className="py-20 bg-gray-800/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Image and stats */}
                    <div className="space-y-8">
                        <div className="relative">
                            <div className="w-80 h-80 mx-auto lg:mx-0 relative">
                                {/* Placeholder for profile image */}
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                    <div className="text-white text-6xl font-bold">L</div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"></div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 text-center">
                            <div className="bg-gray-700/50 p-6 rounded-lg">
                                <div className="text-3xl font-bold text-blue-500">3+</div>
                                <div className="text-gray-400 text-sm">Years Experience</div>
                            </div>
                            <div className="bg-gray-700/50 p-6 rounded-lg">
                                <div className="text-3xl font-bold text-purple-500">50+</div>
                                <div className="text-gray-400 text-sm">Projects Completed</div>
                            </div>
                            <div className="bg-gray-700/50 p-6 rounded-lg">
                                <div className="text-3xl font-bold text-green-500">100%</div>
                                <div className="text-gray-400 text-sm">Client Satisfaction</div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-4">
                                About <span className="text-blue-500">Me</span>
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed">
                            I'm a passionate Full Stack Developer with over 3 years of experience in creating
                            modern web applications. I specialize in React, Node.js, and cloud technologies,
                            always striving to write clean, maintainable code and deliver exceptional user experiences.
                        </p>

                        <p className="text-lg text-gray-300 leading-relaxed">
                            When I'm not coding, you can find me exploring new technologies, contributing to
                            open-source projects, or sharing my knowledge with the developer community.
                            I believe in continuous learning and staying up-to-date with the latest industry trends.
                        </p>

                        {/* Key points */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-300">Full Stack Development</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="text-gray-300">UI/UX Design</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-300">Cloud Architecture</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-gray-300">Performance Optimization</span>
                            </div>
                        </div>

                        {/* Download CV button */}
                        <div className="pt-4">
                            <a
                                href="#"
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Download CV</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About 