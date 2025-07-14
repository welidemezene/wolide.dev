import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Skills = () => {
    const sectionRef = useRef(null)
    const skillsRef = useRef(null)

    const skills = [
        { name: 'React', percentage: 90, color: 'from-blue-500 to-cyan-500' },
        { name: 'JavaScript', percentage: 95, color: 'from-yellow-500 to-orange-500' },
        { name: 'Node.js', percentage: 85, color: 'from-green-500 to-emerald-500' },
        { name: 'TypeScript', percentage: 80, color: 'from-blue-600 to-blue-700' },
        { name: 'Python', percentage: 75, color: 'from-blue-400 to-blue-600' },
        { name: 'MongoDB', percentage: 85, color: 'from-green-400 to-green-600' },
        { name: 'PostgreSQL', percentage: 80, color: 'from-blue-500 to-indigo-600' },
        { name: 'AWS', percentage: 70, color: 'from-orange-500 to-yellow-500' },
        { name: 'Docker', percentage: 75, color: 'from-blue-500 to-cyan-400' },
        { name: 'Git', percentage: 90, color: 'from-orange-600 to-red-500' },
        { name: 'Tailwind CSS', percentage: 95, color: 'from-cyan-400 to-blue-500' },
        { name: 'Next.js', percentage: 85, color: 'from-gray-700 to-black' }
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate skills section
                        gsap.fromTo(skillsRef.current,
                            { opacity: 0, y: 50 },
                            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
                        )

                        // Animate progress bars
                        const progressBars = skillsRef.current.querySelectorAll('.progress-bar')
                        gsap.fromTo(progressBars,
                            { width: 0 },
                            {
                                width: (i) => `${skills[i].percentage}%`,
                                duration: 1.5,
                                ease: "power2.out",
                                delay: 0.5
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
        <section id="skills" ref={sectionRef} className="py-20 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={skillsRef} className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        My <span className="text-blue-500">Skills</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded mx-auto mb-8"></div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        I've worked with a variety of technologies to create amazing web applications.
                        Here are some of the skills I've developed over the years.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Technical Skills */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-white mb-6">Technical Skills</h3>
                        {skills.slice(0, 6).map((skill, index) => (
                            <div key={skill.name} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300 font-medium">{skill.name}</span>
                                    <span className="text-blue-500 font-semibold">{skill.percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`progress-bar h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                                        style={{ width: '0%' }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Skills */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-white mb-6">Additional Skills</h3>
                        {skills.slice(6).map((skill, index) => (
                            <div key={skill.name} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300 font-medium">{skill.name}</span>
                                    <span className="text-blue-500 font-semibold">{skill.percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`progress-bar h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                                        style={{ width: '0%' }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="mt-16">
                    <h3 className="text-2xl font-semibold text-white text-center mb-8">Tools & Technologies</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            'React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL',
                            'AWS', 'Docker', 'Git', 'Tailwind', 'Next.js', 'GraphQL'
                        ].map((tool) => (
                            <div
                                key={tool}
                                className="bg-gray-800/50 p-4 rounded-lg text-center hover:bg-gray-700/50 transition-colors duration-300 group"
                            >
                                <div className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300 font-medium">
                                    {tool}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills 