import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section testimonials-section">
      <div class="container">
        <h2 class="section-title">What Our Customers Say</h2>
        <p class="section-subtitle">
          Join thousands of satisfied customers who trust MOVA for their delivery needs
        </p>
        
        <div class="testimonials-grid">
          <div class="testimonial-card" *ngFor="let testimonial of testimonials">
            <div class="testimonial-content">
              <div class="quote-icon">"</div>
              <p class="testimonial-text">{{ testimonial.text }}</p>
              <div class="rating">
                <span *ngFor="let star of [1,2,3,4,5]" class="star">★</span>
              </div>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <span>{{ testimonial.author.charAt(0) }}</span>
              </div>
              <div class="author-info">
                <h4 class="author-name">{{ testimonial.author }}</h4>
                <p class="author-role">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="trust-badges">
          <div class="badge">
            <div class="badge-icon">🏆</div>
            <div class="badge-text">
              <span class="badge-title">Award Winning</span>
              <span class="badge-subtitle">Best Delivery Service 2024</span>
            </div>
          </div>
          <div class="badge">
            <div class="badge-icon">🔒</div>
            <div class="badge-text">
              <span class="badge-title">Fully Insured</span>
              <span class="badge-subtitle">Up to $10,000 coverage</span>
            </div>
          </div>
          <div class="badge">
            <div class="badge-icon">⭐</div>
            <div class="badge-text">
              <span class="badge-title">4.9/5 Rating</span>
              <span class="badge-subtitle">Based on 10,000+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-section {
      background: var(--bg-secondary);
      padding: 100px 0;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2.5rem;
      margin-bottom: 5rem;
    }

    .testimonial-card {
      background: var(--bg-card);
      border-radius: 16px;
      padding: 2.5rem;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .testimonial-card:hover {
      transform: translateY(-8px);
      border-color: #3A80F7;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }

    .testimonial-content {
      margin-bottom: 2rem;
    }

    .quote-icon {
      font-size: 3.5rem;
      color: #3A80F7;
      line-height: 1;
      margin-bottom: 1rem;
      font-family: 'Poppins', sans-serif;
      font-weight: 900;
    }

    .testimonial-text {
      color: var(--text-primary);
      line-height: 1.8;
      margin-bottom: 1.5rem;
      font-style: italic;
      font-size: 1.05rem;
    }

    .rating {
      margin-bottom: 1rem;
    }

    .star {
      color: #FFD700;
      font-size: 1.3rem;
      margin-right: 2px;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: auto; /* Pushes author to the bottom */
    }

    .author-avatar {
      width: 55px;
      height: 55px;
      background: linear-gradient(135deg, #3A80F7, #6B3BEF);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: white;
      font-size: 1.3rem;
      flex-shrink: 0;
    }

    .author-name {
      color: var(--text-primary);
      font-size: 1.2rem;
      margin-bottom: 0.2rem;
      font-weight: 600;
    }

    .author-role {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    .trust-badges {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 5rem;
    }

    .badge {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.8rem;
      background: rgba(58, 128, 247, 0.1);
      border-radius: 12px;
      border: 1px solid rgba(58, 128, 247, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .badge:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    .badge-icon {
      font-size: 2.5rem;
      flex-shrink: 0;
    }

    .badge-text {
      display: flex;
      flex-direction: column;
    }

    .badge-title {
      color: var(--text-primary);
      font-weight: 700;
      margin-bottom: 0.2rem;
      font-size: 1.1rem;
    }

    .badge-subtitle {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .testimonials-section {
        padding: 80px 0;
      }
      .testimonials-grid {
        grid-template-columns: 1fr;
      }
      .trust-badges {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TestimonialsComponent {
  testimonials = [
    {
      text: "MOVA has completely transformed how we handle our business deliveries. The drivers are professional, and the real-time tracking gives us peace of mind.",
      author: "Sarah Johnson",
      role: "Small Business Owner"
    },
    {
      text: "I've been using MOVA for all my e-commerce deliveries. The speed and reliability are unmatched. My customers love the tracking updates!",
      author: "Mike Chen",
      role: "E-commerce Entrepreneur"
    },
    {
      text: "As a driver for MOVA, I appreciate the fair compensation and flexible schedule. The app is easy to use and the support team is always helpful.",
      author: "David Rodriguez",
      role: "MOVA Driver Partner"
    }
  ];
}