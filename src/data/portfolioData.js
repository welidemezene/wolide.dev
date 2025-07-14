import projects from './projects';
import { blogPosts } from './blogPosts';

const about = {
    name: 'Wolde',
    bio: "I'm a passionate developer with a focus on modern web technologies, building beautiful and functional digital experiences.",
    // Add more fields as needed
};

const contact = {
    email: 'wolde@example.com',
    phone: '+1234567890',
    location: 'Your City, Country',
};

const resume = '/wolde-Resume.pdf';

const socials = [
    { name: 'GitHub', url: 'https://github.com/yourusername' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
    { name: 'Twitter', url: 'https://twitter.com/yourusername' },
    // Add more as needed
];

export default {
    about,
    contact,
    resume,
    socials,
    projects,
    blogPosts,
}; 