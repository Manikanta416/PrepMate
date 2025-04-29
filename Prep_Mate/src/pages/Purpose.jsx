import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Purpose.css';

const Purpose = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  useEffect(() => {
    // Add fade-in animation to elements with 'animate' class
    const animatedElements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      animatedElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className={`purpose-container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="purpose-header animate">
        <div className="logo-container">
          <div className="logo">PrepMate</div>
          <div className="logo-tagline">Your Interview Preparation Companion</div>
        </div>
        <div className="theme-toggle">
          <button onClick={toggleDarkMode} className="theme-toggle-btn">
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content animate">
          <h1>Prepare Smarter. Interview Better.</h1>
          <p className="hero-description">
            The comprehensive tool designed to help you ace your technical interviews
            and land your dream job in the tech industry.
          </p>
        </div>
        <div className="hero-image animate">
          <img src="ggg.png" alt="Interview preparation illustration" />
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title animate">Why Choose PrepMate?</h2>
        
        <div className="features-grid">
          <div className="feature-card animate">
            <div className="feature-icon">📚</div>
            <h3>Extensive Question Bank</h3>
            <p>Access thousands of real interview questions from top tech companies, organized by topic and difficulty.</p>
          </div>
          
          <div className="feature-card animate">
            <div className="feature-icon">🎯</div>
            <h3>Company-Specific Preparation</h3>
            <p>Focus your practice on questions tailored to specific companies and roles you're applying for.</p>
          </div>
          
          <div className="feature-card animate">
            <div className="feature-icon">📊</div>
            <h3>Track Your Progress</h3>
            <p>Monitor your preparation journey with detailed analytics and performance metrics.</p>
          </div>
          
          <div className="feature-card animate">
            <div className="feature-icon">🧠</div>
            <h3>Smart Learning Algorithm</h3>
            <p>Our system adapts to your strengths and weaknesses, providing personalized question recommendations.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
  <h2 className="section-title animate">How PrepMate Works</h2>
  
  <div className="steps-container">
    <div className="step animate">
      <div className="step-number">1</div>
      <div className="step-content">
        <h3>Save Company-Wise Questions & Answers</h3>
        <p>Effortlessly store your interview questions and answers categorized by company, role, and difficulty.</p>
      </div>
    </div>

    <div className="step animate">
      <div className="step-number">2</div>
      <div className="step-content">
        <h3>Enable Collaborative Learning</h3>
        <p>Share your insights and experiences with peers, making PrepMate a valuable resource for other users as well.</p>
      </div>
    </div>

    <div className="step animate">
      <div className="step-number">3</div>
      <div className="step-content">
        <h3>Access Anywhere, Anytime</h3>
        <p>With PrepMate, your interview preparation is always within reach—across all devices, whenever you need it.</p>
      </div>
    </div>

    <div className="step animate">
      <div className="step-number">4</div>
      <div className="step-content">
        <h3>Stay Organized & Confident</h3>
        <p>Keep your preparation structured and focused with intuitive tools that guide your journey to success.</p>
      </div>
    </div>
  </div>
</section>


      <footer className="purpose-footer">
        <div className="footer-content animate">
          <h2>Ready to Start Your Preparation Journey?</h2>
          <p>Join thousands of successful candidates who prepared with PrepMate.</p>
          <Link to="/home" className="cta-button">
            Go to PrepMate Dashboard
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Purpose;