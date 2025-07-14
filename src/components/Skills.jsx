import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
    const skillsRef = useRef(null)
    const progressBarsRef = useRef(null)

    const skills = [
        { name: 'React', percentage: 90, color: 'from-blue-500 to-blue-600' },
        { name: 'Next.js', percentage: 88, color: 'from-black to-gray-800 dark:from-white to-gray-200' },
        { name: 'TypeScript', percentage: 85, color: 'from-blue-600 to-blue-700' },
        { name: 'Node.js', percentage: 82, color: 'from-green-600 to-green-700' },
        { name: 'Three.js', percentage: 85, color: 'from-green-500 to-green-600' },
        { name: 'GSAP', percentage: 88, color: 'from-purple-500 to-purple-600' },
        { name: 'Tailwind CSS', percentage: 92, color: 'from-cyan-500 to-cyan-600' },
        { name: 'JavaScript', percentage: 95, color: 'from-yellow-500 to-yellow-600' },
        { name: 'Python', percentage: 80, color: 'from-indigo-500 to-indigo-600' }
    ]

    const tools = [
        { name: 'Cursor Editor', icon: '⚡', color: 'hover:bg-purple-500/20 hover:border-purple-500' },
        { name: 'VS Code', icon: '💻', color: 'hover:bg-blue-500/20 hover:border-blue-500' },
        { name: 'Git', icon: '📚', color: 'hover:bg-orange-500/20 hover:border-orange-500' },
        { name: 'Figma', icon: '🎨', color: 'hover:bg-purple-500/20 hover:border-purple-500' },
        { name: 'Postman', icon: '📡', color: 'hover:bg-orange-500/20 hover:border-orange-500' },
        { name: 'Docker', icon: '🐳', color: 'hover:bg-blue-500/20 hover:border-blue-500' },
        { name: 'Vercel', icon: '🚀', color: 'hover:bg-black/20 hover:border-black dark:hover:bg-white/20 dark:hover:border-white' },
        { name: 'Netlify', icon: '🌐', color: 'hover:bg-green-500/20 hover:border-green-500' }
    ]

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

        // Animate skills section on scroll into view
        gsap.fromTo(skillsRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: animationDuration,
                ease: animationEase,
                scrollTrigger: {
                    trigger: skillsRef.current,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse",
                    fastScrollEnd: isMobile,
                    preventOverlaps: true
                }
            }
        )

        // Animate progress bars with fill effect (optimized for mobile)
        const progressBars = progressBarsRef.current?.querySelectorAll('.progress-bar')

        if (progressBars) {
            progressBars.forEach((bar, index) => {
                const percentage = skills[index].percentage

                gsap.fromTo(bar,
                    { width: '0%' },
                    {
                        width: `${percentage}%`,
                        duration: isMobile ? 1.5 : 2,
                        ease: "power2.out",
                        delay: index * (isMobile ? 0.05 : 0.1),
                        scrollTrigger: {
                            trigger: bar,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse",
                            fastScrollEnd: isMobile,
                            preventOverlaps: true
                        }
                    }
                )
            })
        }

        // Animate tools grid (optimized for mobile)
        const toolItems = skillsRef.current?.querySelectorAll('.tool-item')

        if (toolItems) {
            gsap.fromTo(toolItems,
                { opacity: 0, y: 30, scale: 0.8 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: isMobile ? 0.6 : 0.8,
                    ease: isMobile ? "power2.out" : "back.out(1.7)",
                    stagger: isMobile ? 0.05 : 0.1,
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse",
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

    return (
        <section ref={skillsRef} className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Skills & Technologies
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        I specialize in modern web technologies and tools that enable me to create
                        exceptional digital experiences.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Skills Progress */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                            Technical Skills
                        </h3>
                        <div ref={progressBarsRef} className="space-y-6">
                            {skills.map((skill, index) => (
                                <div key={skill.name} className="group">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 group-active:text-blue-500 transition-colors duration-300">
                                            {skill.name}
                                        </span>
                                        <span className="text-sm font-semibold text-blue-500">
                                            {skill.percentage}%
                                        </span>
                                    </div>
                                    <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`progress-bar h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
                                            style={{ width: '0%' }}
                                        >
                                            {/* Animated shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools & Technologies */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                            Tools & Technologies
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {tools.map((tool) => (
                                <div
                                    key={tool.name}
                                    className={`tool-item group relative bg-white dark:bg-gray-700 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 transition-all duration-300 cursor-pointer touch-feedback ${tool.color}`}
                                >
                                    <div className="text-center space-y-2">
                                        <div className="text-2xl group-hover:scale-110 group-active:scale-105 transition-transform duration-300">
                                            {tool.icon}
                                        </div>
                                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white group-active:text-gray-900 dark:group-active:text-white transition-colors duration-300">
                                            {tool.name}
                                        </div>
                                    </div>

                                    {/* Tooltip - Hidden on mobile for better UX */}
                                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10 hidden sm:block">
                                        {tool.name}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Skills */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                        Additional Skills
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            'Responsive Design', 'UI/UX Design', 'API Integration',
                            'Performance Optimization', 'Cross-browser Compatibility',
                            'Version Control', 'Agile Development', 'Problem Solving'
                        ].map((skill) => (
                            <span
                                key={skill}
                                className="bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl text-sm font-medium border border-blue-200 dark:border-blue-800 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-all duration-300 hover:scale-105 touch-feedback"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills 