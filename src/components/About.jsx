import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
// Import your profile image (update the path to match your image)
import profileImage from '../assets/images/profile.jpg'

const About = () => {
    const sectionRef = useRef(null)
    const contentRef = useRef(null)
    const [isLearningOpen, setIsLearningOpen] = useState(false)

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
        <section id="about" ref={sectionRef} className="py-20 bg-gray-100/50 dark:bg-gray-800/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Image and stats */}
                    <div className="flex flex-col items-center">
                        <div className="relative mb-8">
                            <div className="w-80 h-80 mx-auto relative">
                                {/* Profile image */}
                                <img
                                    src={profileImage}
                                    alt="Woldemedihn Mezene - Senior Frontend Engineer"
                                    className="w-full h-full object-cover rounded-full shadow-2xl"
                                    onError={(e) => {
                                        // Fallback to placeholder if image fails to load
                                        e.target.style.display = 'none'
                                        e.target.nextSibling.style.display = 'flex'
                                    }}
                                />
                                {/* Fallback placeholder (hidden by default) */}
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center hidden">
                                    <div className="text-white text-6xl font-bold">W</div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"></div>
                            </div>
                        </div>

                        {/* Stats - centered horizontally with image */}
                        <div className="grid grid-cols-3 gap-4 text-center w-full max-w-sm">
                            <div className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
                                <div className="text-3xl font-bold text-blue-500">10+</div>
                                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm break-words whitespace-normal mt-1 w-full flex items-center justify-center">Projects Built</div>
                            </div>
                            <div className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
                                <div className="text-3xl font-bold text-purple-500">3D</div>
                                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm break-words whitespace-normal mt-1 w-full flex items-center justify-center">Web Experiences</div>
                            </div>
                            <div className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
                                <div className="text-3xl font-bold text-green-500">100%</div>
                                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm break-words whitespace-normal mt-1 w-full flex items-center justify-center">Passion Driven</div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                About <span className="text-blue-500">Me</span>
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                        </div>

                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            I'm Woldemedihn Mezene, a Senior Frontend Engineer with Fullstack experience, passionate about building fast, immersive, and scalable web experiences.
                        </p>

                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            I specialize in React, Next.js, Three.js / React Three Fiber, GSAP animations, and TypeScript, turning complex ideas into responsive, interactive user interfaces.
                        </p>

                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            My journey started with a love for creative design — now I combine 3D graphics, smooth motion, and solid architecture to deliver production-ready code.
                        </p>

                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            When I'm not coding, I'm studying advanced algorithms and sharpening my problem-solving skills with Python and C++.
                        </p>

                        {/* Key points */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-700 dark:text-gray-300">3D Web Development & Three.js</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="text-gray-700 dark:text-gray-300">Interactive Animations with GSAP</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-700 dark:text-gray-300">Problem Solving with Python & C++</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-gray-700 dark:text-gray-300">Modern React & Performance Optimization</span>
                            </div>
                        </div>

                        {/* Current Learning - Collapsible */}
                        <div className="bg-gray-100/50 dark:bg-gray-700/30 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setIsLearningOpen(!isLearningOpen)}
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-200/50 dark:hover:bg-gray-600/30 transition-colors duration-200"
                            >
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Currently Learning</h4>
                                <svg
                                    className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${isLearningOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isLearningOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                <div className="p-4 pt-0 space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-lg">🧠</span>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">AI & Machine Learning</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Concepts, models, and practical integration</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-lg">🤖</span>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">Building AI Agents</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Autonomous workflows, LangChain, OpenAI tools</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-lg">🧩</span>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">Problem Solving & Algorithms</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">In Python and C++</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-lg">🌐</span>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">Advanced Three.js</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Shaders, performance optimization, physics, R3F</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Download CV button */}
                        <div className="pt-4">
                            <a
                                href="/wolde-Resume.pdf"
                                download
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Download Resume</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About 