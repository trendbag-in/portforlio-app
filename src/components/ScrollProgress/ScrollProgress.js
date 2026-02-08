import React, { useState, useEffect } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
    const [activeSection, setActiveSection] = useState('hero');

    const sections = [
        { id: 'hero', label: 'Home' },
        { id: 'shoppers', label: 'Shoppers' },
        { id: 'creators', label: 'Creators' },
        { id: 'brands', label: 'Brands' },
        { id: 'about-us', label: 'Why TrendBag' },
        { id: 'integrations', label: 'Powered By' },
        { id: 'mission', label: 'Mission' },
        { id: 'contact', label: 'Contact' },
        { id: 'footer', label: 'Footer' }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for fixed header if needed, or just scrollIntoView
            const yOffset = -0; // 0 because navbar is absolute/static at top now
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        let animationFrameId;

        const handleScroll = () => {
            if (animationFrameId) return;

            animationFrameId = requestAnimationFrame(() => {
                const scrollPosition = window.scrollY + (window.innerHeight / 2);
                let newActiveSection = null;

                for (const section of sections) {
                    const element = document.getElementById(section.id);
                    if (element) {
                        const { offsetTop, offsetHeight } = element;
                        if (
                            scrollPosition >= offsetTop &&
                            scrollPosition < offsetTop + offsetHeight
                        ) {
                            newActiveSection = section.id;
                            break;
                        }
                    }
                }

                if (newActiveSection) {
                    setActiveSection((prev) => (prev !== newActiveSection ? newActiveSection : prev));
                }

                animationFrameId = null;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        <nav className="side-nav">
            {sections.map((section) => (
                <div key={section.id} className="side-nav-item-wrapper">
                    <span className={`side-nav-label ${activeSection === section.id ? 'visible' : ''}`}>
                        {section.label}
                    </span>
                    <button
                        className={`side-nav-dot ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => scrollToSection(section.id)}
                        aria-label={`Scroll to ${section.label}`}
                    />
                </div>
            ))}
        </nav>
    );
};

export default ScrollProgress;
