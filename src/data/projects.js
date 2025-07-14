import flightBookingImage from '../assets/images/flight_booking.png'
import chocolateImage from '../assets/images/choclate.png'
import portfolioImage from '../assets/images/wolde.png'
import earthImage from '../assets/images/Earth.png'
import snakeGameImage from '../assets/images/Snake-Game.png'
import roomImage from '../assets/images/og-image.webp'
import iphoneImage from '../assets/images/iphone-17-pro.png'
import crownyImage from '../assets/images/crowny-hotel.png'

export const projects = [
    {
        id: 'flight-booking',
        title: '🛫 Flight Booking Website',
        description: 'A modern, responsive flight booking website that allows users to search, view, and book flights. The design is sleek, user-friendly, and optimized for both desktop and mobile experiences.',
        longDescription: `A comprehensive flight booking platform built with modern web technologies. This project demonstrates the creation of a user-friendly interface for flight search and booking, featuring intuitive forms, smooth animations, and responsive design.

The application includes a sophisticated search interface that allows users to input departure and arrival locations, select dates, choose travel classes, and specify passenger counts. The booking flow is streamlined with clear visual feedback and smooth transitions powered by GSAP animations.

Key features include:
- Intuitive flight search form with autocomplete
- Date and time selection with calendar interface
- Passenger and travel class filters
- Smooth scroll animations using GSAP
- Fully responsive design for all devices
- Clear, accessible navigation and user flow
- Modern, clean UI with excellent UX`,
        image: flightBookingImage,
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Google Fonts', 'Remix Icon'],
        category: 'web',
        liveUrl: 'https://flight-booking-three-livid.vercel.app',
        githubUrl: 'https://github.com/welidemezene/Flight_booking/tree/main',
        featured: true,
        challenges: [
            'Creating an intuitive and user-friendly search interface',
            'Implementing smooth animations without affecting performance',
            'Ensuring responsive design across all device sizes',
            'Building accessible navigation and form interactions'
        ],
        solutions: [
            'Designed a clean, logical form flow with clear visual hierarchy',
            'Used GSAP for optimized animations and smooth transitions',
            'Implemented mobile-first responsive design with CSS Grid and Flexbox',
            'Added proper ARIA labels and keyboard navigation support'
        ]
    },
    {
        id: 'chocolate-can',
        title: '🍫 Naturalist - Premium Chocolate Experience',
        description: 'A visually stunning website for Naturalist chocolates featuring immersive GSAP animations and responsive design.',
        longDescription: `A premium chocolate brand website that showcases the art of chocolate making through elegant design and smooth animations. This project demonstrates how to create an immersive brand experience using modern web technologies and sophisticated animations.

The website features a sophisticated design that reflects the premium nature of the chocolate brand, with smooth scroll-triggered animations, elegant typography, and interactive product showcases. The user experience is carefully crafted to evoke the luxury and craftsmanship associated with premium chocolate.

Key features include:
- Smooth scroll-triggered animations using GSAP
- Fully responsive layout for all devices
- Elegant typography with EB Garamond font
- Interactive product showcases
- Optimized for performance and smooth transitions
- Premium visual design reflecting brand quality`,
        image: chocolateImage,
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'GSAP ScrollTrigger', 'Remix Icon', 'Google Fonts'],
        category: 'web',
        liveUrl: 'https://choclate-can-topaz.vercel.app/',
        githubUrl: 'https://github.com/welidemezene/choclate_can',
        featured: true,
        challenges: [
            'Creating smooth scroll-triggered animations without performance issues',
            'Implementing responsive design across all device sizes',
            'Designing elegant typography and visual hierarchy',
            'Optimizing animations for smooth 60fps performance'
        ],
        solutions: [
            'Used GSAP ScrollTrigger for optimized scroll animations',
            'Implemented mobile-first responsive design with CSS Grid and Flexbox',
            'Selected EB Garamond font for elegant typography and proper font loading',
            'Optimized animations with CSS transforms and GPU acceleration'
        ]
    },
    {
        id: 'portfolio',
        title: '💼 Modern Portfolio Website',
        description: 'A modern, responsive portfolio website built with React, GSAP, and Tailwind CSS. Features smooth animations, interactive elements, and professional design.',
        longDescription: `A comprehensive portfolio website that showcases my skills in modern web development, design, and user experience. Built with React, GSAP, and Tailwind CSS, it demonstrates contemporary web development practices and design principles.

The website features smooth scroll animations, interactive components, responsive design, and a clean, professional user experience. It serves as both a showcase of my work and a demonstration of my technical capabilities in creating modern web applications.

Key features include:
- Smooth scroll animations and transitions using GSAP
- Interactive components and hover effects
- Fully responsive design for all devices
- Modern UI/UX design principles
- Performance-optimized implementation
- Professional typography and layout
- Clean, accessible navigation`,
        image: portfolioImage,
        technologies: ['React', 'GSAP', 'Tailwind CSS', 'JavaScript', 'Vite'],
        category: 'web',
        liveUrl: 'https://wolide.dev',
        githubUrl: '#',
        featured: true,
        challenges: [
            'Creating smooth animations without affecting performance',
            'Implementing responsive design across all devices',
            'Building accessible and user-friendly navigation',
            'Optimizing for fast loading and smooth interactions'
        ],
        solutions: [
            'Used GSAP for optimized animations and scroll effects',
            'Implemented mobile-first responsive design with Tailwind CSS',
            'Created semantic HTML structure with proper ARIA labels',
            'Optimized with code splitting, lazy loading, and image optimization'
        ]
    },
    {
        id: 'earth-3d',
        title: '🌍 Interactive Earth Globe',
        description: 'An immersive 3D Earth globe built with Three.js featuring realistic textures, smooth rotation controls, and atmospheric effects. Explore our planet in stunning detail with interactive zoom and pan capabilities.',
        longDescription: `A breathtaking 3D Earth visualization that brings our planet to life through advanced Three.js techniques. This interactive globe showcases realistic Earth textures, atmospheric scattering effects, and smooth orbital controls that allow users to explore continents, oceans, and geographical features in stunning detail.

The project demonstrates sophisticated 3D web development skills, combining high-resolution Earth textures with atmospheric effects to create a truly immersive experience. Users can rotate the globe freely, zoom in to explore specific regions, and experience smooth animations that make the Earth feel alive and dynamic.

Key features include:
- Realistic Earth textures with high-resolution mapping
- Smooth orbital controls with zoom and pan functionality
- Atmospheric scattering effects for enhanced realism
- Interactive rotation and exploration capabilities
- Optimized rendering for smooth 60fps performance
- Responsive design that works across all devices
- Real-time lighting and shadow effects
- Geographic coordinate system integration`,
        image: earthImage,
        technologies: ['Three.js', 'WebGL', 'JavaScript', 'HTML5', 'CSS3', 'Vite'],
        category: '3d',
        liveUrl: 'https://three-js-earth-iota.vercel.app',
        githubUrl: 'https://github.com/welidemezene/three.js_earth',
        featured: false,
        challenges: [
            'Creating realistic Earth textures and atmospheric effects',
            'Implementing smooth orbital controls with proper constraints',
            'Optimizing large-scale 3D rendering for web browsers',
            'Achieving consistent 60fps performance across devices',
            'Integrating geographic coordinate systems accurately'
        ],
        solutions: [
            'Used high-resolution Earth texture maps with proper UV mapping',
            'Implemented quaternion-based camera controls with smooth interpolation',
            'Applied level-of-detail (LOD) techniques and frustum culling',
            'Optimized with WebGL best practices and efficient rendering loops',
            'Utilized geographic projection systems for accurate Earth representation'
        ]
    },
    {
        id: 'velvet-bar',
        title: '🍸 Velvet Bar',
        description: 'A sophisticated and elegant bar website featuring smooth animations, parallax effects, and modern design. Experience luxury hospitality through immersive web design.',
        longDescription: `A premium bar website that captures the essence of luxury hospitality through sophisticated design and smooth animations. This project showcases advanced web development techniques to create an immersive experience that reflects the upscale atmosphere of a high-end bar.

The website features elegant parallax scrolling effects, smooth GSAP animations, and a modern responsive design that works seamlessly across all devices. The design emphasizes the premium nature of the venue while providing an intuitive user experience that encourages visitors to explore the bar's offerings.

Key features include:
- Smooth parallax scrolling effects with GSAP
- Interactive animations and hover effects
- Fully responsive design for all devices
- Modern typography and elegant layout
- Performance-optimized animations
- Sophisticated color scheme and visual hierarchy
- Seamless navigation and user experience`,
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
        technologies: ['React', 'GSAP', 'Tailwind CSS', 'Vite', 'JavaScript'],
        category: 'web',
        liveUrl: 'https://crowny-github-io-cq11.vercel.app',
        githubUrl: 'https://github.com/welidemezene/velvet-bar',
        featured: false,
        challenges: [
            'Creating smooth parallax effects without performance issues',
            'Implementing complex animations while maintaining responsiveness',
            'Ensuring consistent performance across mobile devices',
            'Designing an elegant interface that reflects luxury branding'
        ],
        solutions: [
            'Used GSAP ScrollTrigger for optimized parallax effects',
            'Implemented animation timelines with proper easing functions',
            'Optimized with CSS transforms and will-change properties',
            'Created a sophisticated design system with consistent visual hierarchy'
        ]
    },
    {
        id: 'brainwave-clone',
        title: '🧠 Brainwave – AI-Powered Portfolio Website',
        description: 'A modern, animated, and fully responsive front-end portfolio website built using React, Tailwind CSS, and GSAP. Inspired by futuristic design and smooth UI/UX interactions.',
        longDescription: `A cutting-edge portfolio website that showcases advanced front-end development skills through futuristic design and smooth user interactions. This project demonstrates the power of modern web technologies in creating immersive digital experiences that captivate visitors and effectively showcase professional work.

The website features a sophisticated dark UI theme with smooth page transitions, scroll animations powered by GSAP, and a fully responsive design that adapts seamlessly across all devices. The hero section includes interactive call-to-action elements that engage users immediately, while the modular React component architecture ensures maintainable and scalable code.

Key features include:
- Smooth page transitions and scroll animations using GSAP
- Fully responsive design optimized for mobile, tablet, and desktop
- Clean and modular React component architecture
- Interactive hero section with engaging call-to-action elements
- Optimized animations and performance for smooth 60fps experience
- Stylish dark UI theme with futuristic design elements
- Mobile-first responsive approach
- Professional portfolio showcase with project highlights`,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        technologies: ['React', 'Tailwind CSS', 'GSAP', 'Vite', 'Framer Motion', 'JavaScript'],
        category: 'web',
        liveUrl: 'https://brainwave-clone-tau.vercel.app',
        githubUrl: 'https://github.com/welidemezene/Brainwave_clone',
        featured: false,
        challenges: [
            'Implementing complex scroll animations while maintaining performance',
            'Creating responsive interactive components across all devices',
            'Optimizing GSAP animations for smooth 60fps performance',
            'Designing a futuristic UI that remains professional and accessible',
            'Ensuring consistent user experience across different screen sizes'
        ],
        solutions: [
            'Used GSAP ScrollTrigger for optimized scroll-based animations',
            'Implemented mobile-first responsive design with Tailwind CSS',
            'Optimized animations with CSS transforms and GPU acceleration',
            'Created a sophisticated dark theme with proper contrast and accessibility',
            'Built modular React components for maintainable and scalable code'
        ]
    },
    {
        id: 'car-dealership',
        title: '🚗 Car Dealership Website',
        description: 'A responsive car dealership website built with HTML, CSS, and JavaScript. Features modern mobile-first design, interactive navigation, vehicle showcase, and spare parts e-commerce section.',
        longDescription: `A comprehensive car dealership website that showcases modern web development practices with a focus on user experience and responsive design. This project demonstrates how to create a professional, feature-rich website for automotive businesses using vanilla web technologies.

The website features a modern, mobile-first design approach with fully responsive layouts that work seamlessly across desktop, tablet, and mobile devices. The interactive navigation menu provides smooth user experience, while the vehicle showcase section displays cars in an attractive card-based layout.

Key features include:
- Modern, mobile-first responsive design
- Interactive navigation menu with smooth transitions
- Vehicle showcase section with card-based layout
- Spare parts e-commerce section with product cards
- Blog/news section for content marketing
- Contact information and business details
- Performance optimized for fast loading
- Clean, professional aesthetic with attention to detail

The website includes multiple responsive breakpoints:
- Desktop (≥992px): Full-featured layout with enhanced interactions
- Tablet (768px-991px): Optimized layout for medium screens
- Mobile (<768px): Mobile-first design with touch-friendly interactions

Components include:
- Fixed position navigation bar
- Full-screen hero section banner
- Vehicle showcase with card-based layout
- About us section with image and text
- Spare parts shop with product cards
- Blog/news section for content
- Multi-column footer layout`,
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Mobile-First'],
        category: 'web',
        liveUrl: 'https://pointcar-github-io.vercel.app',
        githubUrl: 'https://github.com/welidemezene/pointcar.github.io',
        featured: false,
        challenges: [
            'Creating a fully responsive design that works across all device sizes',
            'Implementing interactive navigation menu with smooth transitions',
            'Designing an intuitive vehicle showcase with card-based layout',
            'Building an e-commerce section for spare parts with product cards',
            'Ensuring fast loading and optimal performance across devices'
        ],
        solutions: [
            'Used mobile-first responsive design with CSS Grid and Flexbox',
            'Implemented smooth hover effects and mobile menu toggle functionality',
            'Created an organized card-based layout for vehicle and product showcases',
            'Optimized images and code for lightweight, fast-loading performance',
            'Applied modern UI principles with clean, professional aesthetic'
        ]
    },
    {
        id: 'modern-snake-game',
        title: '🐍 Modern Snake Game',
        description: 'A completely modernized and enhanced version of the classic Snake game with beautiful UI, smooth animations, power-ups, and mobile support!',
        longDescription: `A cutting-edge reimagining of the classic Snake game that showcases modern web development techniques and user experience design. This enhanced version transforms the simple concept into a feature-rich gaming experience with advanced animations, power-ups, and cross-platform compatibility.

The game features a sophisticated architecture built with ES6+ classes, modular design, and event-driven programming. The modern UI includes dark/light theme toggles, animated scoreboards, and beautiful gradient effects that create an immersive gaming experience.

Key features include:
- Modern Game UI & Design with CSS Grid and Flexbox layout
- Dark/Light theme toggle with smooth transitions
- Animated scoreboard showing score, high score, and current level
- Beautiful gradient effects and glowing animations
- Responsive design that works on all screen sizes
- Smooth hover effects and interactive elements

Enhanced Gameplay Logic:
- Smooth 60fps gameplay using requestAnimationFrame
- Pause/Resume functionality with Space bar or button
- Progressive difficulty - speed increases with level
- Smart direction handling - prevents instant reversal
- Wall wrapping - snake can pass through walls
- Collision detection with obstacles and self

Advanced Game Features:
- Power-up system with 3 types: Double Growth, Slow Time, Bonus Points
- Obstacle system - Red blocks appear at higher levels
- Level progression - Every 50 points = new level
- Sound effects for eating, power-ups, and game over
- Visual feedback with animations and effects

Mobile & Touch Support:
- Touch controls with swipe gestures on the game area
- Mobile control buttons - On-screen directional buttons
- Responsive layout optimized for mobile screens
- Touch-friendly UI with large buttons and easy navigation

Visual Enhancements:
- Animated snake with gradient body and glowing head
- Pulsing food with glow effects
- Animated power-ups with unique colors and effects
- Level-up notifications with celebration animations
- Power-up effect displays showing active abilities
- Smooth transitions throughout the interface

Settings & Customization:
- Difficulty selection - Easy, Medium, Hard
- Sound toggle - Enable/disable audio effects
- Player name input - Personalize your game
- Theme switching - Dark and light modes
- Local storage - Saves high scores and preferences

Technical Features:
- Performance Optimizations with smooth 60fps rendering
- Efficient collision detection algorithms
- Optimized canvas rendering with proper clearing
- Memory management for power-ups and obstacles
- ES6+ Class-based structure for clean organization
- Modular design with separate methods for each feature
- Event-driven architecture for responsive controls
- Local storage integration for persistent data

Scoring System:
- Base points: 10 points per food
- Bonus points: 20 points with Bonus Points power-up
- Level progression: Every 50 points = new level
- High score tracking: Saved locally

Game States:
- Menu - Initial screen with start button
- Playing - Active gameplay
- Paused - Game paused, can resume
- Game Over - Game ended, shows final score`,
        image: snakeGameImage,
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas', 'ES6+', 'Local Storage', 'Touch Events'],
        category: 'game',
        liveUrl: 'https://moder-snakegame.vercel.app',
        githubUrl: 'https://github.com/welidemezene/moder-snakegame',
        featured: false,
        challenges: [
            'Creating smooth 60fps gameplay with complex animations and effects',
            'Implementing responsive touch controls for mobile devices',
            'Designing an intuitive power-up system with visual feedback',
            'Building a modular, maintainable codebase with ES6+ classes',
            'Optimizing performance for mobile hardware while maintaining visual quality',
            'Creating seamless theme switching and customization options'
        ],
        solutions: [
            'Used requestAnimationFrame for optimized game loop and smooth 60fps rendering',
            'Implemented touch event handling with swipe gesture detection and on-screen controls',
            'Designed a power-up system with unique visual effects and clear user feedback',
            'Built modular ES6+ class architecture with separate methods for each game feature',
            'Optimized canvas rendering with efficient clearing and memory management techniques',
            'Created theme system with CSS custom properties and local storage persistence'
        ]
    },
    {
        id: 'iphone-17-pro',
        title: '📱 iPhone 17 Pro - Premium Product Showcase',
        description: 'A modern, Apple-inspired website showcasing the iPhone 17 Pro with premium design, smooth animations, and interactive features.',
        longDescription: `A sophisticated product showcase website that demonstrates premium web design and modern development techniques. This project recreates the Apple aesthetic with clean, minimalist design, smooth animations, and interactive elements that showcase the iPhone 17 Pro in an engaging and professional manner.

The website features a dark theme with elegant gradients and glowing effects, creating an immersive experience that reflects Apple's design philosophy. The interactive elements include 3D phone rotation, parallax effects, and smooth GSAP animations that enhance the user experience.

Key features include:
- Apple-inspired aesthetics with clean, minimalist design
- Dark theme with elegant gradients and glowing effects
- Responsive layout optimized for all devices
- Modern typography with Apple-style fonts
- 3D phone rotation with parallax effects
- Smooth GSAP animations throughout the site
- Interactive comparison slider between iPhone 16 Pro and 17 Pro
- Floating light effects that respond to cursor movement
- Hover animations and micro-interactions

Key Sections:
- Hero Section: Fullscreen showcase with video background
- Features: Detailed feature cards with specs and icons
- Performance: A17 Bionic Ultra chip showcase
- Camera: LightRay AI Zoom technology
- Comparison: Side-by-side table with iPhone 16 Pro vs 17 Pro
- CTA: Call-to-action with animated buttons

Technical Implementation:
- React 18 with modern hooks and components
- Tailwind CSS for utility-first styling
- GSAP for smooth animations and scroll effects
- Three.js for 3D elements and interactions
- Responsive design with mobile-first approach
- Performance-optimized animations and effects

The project showcases advanced front-end development skills including:
- Complex animation systems with GSAP
- Responsive design principles
- Modern React patterns and hooks
- Performance optimization techniques
- Interactive 3D elements and effects`,
        image: iphoneImage,
        technologies: ['React 18', 'Tailwind CSS', 'GSAP', 'Three.js', 'Vite', 'JavaScript'],
        category: 'web',
        liveUrl: 'https://i-phone-pro-17.vercel.app',
        githubUrl: 'https://github.com/welidemezene/iPhone-pro-17',
        featured: false,
        challenges: [
            'Creating Apple-inspired premium design with authentic aesthetics',
            'Implementing complex 3D phone rotation and parallax effects',
            'Building smooth GSAP animations that enhance user experience',
            'Designing responsive layout that works across all device sizes',
            'Optimizing performance for smooth animations and interactions',
            'Creating interactive comparison slider with accurate data'
        ],
        solutions: [
            'Studied Apple\'s design system and implemented clean, minimalist aesthetics',
            'Used Three.js for 3D elements and GSAP for smooth parallax animations',
            'Implemented GSAP timeline animations with proper easing and performance optimization',
            'Created mobile-first responsive design with Tailwind CSS breakpoints',
            'Optimized animations with CSS transforms and efficient rendering techniques',
            'Built modular React components with reusable animation systems'
        ]
    },
    {
        id: 'crowny-hotel',
        title: '🏨 Crowny - Hotel Booking Website',
        description: 'A fully responsive hotel website built to showcase a premium booking experience for guests. Features modern web design, smooth animations, and clean UI.',
        longDescription: `A comprehensive hotel booking website that demonstrates modern web development practices and user experience design. Crowny is built to showcase a premium booking experience for guests, highlighting modern web design, smooth animations, and a clean, intuitive user interface.

The website features a sophisticated design that reflects the premium nature of hotel services, with smooth scrolling animations, interactive elements, and a fully responsive layout that works seamlessly across all devices. The booking system is designed to provide an intuitive and efficient user experience.

Key features include:
- Responsive design for desktop, tablet, and mobile devices
- Hero section with compelling call-to-action elements
- Room listings with detailed information and pricing
- Interactive booking form functionality
- Customer testimonials and reviews section
- About Us and Contact information sections
- Smooth scrolling and interactive animations
- Modern, clean UI with professional aesthetics

Technical Implementation:
- HTML5 for semantic structure and accessibility
- CSS3 with modern styling techniques and responsive design
- Vanilla JavaScript for interactive functionality
- GSAP/AOS/ScrollReveal for smooth animations
- Vite/Parcel/Live Server for development environment
- Performance-optimized code and assets

The project showcases:
- Modern web development best practices
- Responsive design principles
- Interactive user interface design
- Booking system functionality
- Customer experience optimization
- Cross-browser compatibility
- Performance optimization techniques

This hotel booking website serves as both a functional booking platform and a demonstration of professional web development skills, providing visitors with an engaging and efficient way to explore and book hotel accommodations.`,
        image: crownyImage,
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Responsive Design', 'Booking System'],
        category: 'web',
        liveUrl: 'https://crowny-github-io.vercel.app',
        githubUrl: 'https://github.com/welidemezene/crowny.github.io',
        featured: false,
        challenges: [
            'Creating a responsive design that works across all device sizes',
            'Implementing smooth animations and interactive elements',
            'Building an intuitive booking form with proper validation',
            'Designing a premium hotel aesthetic that reflects quality service',
            'Optimizing performance for fast loading and smooth interactions',
            'Ensuring cross-browser compatibility and accessibility'
        ],
        solutions: [
            'Used mobile-first responsive design with CSS Grid and Flexbox',
            'Implemented GSAP and scroll-triggered animations for smooth interactions',
            'Built form validation and user feedback systems with vanilla JavaScript',
            'Created a sophisticated design system with premium color schemes and typography',
            'Optimized images and code for fast loading and smooth performance',
            'Applied semantic HTML structure and ARIA labels for accessibility'
        ]
    },
    {
        id: '3d-room',
        title: '🏠 Interactive 3D Room Portfolio',
        description: 'An immersive 3D room portfolio built with Three.js featuring interactive objects, smooth animations, and realistic lighting. Explore a virtual room with hover effects and dynamic interactions.',
        longDescription: `A sophisticated 3D interactive portfolio room that showcases advanced Three.js development and user experience design. This project demonstrates how to create an immersive digital environment where users can explore a virtual room with interactive elements, smooth animations, and realistic lighting effects.

The room features a carefully designed interior with various interactive objects that respond to user hover and click interactions. Each object has custom animations and effects that create an engaging and dynamic user experience. The project showcases advanced techniques in 3D web development including raycasting, custom materials, and optimized rendering.

Key features include:
- Interactive 3D room environment with realistic lighting
- Hover effects and animations on room objects
- Smooth camera controls and navigation
- Custom materials and textures for realistic appearance
- Raycasting system for object interaction
- Optimized rendering for smooth performance
- Responsive design that works across devices
- Dynamic lighting and shadow systems

Technical Implementation:
- Advanced raycasting system for object interaction
- Custom hitbox generation for complex interactions
- Smooth animation system with GSAP integration
- Optimized mesh handling and rendering
- Realistic material and texture mapping
- Performance-optimized 3D scene management

Interactive Elements:
- Hover animations on room objects
- Click interactions with visual feedback
- Smooth camera movement and controls
- Dynamic lighting effects
- Responsive object animations

The project addresses complex technical challenges including:
- Raycasting precision and hitbox management
- Animation state management and performance
- Material and texture optimization
- Camera control and user experience
- Cross-browser compatibility and performance

This portfolio room serves as both a showcase of technical skills and a creative demonstration of 3D web development capabilities, providing visitors with an engaging and memorable experience.`,
        image: roomImage,
        technologies: ['Three.js', 'WebGL', 'JavaScript', 'GSAP', 'Raycasting', 'Custom Materials'],
        category: '3d',
        liveUrl: 'https://3-d-room1.vercel.app',
        githubUrl: 'https://github.com/welidemezene/3D-Room1',
        featured: false,
        challenges: [
            'Implementing precise raycasting system for object interaction without vibration issues',
            'Creating smooth hover animations while maintaining performance',
            'Managing complex hitbox generation for different object types',
            'Optimizing 3D rendering for smooth 60fps performance across devices',
            'Handling animation state conflicts and preventing infinite loops',
            'Designing intuitive camera controls and user navigation'
        ],
        solutions: [
            'Implemented dual approach with static hitboxes for some objects and dynamic meshes for others',
            'Used GSAP for smooth animations with proper state management and kill flags',
            'Created hitbox generation system that activates after intro animations complete',
            'Optimized with efficient rendering loops and proper mesh management',
            'Developed sophisticated animation state handling to prevent conflicts',
            'Built responsive camera controls with smooth interpolation and constraints'
        ]
    }
]

export const getProjectById = (id) => {
    return projects.find(project => project.id === id)
}

export const getFeaturedProjects = () => {
    return projects.filter(project => project.featured)
}

export default projects; 