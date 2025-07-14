import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Projects = () => {
    const sectionRef = useRef(null)
    const projectsRef = useRef(null)

    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            github: '#',
            live: '#',
            featured: true
        },
        {
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            technologies: ['React', 'TypeScript', 'Socket.io', 'PostgreSQL'],
            github: '#',
            live: '#',
            featured: true
        },
        {
            title: 'Weather Dashboard',
            description: 'A beautiful weather dashboard with real-time data, interactive maps, and detailed forecasts for multiple locations.',
            image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
            technologies: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
            github: '#',
            live: '#',
            featured: false
        },
        {
            title: 'Portfolio Website',
            description: 'A modern, responsive portfolio website with smooth animations, dark mode, and contact form integration.',
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
            technologies: ['React', 'GSAP', 'Tailwind CSS', 'EmailJS'],
            github: '#',
            live: '#',
            featured: false
        },
        {
            title: 'Blog Platform',
            description: 'A content management system for blogs with rich text editor, SEO optimization, and analytics dashboard.',
            image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
            technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Vercel'],
            github: '#',
            live: '#',
            featured: false
        },
        {
            title: 'Chat Application',
            description: 'Real-time chat application with user authentication, file sharing, and group chat functionality.',
            image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
            technologies: ['React', 'Socket.io', 'Express', 'MongoDB'],
            github: '#',
            live: '#',
            featured: false
        }
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.fromTo(projectsRef.current,
                            { opacity: 0, y: 50 },
                            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
                        )

                        // Animate project cards
                        const cards = projectsRef.current.querySelectorAll('.project-card')
                        gsap.fromTo(cards,
                            { opacity: 0, y: 30 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.8,
                                ease: "power2.out",
                                stagger: 0.2
                            }
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
        <section id="projects" ref={sectionRef} className="py-20 bg-gray-800/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={projectsRef} className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        My <span className="text-blue-500">Projects</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded mx-auto mb-8"></div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Here are some of the projects I've worked on. Each project represents a unique challenge
                        and showcases different aspects of my development skills.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.title}
                            className={`project-card group bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${project.featured ? 'lg:col-span-2' : ''
                                }`}
                        >
                            {/* Project Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                {project.featured && (
                                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Featured
                                    </div>
                                )}
                            </div>

                            {/* Project Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-500 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 mb-4 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Project Links */}
                                <div className="flex gap-4">
                                    <a
                                        href={project.github}
                                        className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span>Code</span>
                                    </a>
                                    <a
                                        href={project.live}
                                        className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        <span>Live Demo</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center mt-12">
                    <a
                        href="#"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                        <span>View More Projects</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Projects 