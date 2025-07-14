export const blogPosts = [
  {
    id: '1',
    title: 'Creating Immersive 3D Rooms with Three.js',
    excerpt: 'Learn how to build a fully interactive 3D room with realistic lighting, clickable objects, and a functional music player using Three.js and modern web technologies.',
    content: `
      <h2>🧠 Introduction</h2>
      <p>As a frontend and fullstack developer passionate about 3D web, I set out to create something more than just a scene — a fully interactive 3D room, powered by Three.js.</p>
      <p>In this article, I'll walk you through how I built a digital space that includes a functioning laptop, a working music player, realistic lighting, and smooth camera control — all inside the browser.</p>
      <h2>🛠️ Why Build a 3D Room?</h2>
      <p>Websites are no longer static. A 3D environment gives users something deeper — an experience. My goal was to build a room that:</p>
      <ul>
        <li>Feels alive and personal</li>
        <li>Is fully interactive (clickable, animated)</li>
        <li>Showcases my skills in Three.js, animation, UI/UX, and logic</li>
      </ul>
      <h2>🧱 Setting Up the Scene</h2>
      <p>Every Three.js project starts with the basic building blocks:</p>
      <pre><code>const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);</code></pre>
      <p>From there, I started importing models using GLTFLoader, positioning furniture, walls, lighting, and more.</p>
      <h2>💡 Realistic Lighting & Shadows</h2>
      <p>I used a combination of:</p>
      <ul>
        <li>AmbientLight for base illumination</li>
        <li>DirectionalLight to simulate sunlight</li>
        <li>PointLight near lamps or screens</li>
      </ul>
      <p>Shadows were enabled for realism:</p>
      <pre><code>renderer.shadowMap.enabled = true;</code></pre>
      <p>This gave the room a depth and mood, especially when the user rotates around the scene.</p>
      <h2>🎧 Interactive Music Player + Developer Keyboard Setup</h2>
      <p>One of the highlight features of my 3D room is a realistic developer desk setup — complete with a keyboard, laptop, and a functional music player built right into the workspace.</p>
      <h3>🔊 How the Music Player Works:</h3>
      <ul>
        <li>The music player is designed into the keyboard as part of a developer's daily workflow.</li>
        <li>It's not just visual — you can actually click play/pause buttons on the 3D keyboard itself.</li>
        <li>I used Three.js raycasting to detect clicks on the player keys.</li>
        <li>The audio is handled with the Web Audio API, and I added a subtle glow pulse effect using GSAP when music plays.</li>
      </ul>
      <pre><code>const audio = new Audio("assets/lofi-track.mp3");
keyboardPlayKey.addEventListener("click", () => {
  audio.paused ? audio.play() : audio.pause();
});</code></pre>
      <h3>🎧 Bonus UX:</h3>
      <ul>
        <li>The keyboard has animated lighting when music plays (like RGB backlit keys).</li>
        <li>Users can rotate around the desk and see the typing posture, open laptop, and glowing screen — recreating a developer's real-world setup.</li>
      </ul>
      <h2>💻 Clickable Laptop UI</h2>
      <p>The laptop in the room isn't just a model — it responds to user interaction:</p>
      <ul>
        <li>The screen lights up when hovered</li>
        <li>Clicking it opens an overlay or plays a typing animation</li>
        <li>It's positioned to face the camera when focused</li>
      </ul>
      <p>This gives visitors a sense of discovery and play.</p>
      <h2>🔁 Animation & Camera Controls</h2>
      <p>I used:</p>
      <ul>
        <li>OrbitControls for free camera movement</li>
        <li>GSAP to animate object properties (e.g., screen glow, button movement)</li>
        <li>Custom render loop for live updates</li>
      </ul>
      <pre><code>function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();</code></pre>
      <h2>🚀 Performance Optimization</h2>
      <p>To keep the experience smooth, I:</p>
      <ul>
        <li>Compressed 3D assets</li>
        <li>Reduced unnecessary polygons</li>
        <li>Used LOD (Level of Detail) for distant objects</li>
        <li>Lazy-loaded non-visible elements</li>
      </ul>
      <p>This made the room run smoothly on most devices, even with lighting, audio, and animation active.</p>
      <h2>🧠 Lessons Learned</h2>
      <p>Building this 3D room taught me:</p>
      <ul>
        <li>The power of combining design + logic + motion</li>
        <li>How to structure clean Three.js scenes</li>
        <li>How to build interactivity beyond just visuals</li>
      </ul>
      <h2>🎯 Conclusion</h2>
      <p>This project wasn't just about code — it was about creating a digital space that feels alive. If you're learning Three.js, I highly recommend building something personal. A room, a workspace, a memory — it will teach you everything from rendering and animation to performance and user interaction.</p>
      <p>You can view the live project here:</p>
      <p>👉 <a href="https://3-d-room1.vercel.app" target="_blank" rel="noopener noreferrer">Live Demo</a></p>
      <p>👉 <a href="https://github.com/welidemezene/3D-Room1" target="_blank" rel="noopener noreferrer">GitHub Code</a></p>
      <h3>📌 Tech Stack:</h3>
      <ul>
        <li>Three.js</li>
        <li>GSAP</li>
        <li>Web Audio API</li>
        <li>GLTFLoader</li>
        <li>HTML/CSS/JS</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Three.js',
    date: 'March 15, 2024',
    readTime: '8 min read',
    author: 'Woldemedihn Mezene',
    tags: ['Three.js', 'WebGL', '3D UI', 'Interactive Rooms', 'Fullstack Dev']
  },
  {
    id: '2',
    title: 'Building the Velvet Bar: Advanced GSAP & Parallax Scroll Mastery',
    excerpt: 'A deep dive into creating the Velvet Bar website with sophisticated GSAP animations, parallax scroll effects, and luxury UI design.',
    content: `
      <h2>🎭 Introduction: The Velvet Bar Experience</h2>
      <p>When I set out to create the Velvet Bar website, I wanted to build more than just a static site — I wanted to create an immersive digital experience that captures the essence of luxury hospitality. This project became a masterclass in advanced GSAP techniques, parallax scrolling, and sophisticated UI design.</p>
      <h2>🛠️ Project Overview & Goals</h2>
      <p>The Velvet Bar website needed to:</p>
      <ul>
        <li>Convey luxury and sophistication through smooth animations</li>
        <li>Create depth and immersion with parallax scroll effects</li>
        <li>Provide seamless user experience across all devices</li>
        <li>Showcase advanced front-end development skills</li>
      </ul>
      <h2>🎨 Design Philosophy & Technical Approach</h2>
      <p>I chose a dark, elegant theme with golden accents to reflect the premium nature of the venue. The technical stack focused on:</p>
      <ul>
        <li><strong>GSAP</strong> for smooth, performant animations</li>
        <li><strong>ScrollTrigger</strong> for scroll-based interactions</li>
        <li><strong>Parallax effects</strong> for depth and immersion</li>
        <li><strong>Responsive design</strong> for cross-device compatibility</li>
      </ul>
      <h2>🚀 Setting Up the Animation Foundation</h2>
      <p>Every great animation starts with proper setup. Here's how I initialized GSAP and ScrollTrigger:</p>
      <pre><code>import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});</code></pre>
      <h2>🎬 Hero Section: Parallax & Entrance Animations</h2>
      <p>The hero section sets the tone for the entire experience. I implemented multiple layers of parallax effects:</p>
      <h3>Background Parallax Effect</h3>
      <pre><code>gsap.to(".hero-background", {
  yPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  }
});</code></pre>
      <h3>Text Entrance Animation</h3>
      <pre><code>const heroTimeline = gsap.timeline();
heroTimeline
  .from(".hero-title", {
    duration: 1.2,
    y: 100,
    opacity: 0,
    ease: "power3.out"
  })
  .from(".hero-subtitle", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power2.out"
  }, "-=0.6")
  .from(".hero-cta", {
    duration: 0.8,
    scale: 0.8,
    opacity: 0,
    ease: "back.out(1.7)"
  }, "-=0.4");</code></pre>
      <h2>📱 Responsive Parallax Implementation</h2>
      <p>Creating parallax effects that work on mobile required careful optimization:</p>
      <pre><code>const isMobile = window.innerWidth < 768;
const parallaxIntensity = isMobile ? 0.3 : 0.8;
gsap.to(".parallax-element", {
  yPercent: -parallaxIntensity * 100,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-container",
    start: "top bottom",
    end: "bottom top",
    scrub: isMobile ? 2 : 1
  }
});</code></pre>
      <h2>🎯 Scroll-Triggered Section Animations</h2>
      <p>Each section of the website has its own unique animation sequence:</p>
      <h3>About Section Animation</h3>
      <pre><code>gsap.from(".about-content", {
  duration: 1.2,
  y: 80,
  opacity: 0,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  }
});
gsap.to(".about-image", {
  yPercent: -30,
  ease: "none",
  scrollTrigger: {
    trigger: ".about-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  }
});</code></pre>
      <h3>Menu Section with Staggered Cards</h3>
      <pre><code>gsap.from(".menu-card", {
  duration: 0.8,
  y: 60,
  opacity: 0,
  scale: 0.9,
  stagger: 0.15,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".menu-section",
    start: "top 75%",
    end: "bottom 25%",
    toggleActions: "play none none reverse"
  }
});</code></pre>
      <h2>✨ Interactive Hover Effects</h2>
      <p>Adding interactive elements that respond to user input:</p>
      <pre><code>const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item, {
      duration: 0.3,
      scale: 1.05,
      ease: "power2.out"
    });
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(item, {
      duration: 0.3,
      scale: 1,
      ease: "power2.out"
    });
  });
});</code></pre>
      <h2>🎨 Advanced Visual Effects</h2>
      <p>Creating sophisticated visual effects that enhance the luxury feel:</p>
      <h3>Gradient Text Animation</h3>
      <pre><code>gsap.to(".gradient-text", {
  backgroundPosition: "200% center",
  duration: 3,
  ease: "none",
  repeat: -1,
  yoyo: true
});</code></pre>
      <h3>Floating Elements Animation</h3>
      <pre><code>gsap.to(".floating-element", {
  y: -20,
  duration: 2,
  ease: "power1.inOut",
  repeat: -1,
  yoyo: true,
  stagger: 0.5
});</code></pre>
      <h2>📱 Mobile Performance Optimization</h2>
      <p>Ensuring smooth performance on mobile devices required specific optimizations:</p>
      <pre><code>const isMobile = window.innerWidth < 768;
if (isMobile) {
  ScrollTrigger.config({
    fastScrollEnd: true,
    preventOverlaps: true
  });
  gsap.set(".parallax-element", {
    yPercent: 0
  });
}</code></pre>
      <h2>🔧 Performance Best Practices Implemented</h2>
      <p>Key performance optimizations that made the site run smoothly:</p>
      <ul>
        <li><strong>Transform-based animations:</strong> Using transform properties instead of layout-affecting properties</li>
        <li><strong>Will-change CSS:</strong> Hinting to the browser about elements that will animate</li>
        <li><strong>Efficient easing functions:</strong> Using optimized easing curves for better performance</li>
        <li><strong>ScrollTrigger optimization:</strong> Proper configuration for smooth scrolling</li>
      </ul>
      <h2>🎯 Advanced ScrollTrigger Techniques</h2>
      <p>Implementing complex scroll-based interactions:</p>
      <pre><code>ScrollTrigger.create({
  trigger: ".pinned-section",
  start: "top top",
  end: "bottom top",
  pin: true,
  pinSpacing: false,
  onUpdate: (self) => {
    gsap.set(".pinned-content", {
      y: self.progress * -100
    });
  }
});</code></pre>
      <h2>🧠 Lessons Learned & Key Takeaways</h2>
      <p>Building the Velvet Bar taught me several important lessons:</p>
      <ul>
        <li><strong>Performance is crucial:</strong> Even beautiful animations need to run smoothly</li>
        <li><strong>Mobile-first approach:</strong> Design animations with mobile in mind from the start</li>
        <li><strong>Timing is everything:</strong> Proper easing and duration make animations feel natural</li>
        <li><strong>User experience first:</strong> Animations should enhance, not distract from content</li>
      </ul>
      <h2>🎨 Design System & Animation Guidelines</h2>
      <p>Establishing consistent animation patterns:</p>
      <ul>
        <li><strong>Entrance animations:</strong> 0.8-1.2s duration with power2.out easing</li>
        <li><strong>Hover effects:</strong> 0.3s duration with power2.out easing</li>
        <li><strong>Parallax intensity:</strong> 30-50% movement for subtle depth</li>
        <li><strong>Stagger delays:</strong> 0.1-0.2s between elements for natural flow</li>
      </ul>
      <h2>🚀 Conclusion: The Power of GSAP</h2>
      <p>The Velvet Bar project demonstrates how GSAP can transform a static website into an immersive, interactive experience. The combination of parallax scrolling, smooth animations, and responsive design creates a digital space that feels alive and engaging.</p>
      <p>Key achievements:</p>
      <ul>
        <li>✅ Smooth 60fps animations across all devices</li>
        <li>✅ Immersive parallax scroll effects</li>
        <li>✅ Responsive design with mobile optimization</li>
        <li>✅ Professional-grade user experience</li>
      </ul>
      <p>You can experience the Velvet Bar website here:</p>
      <p>👉 <a href="https://crowny-github-io-cq11.vercel.app" target="_blank" rel="noopener noreferrer">Live Demo</a></p>
      <p>👉 <a href="https://github.com/welidemezene/velvet-bar" target="_blank" rel="noopener noreferrer">GitHub Code</a></p>
      <h3>📌 Tech Stack & Tools:</h3>
      <ul>
        <li>GSAP (GreenSock Animation Platform)</li>
        <li>ScrollTrigger Plugin</li>
        <li>React 18 with Hooks</li>
        <li>Tailwind CSS for styling</li>
        <li>Vite for build optimization</li>
        <li>Responsive design principles</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'GSAP',
    date: 'March 10, 2024',
    readTime: '15 min read',
    author: 'Woldemedihn Mezene',
    tags: ['GSAP', 'Parallax Scroll', 'React', 'Animation', 'Luxury UI']
  },
  {
    id: '3',
    title: 'Building My Modern Portfolio: A React Journey with GSAP & Tailwind',
    excerpt: 'Discover how I built this modern portfolio website using React, GSAP animations, Tailwind CSS, and advanced web development techniques.',
    content: `
      <h2>💼 Introduction: The Portfolio Vision</h2>
      <p>When I decided to build my portfolio website, I wanted to create more than just a showcase of my work — I wanted to build an immersive digital experience that reflects my passion for modern web development. This portfolio became a testament to my skills in React, GSAP animations, and responsive design.</p>
      <p>In this comprehensive guide, I'll walk you through the entire development process, from initial concept to deployment, sharing the technical decisions, challenges faced, and lessons learned along the way.</p>
      
      <h2>🎯 Project Goals & Requirements</h2>
      <p>My portfolio needed to achieve several key objectives:</p>
      <ul>
        <li><strong>Showcase Technical Skills:</strong> Demonstrate proficiency in React, GSAP, and modern CSS</li>
        <li><strong>Immersive User Experience:</strong> Create smooth animations and interactions that engage visitors</li>
        <li><strong>Professional Presentation:</strong> Present my work in a clean, modern design</li>
        <li><strong>Mobile-First Approach:</strong> Ensure perfect functionality across all devices</li>
        <li><strong>Performance Optimization:</strong> Fast loading times and smooth animations</li>
      </ul>
      
      <h2>🛠️ Technical Stack & Architecture</h2>
      <p>I chose a modern, performant tech stack that would allow me to create the experience I envisioned:</p>
      <h3>Core Technologies:</h3>
      <ul>
        <li><strong>React 18:</strong> For component-based architecture and modern hooks</li>
        <li><strong>Vite:</strong> For lightning-fast development and optimized builds</li>
        <li><strong>GSAP:</strong> For professional-grade animations and scroll effects</li>
        <li><strong>Tailwind CSS:</strong> For utility-first styling and responsive design</li>
        <li><strong>React Router:</strong> For seamless navigation and routing</li>
      </ul>
      
      <h2>🎨 Design System & UI/UX Approach</h2>
      <p>I established a comprehensive design system to ensure consistency and maintainability:</p>
      <h3>Color Palette:</h3>
      <pre><code>// Primary Colors
--blue-500: #3B82F6
--gray-50: #F9FAFB
--gray-900: #111827

// Dark Mode Colors
--dark-bg: #111827
--dark-card: #1F2937
--dark-text: #F9FAFB</code></pre>
      
      <h3>Typography Scale:</h3>
      <pre><code>// Responsive Typography
text-3xl sm:text-4xl md:text-5xl lg:text-6xl  // Headers
text-base sm:text-lg lg:text-xl              // Body text
text-sm sm:text-base                         // Small text</code></pre>
      
      <h2>🚀 Setting Up the Development Environment</h2>
      <p>I started with a clean, optimized setup using Vite for maximum performance:</p>
      <pre><code>npm create vite@latest wolide-portfolio -- --template react
cd wolide-portfolio
npm install gsap react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>
      
      <h3>Project Structure:</h3>
      <pre><code>src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── data/               # Static data (projects, blog posts)
├── context/            # React context providers
├── assets/             # Images, icons, etc.
└── utils/              # Utility functions</code></pre>
      
      <h2>🎬 Animation Strategy with GSAP</h2>
      <p>GSAP became the backbone of my animation system, providing smooth, performant animations:</p>
      <h3>Initial Setup:</h3>
      <pre><code>import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Mobile optimization
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});</code></pre>
      
      <h3>Hero Section Animations:</h3>
      <pre><code>const heroTimeline = gsap.timeline();

heroTimeline
  .from(".hero-title", {
    duration: 1.2,
    y: 100,
    opacity: 0,
    ease: "power3.out"
  })
  .from(".hero-subtitle", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power2.out"
  }, "-=0.6")
  .from(".hero-cta", {
    duration: 0.8,
    scale: 0.8,
    opacity: 0,
    ease: "back.out(1.7)"
  }, "-=0.4");</code></pre>
      
      <h2>📱 Responsive Design Implementation</h2>
      <p>Mobile-first design was crucial for providing a great experience across all devices:</p>
      <h3>Breakpoint Strategy:</h3>
      <pre><code>// Tailwind CSS Breakpoints
sm: 640px   // Small tablets
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktop
2xl: 1536px // Large screens</code></pre>
      
      <h3>Mobile-Specific Optimizations:</h3>
      <pre><code>// Touch-friendly interactions
const isMobile = window.innerWidth < 768;
const animationDuration = isMobile ? 0.6 : 0.8;
const staggerDelay = isMobile ? 0.1 : 0.15;

// Reduced animation complexity on mobile
if (isMobile) {
  ScrollTrigger.config({
    fastScrollEnd: true,
    preventOverlaps: true
  });
}</code></pre>
      
      <h2>🎯 Component Architecture</h2>
      <p>I built a modular component system that promotes reusability and maintainability:</p>
      <h3>Project Card Component:</h3>
      <pre><code>const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);
  
  return (
    <div ref={cardRef} className="project-card">
      {/* Card content */}
    </div>
  );
};</code></pre>
      
      <h2>🌙 Dark Mode Implementation</h2>
      <p>I implemented a sophisticated dark mode system using React Context:</p>
      <pre><code>// Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
  }, []);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};</code></pre>
      
      <h2>📊 Performance Optimization</h2>
      <p>Performance was a top priority throughout development:</p>
      <h3>Image Optimization:</h3>
      <ul>
        <li>Used WebP format with fallbacks</li>
        <li>Implemented lazy loading for images</li>
        <li>Optimized image sizes for different screen sizes</li>
      </ul>
      
      <h3>Code Splitting:</h3>
      <pre><code>// Lazy load pages
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));

// Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/projects" element={<Projects />} />
    <Route path="/blog" element={<Blog />} />
  </Routes>
</Suspense></code></pre>
      
      <h3>Animation Performance:</h3>
      <pre><code>// Use transform properties for better performance
gsap.to(".element", {
  x: 100,        // ✅ Good - uses transform
  y: 50,         // ✅ Good - uses transform
  opacity: 0.5   // ✅ Good - doesn't trigger layout
});

// Avoid layout-triggering properties
gsap.to(".element", {
  width: "200px",    // ❌ Avoid - triggers layout
  height: "100px"    // ❌ Avoid - triggers layout
});</code></pre>
      
      <h2>🔧 Advanced Features Implementation</h2>
      <p>I added several advanced features to enhance the user experience:</p>
      <h3>Background Animation:</h3>
      <pre><code>const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Create animated background particles
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
};</code></pre>
      
      <h3>Scroll-Triggered Animations:</h3>
      <pre><code>// Staggered card animations
gsap.fromTo(".project-card",
  { opacity: 0, y: 60, scale: 0.95 },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play none none reverse"
    }
  }
);</code></pre>
      
      <h2>📱 Mobile Experience Optimization</h2>
      <p>Creating a seamless mobile experience required careful attention to detail:</p>
      <h3>Touch Interactions:</h3>
      <pre><code>// Enhanced touch handling
const handleTouchStart = (postId) => {
  setActiveCard(postId);
};

const handleTouchEnd = () => {
  setTimeout(() => {
    setActiveCard(null);
  }, 300);
};

// Touch feedback classes
className="touch-feedback group-active:scale-105"</code></pre>
      
      <h3>Mobile-Specific Animations:</h3>
      <pre><code>// Reduced animation complexity on mobile
const isMobile = window.innerWidth < 768;
const animationDuration = isMobile ? 0.6 : 0.8;
const staggerDelay = isMobile ? 0.1 : 0.15;

// Disable heavy effects on mobile
if (isMobile) {
  gsap.set(".parallax-element", { yPercent: 0 });
}</code></pre>
      
      <h2>🚀 Deployment & Optimization</h2>
      <p>I deployed the portfolio using Vercel for optimal performance:</p>
      <h3>Build Optimization:</h3>
      <pre><code>// Vite configuration
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap']
        }
      }
    }
  }
});</code></pre>
      
      <h3>Performance Metrics:</h3>
      <ul>
        <li><strong>Lighthouse Score:</strong> 95+ across all categories</li>
        <li><strong>First Contentful Paint:</strong> < 1.5s</li>
        <li><strong>Largest Contentful Paint:</strong> < 2.5s</li>
        <li><strong>Cumulative Layout Shift:</strong> < 0.1</li>
      </ul>
      
      <h2>🧠 Key Challenges & Solutions</h2>
      <p>Throughout development, I faced several challenges that taught me valuable lessons:</p>
      <h3>Challenge 1: Mobile Animation Performance</h3>
      <p><strong>Problem:</strong> Complex animations were causing frame drops on mobile devices.</p>
      <p><strong>Solution:</strong> Implemented device detection and reduced animation complexity on mobile, using simpler easing functions and fewer simultaneous animations.</p>
      
      <h3>Challenge 2: Smooth Scroll Animations</h3>
      <p><strong>Problem:</strong> Scroll-triggered animations were stuttering on slower devices.</p>
      <p><strong>Solution:</strong> Used ScrollTrigger's mobile optimizations and implemented proper cleanup to prevent memory leaks.</p>
      
      <h3>Challenge 3: Responsive Typography</h3>
      <p><strong>Problem:</strong> Text scaling wasn't consistent across different screen sizes.</p>
      <p><strong>Solution:</strong> Created a comprehensive typography scale using Tailwind's responsive utilities and custom CSS variables.</p>
      
      <h2>📈 Results & Impact</h2>
      <p>The final portfolio achieved all my initial goals and more:</p>
      <ul>
        <li>✅ <strong>Professional Presentation:</strong> Clean, modern design that showcases my work effectively</li>
        <li>✅ <strong>Smooth Animations:</strong> 60fps animations across all devices</li>
        <li>✅ <strong>Mobile Excellence:</strong> Perfect functionality on all screen sizes</li>
        <li>✅ <strong>Performance:</strong> Fast loading times and optimized user experience</li>
        <li>✅ <strong>Accessibility:</strong> WCAG compliant with proper semantic HTML</li>
      </ul>
      
      <h2>🎯 Lessons Learned</h2>
      <p>Building this portfolio taught me several important lessons:</p>
      <ul>
        <li><strong>Performance First:</strong> Always consider performance implications when adding features</li>
        <li><strong>Mobile-First Design:</strong> Design for mobile first, then enhance for desktop</li>
        <li><strong>Animation Balance:</strong> Animations should enhance, not distract from content</li>
        <li><strong>Code Organization:</strong> Well-structured code makes maintenance much easier</li>
        <li><strong>User Experience:</strong> Always prioritize user experience over technical complexity</li>
      </ul>
      
      <h2>🚀 Future Enhancements</h2>
      <p>I'm already planning several enhancements for future iterations:</p>
      <ul>
        <li><strong>3D Elements:</strong> Adding Three.js elements for more immersive experiences</li>
        <li><strong>Interactive Projects:</strong> Embedding live project demos directly in the portfolio</li>
        <li><strong>Blog Integration:</strong> Adding a CMS for easier content management</li>
        <li><strong>Analytics:</strong> Implementing user behavior tracking to optimize the experience</li>
      </ul>
      
      <h2>🎯 Conclusion</h2>
      <p>Building this portfolio was an incredible learning experience that pushed my skills in React, GSAP, and modern web development. The combination of smooth animations, responsive design, and performance optimization created a professional showcase that effectively represents my capabilities as a developer.</p>
      <p>Key achievements:</p>
      <ul>
        <li>✅ Modern, responsive design with smooth animations</li>
        <li>✅ Optimized performance across all devices</li>
        <li>✅ Professional user experience with accessibility compliance</li>
        <li>✅ Scalable architecture for future enhancements</li>
      </ul>
      <p>You can explore the live portfolio here:</p>
      <p>👉 <a href="https://wolide.dev" target="_blank" rel="noopener noreferrer">Live Portfolio</a></p>
      <p>👉 <a href="https://github.com/welidemezene/portfolio" target="_blank" rel="noopener noreferrer">GitHub Repository</a></p>
      
      <h3>📌 Tech Stack Summary:</h3>
      <ul>
        <li><strong>Frontend:</strong> React 18, Vite, Tailwind CSS</li>
        <li><strong>Animations:</strong> GSAP, ScrollTrigger</li>
        <li><strong>Routing:</strong> React Router v6</li>
        <li><strong>Deployment:</strong> Vercel</li>
        <li><strong>Performance:</strong> Lighthouse optimization, code splitting</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'React',
    date: 'March 5, 2024',
    readTime: '18 min read',
    author: 'Woldemedihn Mezene',
    tags: ['React', 'GSAP', 'Tailwind CSS', 'Portfolio', 'Modern Web']
  },
  {
    id: '4',
    title: 'Optimizing Web Performance for 3D Applications',
    excerpt: 'A deep dive into optimizing performance for complex 3D web apps, using advanced Three.js and WebGL techniques.',
    content: `
      <h2>🚀 Introduction: Why Performance Matters in 3D Web</h2>
      <p>Building interactive 3D applications is one of the most rewarding challenges in web development. But with great visuals comes great responsibility: performance. In this blog, I’ll share my experience optimizing a real-world 3D Earth visualization project for smooth, cross-device performance.</p>
      <h2>🛠️ Project Overview</h2>
      <p>The project: an interactive 3D globe built with Three.js, featuring high-res textures, atmospheric effects, and smooth camera controls. My goal was to make it run at 60fps on both desktop and mobile, without sacrificing visual quality.</p>
      <h2>🔍 Key Optimization Strategies</h2>
      <ul>
        <li><strong>Level of Detail (LOD):</strong> Used lower-res textures and simplified geometry for distant objects.</li>
        <li><strong>Frustum Culling:</strong> Rendered only what’s visible to the camera.</li>
        <li><strong>Efficient Texture Management:</strong> Compressed textures and used mipmaps for faster loading.</li>
        <li><strong>WebGL Profiling:</strong> Used browser dev tools and Spector.js to identify bottlenecks.</li>
        <li><strong>Animation Throttling:</strong> Reduced animation frequency on low-power devices.</li>
      </ul>
      <h2>📱 Mobile Optimization</h2>
      <ul>
        <li>Reduced polygon count for mobile</li>
        <li>Lazy-loaded heavy assets</li>
        <li>Used requestAnimationFrame for smooth rendering</li>
      </ul>
      <h2>🧠 Lessons Learned</h2>
      <ul>
        <li>Always profile before optimizing</li>
        <li>Balance visual fidelity with performance</li>
        <li>Test on real devices, not just emulators</li>
      </ul>
      <h2>🎯 Conclusion</h2>
      <p>Performance is a journey, not a destination. With the right tools and mindset, you can deliver stunning 3D experiences that run smoothly everywhere.</p>
      <h3>📌 Tech Stack:</h3>
      <ul>
        <li>Three.js</li>
        <li>WebGL</li>
        <li>JavaScript</li>
        <li>GSAP</li>
        <li>Vite</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1000&q=80',
    category: 'Performance',
    date: 'April 2, 2024',
    readTime: '12 min read',
    author: 'Woldemedihn Mezene',
    tags: ['Performance', 'Three.js', 'WebGL', 'Optimization', '3D']
  },
  {
    id: '5',
    title: 'Designing a Premium Hotel Booking Experience',
    excerpt: 'How I built a modern, responsive hotel booking website with smooth animations, great UX, and a scalable architecture.',
    content: `
      <h2>🏨 Introduction: The Crowny Hotel Project</h2>
      <p>For this project, I set out to design and build a premium hotel booking website that feels as luxurious as the hotels it represents. The challenge: combine beautiful design, seamless booking flow, and modern web tech.</p>
      <h2>🎨 Design & UX</h2>
      <ul>
        <li>Hero section with call-to-action and background animation</li>
        <li>Room listings with interactive cards and details</li>
        <li>Booking form with validation and smooth transitions</li>
        <li>Testimonials and reviews for social proof</li>
        <li>Mobile-first, fully responsive layout</li>
      </ul>
      <h2>🛠️ Technical Stack</h2>
      <ul>
        <li>HTML5, CSS3, Tailwind CSS for styling</li>
        <li>JavaScript for interactivity</li>
        <li>GSAP for scroll and entrance animations</li>
        <li>Vite for fast builds and hot reload</li>
      </ul>
      <h2>🔧 Key Features</h2>
      <ul>
        <li>Animated navigation and section reveals</li>
        <li>Accessible forms and keyboard navigation</li>
        <li>Optimized images and lazy loading</li>
        <li>SEO-friendly semantic HTML</li>
      </ul>
      <h2>🧠 Lessons Learned</h2>
      <ul>
        <li>Design for mobile first, then enhance for desktop</li>
        <li>Animations should support, not distract from, the booking flow</li>
        <li>Accessibility and performance are as important as visuals</li>
      </ul>
      <h2>🎯 Conclusion</h2>
      <p>This project taught me how to balance aesthetics, usability, and technical excellence in a real-world product.</p>
      <h3>📌 Tech Stack:</h3>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>Tailwind CSS</li>
        <li>JavaScript</li>
        <li>GSAP</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    category: 'Web Design',
    date: 'April 10, 2024',
    readTime: '10 min read',
    author: 'Woldemedihn Mezene',
    tags: ['Web Design', 'Booking', 'Tailwind CSS', 'GSAP', 'UX']
  },
  {
    id: '6',
    title: 'The Future of Web Development: Trends & Insights',
    excerpt: 'A look at the most exciting trends shaping the future of web development, from AI to 3D and beyond.',
    content: `
      <h2>🌐 Introduction: Why Trends Matter</h2>
      <p>Web development is evolving faster than ever. In this blog, I’ll share my perspective on the most important trends and how I’m preparing for the future as a developer.</p>
      <h2>🤖 AI & Automation</h2>
      <ul>
        <li>AI-powered coding assistants and design tools</li>
        <li>Automated testing and deployment pipelines</li>
        <li>Personalized user experiences with machine learning</li>
      </ul>
      <h2>🕹️ 3D & Immersive Experiences</h2>
      <ul>
        <li>WebGL and Three.js for interactive 3D</li>
        <li>WebXR for AR/VR in the browser</li>
        <li>Real-time collaboration in 3D spaces</li>
      </ul>
      <h2>📱 Progressive Web Apps & Performance</h2>
      <ul>
        <li>PWAs for offline and installable web apps</li>
        <li>WebAssembly for high-performance code</li>
        <li>Micro-frontends for scalable architectures</li>
      </ul>
      <h2>🧠 Lessons & Outlook</h2>
      <ul>
        <li>Stay curious and keep learning</li>
        <li>Experiment with new tech, but master the fundamentals</li>
        <li>Build for users, not just for tech’s sake</li>
      </ul>
      <h2>🎯 Conclusion</h2>
      <p>The future is bright for web developers who embrace change and keep pushing boundaries. I’m excited to be part of this journey!</p>
      <h3>📌 Tech Stack:</h3>
      <ul>
        <li>AI Tools</li>
        <li>Three.js</li>
        <li>WebAssembly</li>
        <li>PWA</li>
        <li>React</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80',
    category: 'Trends',
    date: 'April 18, 2024',
    readTime: '9 min read',
    author: 'Woldemedihn Mezene',
    tags: ['Trends', 'AI', '3D', 'WebAssembly', 'PWA']
  }
];

export const getBlogPostById = (id) => {
  return blogPosts.find(post => post.id === id);
};

export const getFeaturedBlogPosts = () => {
  return blogPosts.slice(0, 3); // Return first 3 posts as featured
}; 