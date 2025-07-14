import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'
import profileImage from '../assets/images/profile.jpg'
import { FaPaperPlane, FaComments } from 'react-icons/fa';

const BackgroundAnimation = () => {
    const containerRef = useRef(null)
    const lightsRef = useRef([])
    const mouseRef = useRef({ x: 0, y: 0 })
    const animationRef = useRef(null)
    const [isDesktop, setIsDesktop] = useState(true)
    const { isDark } = useTheme()

    useEffect(() => {
        // Check if device is desktop
        const checkDevice = () => {
            const isDesktopDevice = window.innerWidth > 768 && !('ontouchstart' in window)
            setIsDesktop(isDesktopDevice)
        }

        checkDevice()
        window.addEventListener('resize', checkDevice)

        return () => {
            window.removeEventListener('resize', checkDevice)
        }
    }, [])

    useEffect(() => {
        if (!isDesktop || !containerRef.current) return

        const container = containerRef.current
        const lights = lightsRef.current

        // Mouse move handler
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }

        // Animation loop
        const animateLights = () => {
            lights.forEach((light, index) => {
                if (!light) return

                // Calculate target position with different delays for each light
                const delay = (index + 1) * 0.1
                const targetX = mouseRef.current.x + (Math.random() - 0.5) * 100
                const targetY = mouseRef.current.y + (Math.random() - 0.5) * 100

                // Smooth animation with easing
                gsap.to(light, {
                    x: targetX,
                    y: targetY,
                    duration: 2 + delay,
                    ease: "power2.out",
                    overwrite: false
                })

                // Subtle scaling effect
                gsap.to(light, {
                    scale: 0.8 + Math.random() * 0.4,
                    duration: 3 + Math.random() * 2,
                    ease: "power1.inOut",
                    overwrite: false
                })
            })

            animationRef.current = requestAnimationFrame(animateLights)
        }

        // Initialize lights positions
        const initLights = () => {
            lights.forEach((light, index) => {
                if (!light) return

                // Random initial positions
                const x = Math.random() * window.innerWidth
                const y = Math.random() * window.innerHeight

                gsap.set(light, {
                    x,
                    y,
                    scale: 0.5 + Math.random() * 0.5
                })
            })
        }

        // Start animation
        initLights()
        animateLights()

        // Add event listeners
        container.addEventListener('mousemove', handleMouseMove)

        // Cleanup
        return () => {
            container.removeEventListener('mousemove', handleMouseMove)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            lights.forEach(light => {
                if (light) {
                    gsap.killTweensOf(light)
                }
            })
        }
    }, [isDesktop])

    if (!isDesktop) {
        return null
    }

    // Color schemes for light and dark modes
    const colors = isDark ? {
        primary: 'rgba(59, 130, 246, 0.12)', // Blue
        secondary: 'rgba(147, 51, 234, 0.1)', // Purple
        tertiary: 'rgba(236, 72, 153, 0.08)', // Pink
        ambient: 'rgba(34, 197, 94, 0.06)', // Green
        background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.02) 0%, transparent 70%)'
    } : {
        primary: 'rgba(59, 130, 246, 0.08)', // Blue
        secondary: 'rgba(147, 51, 234, 0.06)', // Purple
        tertiary: 'rgba(236, 72, 153, 0.05)', // Pink
        ambient: 'rgba(34, 197, 94, 0.04)', // Green
        background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.015) 0%, transparent 70%)'
    }

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]"
            style={{
                background: colors.background
            }}
        >
            {/* Primary glow light */}
            <div
                ref={el => lightsRef.current[0] = el}
                className="absolute w-96 h-96 rounded-full opacity-30"
                style={{
                    background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.secondary} 50%, transparent 70%)`,
                    filter: 'blur(40px)',
                    transform: 'translate(-50%, -50%)'
                }}
            />

            {/* Secondary glow light */}
            <div
                ref={el => lightsRef.current[1] = el}
                className="absolute w-80 h-80 rounded-full opacity-25"
                style={{
                    background: `radial-gradient(circle, ${colors.secondary} 0%, ${colors.tertiary} 50%, transparent 70%)`,
                    filter: 'blur(35px)',
                    transform: 'translate(-50%, -50%)'
                }}
            />

            {/* Tertiary glow light */}
            <div
                ref={el => lightsRef.current[2] = el}
                className="absolute w-72 h-72 rounded-full opacity-20"
                style={{
                    background: `radial-gradient(circle, ${colors.tertiary} 0%, ${colors.primary} 50%, transparent 70%)`,
                    filter: 'blur(30px)',
                    transform: 'translate(-50%, -50%)'
                }}
            />

            {/* Subtle ambient glow */}
            <div
                ref={el => lightsRef.current[3] = el}
                className="absolute w-64 h-64 rounded-full opacity-15"
                style={{
                    background: `radial-gradient(circle, ${colors.ambient} 0%, ${colors.primary} 50%, transparent 70%)`,
                    filter: 'blur(25px)',
                    transform: 'translate(-50%, -50%)'
                }}
            />

            {/* Additional floating particles effect */}
            <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full opacity-20"
                        style={{
                            background: isDark
                                ? `rgba(${59 + i * 20}, ${130 + i * 15}, ${246 - i * 10}, 0.25)`
                                : `rgba(${59 + i * 20}, ${130 + i * 15}, ${246 - i * 10}, 0.15)`,
                            filter: 'blur(1px)',
                            animation: `float ${8 + i * 2}s ease-in-out infinite`,
                            animationDelay: `${i * 0.5}s`,
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`
                        }}
                    />
                ))}
            </div>

            <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: ${isDark ? '0.25' : '0.15'};
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: ${isDark ? '0.4' : '0.25'};
          }
        }
      `}</style>
        </div>
    )
}

export default BackgroundAnimation 