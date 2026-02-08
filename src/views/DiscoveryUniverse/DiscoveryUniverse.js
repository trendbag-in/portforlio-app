import React from 'react';
import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import './DiscoveryUniverse.css';

const DiscoveryUniverse = () => {
    const universes = [
        {
            id: 'shoppers',
            title: "Shopper's Universe",
            tagline: "The Personal Discover Engine",
            icon: "🛍️",
            pillars: [
                { name: "Hyper-Personalized", question: "What's actually trending in my world right now?" },
                { name: "Aesthetic Discovery", question: "Which creators share my specific style?" },
                { name: "Predictive Curation", question: "What would I love to watch next?" }
            ],
            theme: 'shoppers-theme'
        },
        {
            id: 'creators',
            title: "Creator's Pulse",
            tagline: "Data-Driven Viral Impact",
            icon: "🤳",
            pillars: [
                { name: "Trend Navigation", question: "What should I post today to go viral?" },
                { name: "Audience Alignment", question: "Which brands actually resonate with my audience?" },
                { name: "Smart Growth", question: "What products will my followers actually buy?" }
            ],
            theme: 'creators-theme'
        },
        {
            id: 'brands',
            title: "Brand Matrix",
            tagline: "Mastering Market Momentum",
            icon: "🏢",
            pillars: [
                { name: "Market Positioning", question: "Which creators will drive the most sales for this launch?" },
                { name: "Trend Forecasting", question: "What emerging trends should we capitalize on next?" },
                { name: "Predictive Analytics", question: "Which products are ready for a viral breakout?" }
            ],
            theme: 'brands-theme'
        }
    ];

    return (
        <>
            {universes.map((universe, idx) => (
                <section key={universe.id} id={universe.id} className={`universe-section ${universe.theme}`}>
                    <div className="universe-background">
                        <div className="nebula-cloud"></div>
                    </div>

                    <div className="container">
                        <div className="universe-content">
                            <RevealOnScroll className="universe-header">
                                <div className="universe-icon">{universe.icon}</div>
                                <h2 className="universe-title">{universe.title}</h2>
                                <p className="universe-tagline">{universe.tagline}</p>
                            </RevealOnScroll>

                            <div className="universe-pillars">
                                {universe.pillars.map((pillar, pIdx) => (
                                    <RevealOnScroll
                                        key={pIdx}
                                        className="pillar-card"
                                        delay={200 + pIdx * 100}
                                    >
                                        <span className="pillar-name">{pillar.name}</span>
                                        <h3 className="pillar-question">"{pillar.question}"</h3>
                                    </RevealOnScroll>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
};

export default DiscoveryUniverse;
