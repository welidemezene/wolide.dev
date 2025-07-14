import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const navbarRef = useRef(null)
  const navItemsRef = useRef(null)

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      name: 'Blog',
      path: '/blog',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      name: 'Resume',
      path: '/resume',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      name: 'Contact',
      path: '/contact',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Handle scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

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
    const animationDuration = isMobile ? 0.4 : 0.6
    const animationEase = isMobile ? "power2.out" : "power2.out"
    const staggerDelay = isMobile ? 0.05 : 0.1

    // Animate navbar elements when they enter viewport
    const navItems = navItemsRef.current?.querySelectorAll('.nav-item')

    if (navItems) {
      gsap.fromTo(navItems,
        {
          opacity: 0,
          y: -20,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
          stagger: staggerDelay,
          scrollTrigger: {
            trigger: navbarRef.current,
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

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <nav
        ref={navbarRef}
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${isScrolled
          ? 'w-4/5 max-w-screen-xl mt-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg'
          : 'w-4/5 max-w-screen-xl mt-6 bg-transparent'
          }`}
      >
        <div className="px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl sm:text-2xl font-bold transition-colors duration-300 touch-feedback">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  wolde
                </span>
                <span className="text-gray-700 dark:text-gray-300">.dev</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div ref={navItemsRef} className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-item flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 touch-feedback ${isActive(item.path)
                    ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                    }`}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="nav-item p-2 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 touch-feedback"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Upwork Badge */}
              <a
                href="https://www.upwork.com/freelancers/~013cb970d785aad5d1"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item hidden sm:inline-flex items-center space-x-2 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 touch-feedback"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="hidden lg:inline">Available on Upwork</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2 sm:space-x-4">
              {/* Theme Toggle for Mobile */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300 touch-feedback"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button
                onClick={handleMobileMenuToggle}
                className="mobile-menu-button text-gray-700 dark:text-gray-300 hover:text-blue-500 focus:outline-none focus:text-blue-500 p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-300 touch-feedback"
                aria-label="Toggle mobile menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 animate-fade-in-up">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <div className="px-4 py-3 space-y-2">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 touch-feedback hover:scale-105 ${isActive(item.path)
                        ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}

                  {/* Upwork Badge for Mobile */}
                  <a
                    href="https://www.upwork.com/freelancers/~013cb970d785aad5d1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 mt-4 bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all duration-300 touch-feedback hover:scale-105"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Available on Upwork</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleMobileMenuToggle}
        />
      )}
    </>
  )
}

export default Navbar
