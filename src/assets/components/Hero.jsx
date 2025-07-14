import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Hero = () => {
    const heroRef = useRef(null)
    const textRef = useRef(null)
    const cursorRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline()

        // Animate the main text
        tl.fromTo(textRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        )

        // Animate the cursor
        tl.fromTo(cursorRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            "-=0.5"
        )

        // Cursor blink animation
        gsap.to(cursorRef.current, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        })

        // Parallax effect on scroll
        const handleScroll = () => {
            const scrolled = window.pageYOffset
            const rate = scrolled * -0.5
            gsap.to(heroRef.current, {
                y: rate,
                duration: 0.5
            })
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900"></div>

            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <div ref={textRef} className="space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Hi, I'm{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                            Louay
                        </span>
                    </h1>

                    <div className="text-2xl md:text-4xl text-gray-300 mb-8">
                        <span>I'm a </span>
                        <span className="text-blue-500 font-semibold">Full Stack Developer</span>
                        <span ref={cursorRef} className="text-blue-500 ml-1">|</span>
                    </div>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Passionate about creating beautiful, functional, and user-friendly web applications.
                        I love turning ideas into reality through code.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                        <a
                            href="#projects"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            View My Work
                        </a>
                        <a
                            href="#contact"
                            className="border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                            Get In Touch
                        </a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero 