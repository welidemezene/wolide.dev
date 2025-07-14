import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BackButton from '../components/BackButton'
import { blogPosts } from '../data/blogPosts'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Blog = () => {
    const pageRef = useRef(null)
    const headerRef = useRef(null)
    const postsRef = useRef(null)
    const [activeCard, setActiveCard] = useState(null)
    const [email, setEmail] = useState('')
    const [isSubscribing, setIsSubscribing] = useState(false)
    const [subscriptionStatus, setSubscriptionStatus] = useState(null)

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
        const staggerDelay = isMobile ? 0.1 : 0.15

        // Animate page header with better visibility
        gsap.fromTo(headerRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: animationDuration,
                ease: animationEase,
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 90%",
                    end: "bottom 10%",
                    toggleActions: "play none none reverse",
                    markers: false,
                    invalidateOnRefresh: true,
                    fastScrollEnd: isMobile,
                    preventOverlaps: true
                }
            }
        )

        // Ensure header text is always visible with a fallback
        gsap.set(headerRef.current, { opacity: 1, y: 0 })

        // Animate blog posts with stagger
        const postCards = postsRef.current?.querySelectorAll('.post-card')

        if (postCards) {
            gsap.fromTo(postCards,
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: animationDuration,
                    ease: animationEase,
                    stagger: staggerDelay,
                    scrollTrigger: {
                        trigger: postsRef.current,
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

    const scrollToPosts = () => {
        if (postsRef.current) {
            postsRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleCardTouch = (postId) => {
        setActiveCard(activeCard === postId ? null : postId)
    }

    // Enhanced touch handling for mobile
    const handleTouchStart = (postId) => {
        setActiveCard(postId)
    }

    const handleTouchEnd = () => {
        // Keep active state for a moment on mobile for better UX
        setTimeout(() => {
            setActiveCard(null)
        }, 300)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setSubscriptionStatus(null)
    }

    const handleSubscribe = async (e) => {
        e.preventDefault()

        if (!email || !email.includes('@')) {
            setSubscriptionStatus('error')
            return
        }

        setIsSubscribing(true)
        setSubscriptionStatus(null)

        try {
            // Simulate API call for newsletter subscription
            await new Promise(resolve => setTimeout(resolve, 1000))

            setSubscriptionStatus('success')
            setEmail('')

            // Reset success message after 3 seconds
            setTimeout(() => {
                setSubscriptionStatus(null)
            }, 3000)

        } catch (error) {
            setSubscriptionStatus('error')
        } finally {
            setIsSubscribing(false)
        }
    }

    return (
        <div ref={pageRef} className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header Section */}
            <section ref={headerRef} className="blog-header py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Back Button */}
                    <div className="mb-6 sm:mb-8 text-left">
                        <BackButton />
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                        Blog & <span className="text-blue-500">Insights</span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
                        Sharing my knowledge and experiences in 3D web development,
                        interactive design, and modern web technologies.
                    </p>

                    {/* Scroll Down Arrow */}
                    <div className="mt-6 sm:mt-8 lg:mt-12">
                        <button
                            onClick={scrollToPosts}
                            className="group inline-flex flex-col items-center space-y-2 text-gray-400 hover:text-blue-500 transition-colors duration-300 touch-feedback"
                        >
                            <span className="text-sm font-medium">View Articles</span>
                            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center group-hover:scale-110 group-active:scale-105 transition-transform duration-300">
                                <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section ref={postsRef} className="py-8 sm:py-12 lg:py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {blogPosts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {blogPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="post-card group gsap-animation touch-feedback"
                                    onTouchStart={() => handleTouchStart(post.id)}
                                    onTouchEnd={handleTouchEnd}
                                    onMouseEnter={() => setActiveCard(post.id)}
                                    onMouseLeave={() => setActiveCard(null)}
                                >
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 h-full flex flex-col group-active:shadow-xl">
                                        {/* Post Image */}
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-48 object-cover group-hover:scale-110 group-active:scale-105 transition-transform duration-700"
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${activeCard === post.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'}`}></div>

                                            {/* Category Badge */}
                                            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                                                <span className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                                                    {post.category}
                                                </span>
                                            </div>

                                            {/* Enhanced Mobile Touch Indicator */}
                                            <div className="absolute top-3 right-3 sm:hidden">
                                                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeCard === post.id ? 'bg-blue-500 scale-150 shadow-lg' : 'bg-gray-400'}`}></div>
                                            </div>
                                        </div>

                                        {/* Post Content */}
                                        <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                            <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                                                <span>{post.date}</span>
                                                <span>•</span>
                                                <span>{post.readTime}</span>
                                            </div>

                                            <h3 className="blog-post-title text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-500 group-active:text-blue-500 transition-colors duration-300 flex-1">
                                                {post.title}
                                            </h3>

                                            <p className="blog-post-excerpt text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 flex-1">
                                                {post.excerpt}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                                                {post.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Read More Button */}
                                            <Link
                                                to={`/blog/${post.id}`}
                                                className="group/btn inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 group-active:text-blue-600 font-semibold transition-colors duration-300 mt-auto touch-feedback"
                                            >
                                                <span className="text-sm sm:text-base">Read More</span>
                                                <svg className="w-4 h-4 group-hover/btn:translate-x-1 group-active/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 sm:py-12">
                            <div className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-3 sm:mb-4">
                                No blog posts available yet.
                            </div>
                            <p className="text-gray-400 dark:text-gray-500 text-sm sm:text-base">
                                Check back soon for new articles about web development, 3D graphics, and more!
                            </p>
                        </div>
                    )}

                    {/* Newsletter Signup */}
                    <div className="mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 sm:p-6 lg:p-8 text-center text-white">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Stay Updated</h3>
                        <p className="text-blue-100 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                            Get notified when I publish new articles about 3D web development,
                            interactive design, and the latest web technologies.
                        </p>

                        {/* Status Messages */}
                        {subscriptionStatus === 'success' && (
                            <div className="mb-4 p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm">Successfully subscribed! You'll receive updates soon.</span>
                                </div>
                            </div>
                        )}

                        {subscriptionStatus === 'error' && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm">Please enter a valid email address.</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                                disabled={isSubscribing}
                            />
                            <button
                                type="submit"
                                disabled={isSubscribing}
                                className="bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base touch-feedback disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {isSubscribing ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Subscribing...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>Subscribe</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-blue-200 text-xs mt-3 sm:mt-4">
                            No spam, unsubscribe at any time. Your email is safe with us.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Blog 