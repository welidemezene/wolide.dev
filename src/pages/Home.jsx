import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import FeaturedProjects from '../components/FeaturedProjects'

const Home = () => {
    const pageRef = useRef(null)

    useEffect(() => {
        // Page entrance animation
        gsap.fromTo(pageRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power2.out" }
        )
    }, [])

    return (
        <div ref={pageRef} className="min-h-screen">
            <Hero />
            <About />
            <Skills />
            <FeaturedProjects />
        </div>
    )
}

export default Home 