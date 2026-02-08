import React from 'react';
import './AIFeatures.css';

const AIFeatures = () => {
  const usecases = [
    {
      title: "For Shoppers",
      subtitle: "The AI-Powered Personal Stylist",
      icon: "🛍️",
      pillars: [
        {
          name: "Hyper-Personalized Discovery",
          questions: [
            "What products are trending in categories I care about right now?",
            "What are people like me buying, saving, or watching this week?"
          ]
        },
        {
          name: "Aesthetic-First Search",
          questions: [
            "Show me stores that match my style and aesthetic.",
            "Find me alternatives to this product from rising boutique brands."
          ]
        },
        {
          name: "Seamless Navigation",
          questions: [
            "What content should I watch next based on my viewing history?",
            "Show me similar items to what I've liked—across all creators and stores."
          ]
        }
      ]
    },
    {
      title: "For Creators",
      subtitle: "Data-Driven Impact",
      icon: "🤳",
      pillars: [
        {
          name: "Trend Navigation",
          questions: [
            "What content themes are trending in my specific niche today?",
            "Which hashtags will maximize my reach in this category right now?"
          ]
        },
        {
          name: "Collaboration Strategy",
          questions: [
            "Which brands should I collaborate with based on audience alignment?",
            "Which stores' content styles convert best for my audience type?"
          ]
        },
        {
          name: "Audience Growth",
          questions: [
            "What products would my audience actually want to buy?",
            "What is the optimal time to post to reach my core followers?"
          ]
        }
      ]
    },
    {
      title: "For Brands",
      subtitle: "Competitive Advantage",
      icon: "🏭",
      pillars: [
        {
          name: "Market Positioning",
          questions: [
            "Which master categories are growing fastest for my store type?",
            "How do my products compare to trending alternatives in real-time?"
          ]
        },
        {
          name: "Partnership Optimization",
          questions: [
            "Which creators have audiences that perfectly match my target customer?",
            "Which influencers are actively seeking collaborations in my space?"
          ]
        },
        {
          name: "Sales Intelligence",
          questions: [
            "Which products are ready for a viral breakout based on trend velocity?",
            "What price points are converting best in my niche right now?"
          ]
        }
      ]
    }
  ];

  return (
    <section className="section ai-features" id="ai-intelligence">
      <div className="container">
        <div className="section-header animate-fade-up">
          <h2 className="section-title">AI-Native Discovery</h2>
          <p className="section-subtitle">
            Our intelligent relevance engine answers the most critical questions in social commerce, 
            optimized for every participant in the ecosystem.
          </p>
        </div>

        <div className="ai-grid">
          {usecases.map((usecase, idx) => (
            <div key={idx} className="ai-card animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="ai-card-header">
                <span className="ai-icon">{usecase.icon}</span>
                <div className="ai-title-group">
                  <h3>{usecase.title}</h3>
                  <span className="ai-subtitle">{usecase.subtitle}</span>
                </div>
              </div>
              
              <div className="ai-pillars">
                {usecase.pillars.map((pillar, pIdx) => (
                  <div key={pIdx} className="ai-pillar">
                    <h4>{pillar.name}</h4>
                    <ul className="ai-questions">
                      {pillar.questions.map((q, qIdx) => (
                        <li key={qIdx}>{q}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
