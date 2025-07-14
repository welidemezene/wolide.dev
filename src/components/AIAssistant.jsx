import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaComments, FaTimes } from 'react-icons/fa';
import portfolioData from '../data/portfolioData';

const MOST_ASKED = [
    { label: "Show me your projects", value: "Show me your projects" },
    { label: "Show me your blog posts", value: "Show me your blog posts" },
    { label: "Contact info", value: "Contact info" },
    { label: "Show me your resume", value: "Show me your resume" },
    { label: "About you", value: "About you" },
    { label: "Contact", value: "Contact" },
];

// Helper to get main/featured project (first in array, or add a "featured" flag in your data)
const getMainProject = () => {
    if (portfolioData.projects && portfolioData.projects.length > 0) {
        return portfolioData.projects[0]; // or filter for featured
    }
    return null;
};

const getAIResponse = (question) => {
    const q = question.toLowerCase();

    // Projects: include main project link
    if (q.includes('project')) {
        const mainProject = getMainProject();
        let mainProjectLine = '';
        if (mainProject) {
            mainProjectLine = `\n\n🌟 Main Project: ${mainProject.title}\n${mainProject.description || ''}\n${mainProject.link ? `Link: ${mainProject.link}` : ''}\n`;
        }
        return (
            "Here are some of my projects:\n" +
            portfolioData.projects
                .map((p) => `• ${p.title}: ${p.description || ''}`)
                .join('\n') +
            mainProjectLine
        );
    }

    // Blog posts
    if (q.includes('blog')) {
        return (
            "Check out my blog posts:\n" +
            portfolioData.blogPosts
                .map((b) => `• ${b.title}`)
                .join('\n')
        );
    }

    // About: include about, phone, email, socials
    if (q.includes('about') || q.includes('yourself') || q.includes('bio') || q === "about you") {
        const about = portfolioData.about;
        const contact = portfolioData.contact;
        const socials = portfolioData.socials;
        return (
            `${about.name}: ${about.bio}\n\n` +
            `📧 Email: ${contact.email}\n` +
            `📱 Phone: ${contact.phone}\n` +
            `🌍 Location: ${contact.location}\n` +
            `🔗 Socials:\n` +
            socials.map((s) => `• ${s.name}: ${s.url}`).join('\n')
        );
    }

    // Contact info (separate button)
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q === "contact") {
        const contact = portfolioData.contact;
        const socials = portfolioData.socials;
        return (
            `You can contact me at:\n` +
            `Email: ${contact.email}\n` +
            `Phone: ${contact.phone}\n` +
            `Location: ${contact.location}\n` +
            `Socials:\n` +
            socials.map((s) => `• ${s.name}: ${s.url}`).join('\n')
        );
    }

    // Resume
    if (q.includes('resume') || q.includes('cv')) {
        return `You can view or download my resume here: ${portfolioData.resume}`;
    }

    // Socials
    if (
        q.includes('social') ||
        q.includes('github') ||
        q.includes('linkedin') ||
        q.includes('twitter')
    ) {
        return (
            'Here are my social media links:\n' +
            portfolioData.socials.map((s) => `• ${s.name}: ${s.url}`).join('\n')
        );
    }

    return "Sorry, I couldn't find an answer. Please ask about my projects, blogs, about, contact, resume, or social links!";
};

const AIAssistant = () => {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState([
        {
            from: 'ai',
            text: "Hello! I'm your AI Assistant. Ask me anything about my projects, blogs, resume, contact info, or social media!",
        },
    ]);
    const [open, setOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [pendingText, setPendingText] = useState('');
    const chatEndRef = useRef(null);
    const modalRef = useRef(null);

    // Scroll to bottom on new message
    useEffect(() => {
        if (open) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat, open, isTyping]);

    // Click outside to close
    useEffect(() => {
        if (!open) return;
        const handleClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    // Typing animation for AI
    useEffect(() => {
        if (!pendingText) return;
        setIsTyping(true);
        let i = 0;
        const interval = setInterval(() => {
            setChat((prev) => {
                const last = prev[prev.length - 1];
                if (last.from === 'ai') {
                    // Update last AI message
                    return [
                        ...prev.slice(0, -1),
                        { ...last, text: pendingText.slice(0, i + 1) },
                    ];
                } else {
                    // Add new AI message
                    return [...prev, { from: 'ai', text: pendingText.slice(0, i + 1) }];
                }
            });
            i++;
            if (i >= pendingText.length) {
                clearInterval(interval);
                setIsTyping(false);
                setPendingText('');
            }
        }, 18); // ~55 chars/sec
        return () => clearInterval(interval);
    }, [pendingText]);

    const handleSend = () => {
        if (!input.trim() || isTyping) return;
        const userMessage = { from: 'user', text: input };
        setChat((prev) => [...prev, userMessage, { from: 'ai', text: '' }]);
        setInput('');
        const response = getAIResponse(input);
        setPendingText(response);
    };

    const handleQuickAsk = (value) => {
        if (isTyping) return;
        setChat((prev) => [...prev, { from: 'user', text: value }, { from: 'ai', text: '' }]);
        setInput('');
        const response = getAIResponse(value);
        setPendingText(response);
    };

    // Floating button to open chat
    if (!open) {
        return (
            <button
                className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-200"
                onClick={() => setOpen(true)}
                aria-label="Open AI Assistant"
            >
                <FaComments size={24} />
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setOpen(false)}
                aria-label="Close AI Assistant"
            />
            {/* Modal */}
            <div
                ref={modalRef}
                className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full mx-2 sm:mx-0 p-0 flex flex-col animate-fadeInUp"
                style={{ minHeight: 420, maxHeight: '90vh' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl">
                    <div className="flex items-center gap-2 text-white font-semibold text-lg">
                        <FaComments className="mr-1" /> AI Assistant
                    </div>
                    <button
                        className="text-white hover:text-gray-200 transition-colors"
                        onClick={() => setOpen(false)}
                        aria-label="Close"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>
                {/* Most Asked */}
                <div className="flex flex-wrap gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    {MOST_ASKED.map((q) => (
                        <button
                            key={q.value}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                            onClick={() => handleQuickAsk(q.value)}
                            disabled={isTyping}
                        >
                            {q.label}
                        </button>
                    ))}
                </div>
                {/* Chat */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white dark:bg-gray-900">
                    {chat.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.from === 'ai' ? 'justify-start' : 'justify-end'}`}
                        >
                            <div
                                className={`px-4 py-2 rounded-lg max-w-[80%] break-words shadow-sm ${msg.from === 'ai'
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                                    : 'bg-blue-500 text-white'
                                    }`}
                                style={{ whiteSpace: 'pre-line' }}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
                {/* Input */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
                    <input
                        className="flex-1 px-3 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={isTyping ? "AI is typing..." : "Ask me anything..."}
                        disabled={isTyping}
                        aria-label="Type your question"
                    />
                    <button
                        className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg flex items-center justify-center transition ${isTyping ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={handleSend}
                        aria-label="Send"
                        disabled={isTyping}
                    >
                        <FaPaperPlane size={18} />
                    </button>
                </div>
            </div>
            {/* Animation */}
            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
        </div>
    );
};

export default AIAssistant; 