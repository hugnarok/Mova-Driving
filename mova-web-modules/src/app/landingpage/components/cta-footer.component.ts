import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Get Started?</h2>
          <p class="cta-subtitle">
            Join the MOVA community today and experience fast, reliable deliveries
          </p>
          <div class="cta-buttons">
            <a href="#" class="btn btn-accent btn-large">Start Delivering</a>
            <a href="#" class="btn btn-primary btn-large">Request Delivery</a>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">MOVA</h3>
            <p class="footer-description">
              Connecting customers with reliable delivery professionals for fast, 
              secure package delivery services.
            </p>
            <div class="social-links">
              <a href="#" class="social-link">Facebook</a>
              <a href="#" class="social-link">Twitter</a>
              <a href="#" class="social-link">LinkedIn</a>
              <a href="#" class="social-link">Instagram</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-section-title">Services</h4>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Same-Day Delivery</a></li>
              <li><a href="#" class="footer-link">Express Delivery</a></li>
              <li><a href="#" class="footer-link">Scheduled Delivery</a></li>
              <li><a href="#" class="footer-link">Business Solutions</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-section-title">For Drivers</h4>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Join as Driver</a></li>
              <li><a href="#" class="footer-link">Driver Requirements</a></li>
              <li><a href="#" class="footer-link">Earnings Calculator</a></li>
              <li><a href="#" class="footer-link">Driver Support</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-section-title">Support</h4>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Help Center</a></li>
              <li><a href="#" class="footer-link">Contact Us</a></li>
              <li><a href="#" class="footer-link">Track Package</a></li>
              <li><a href="#" class="footer-link">Report Issue</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p class="copyright">© 2025 MOVA. All rights reserved.</p>
            <div class="footer-bottom-links">
              <a href="#" class="footer-link">Privacy Policy</a>
              <a href="#" class="footer-link">Terms of Service</a>
              <a href="#" class="footer-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .cta-section {
      background: linear-gradient(135deg, #3A80F7, #6B3BEF);
      padding: 100px 0;
      text-align: center;
      color: white;
    }

    .cta-content {
      max-width: 700px;
      margin: 0 auto;
    }

    .cta-title {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      font-weight: 800;
      line-height: 1.1;
    }

    .cta-subtitle {
      font-size: 1.2rem;
      margin-bottom: 3rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.7;
    }

    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
    }

    .footer {
      background: var(--bg-primary);
      padding: 80px 0 0;
      border-top: 1px solid var(--border-color);
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 3rem;
      margin-bottom: 4rem;
    }

    .footer-title {
      font-size: 2.8rem;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #3A80F7, #6B3BEF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 900;
      font-family: 'Poppins', sans-serif;
      letter-spacing: -0.02em;
      text-shadow: 0 0 30px rgba(58, 128, 247, 0.3);
    }

    .footer-description {
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 2.5rem;
      font-size: 1rem;
    }

    .social-links {
      display: flex;
      gap: 1.5rem;
    }

    .social-link {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.3s ease;
      font-size: 1rem;
    }

    .social-link:hover {
      color: #3A80F7;
    }

    .footer-section-title {
      color: var(--text-primary);
      font-size: 1.3rem;
      margin-bottom: 1.8rem;
      font-weight: 700;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li {
      margin-bottom: 1rem;
    }

    .footer-link {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.3s ease;
      font-size: 1rem;
    }

    .footer-link:hover {
      color: #3A80F7;
    }

    .footer-bottom {
      border-top: 1px solid var(--border-color);
      padding: 2.5rem 0;
    }

    .footer-bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .copyright {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    .footer-bottom-links {
      display: flex;
      gap: 2.5rem;
    }

    @media (max-width: 992px) {
      .cta-title {
        font-size: 3rem;
      }
      .footer-content {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 768px) {
      .cta-section {
        padding: 80px 0;
      }
      .cta-title {
        font-size: 2.5rem;
      }
      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
      .footer {
        padding: 60px 0 0;
      }
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
      .footer-bottom-content {
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
      }
      .footer-bottom-links {
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .cta-title {
        font-size: 2rem;
      }
      .cta-subtitle {
        font-size: 1rem;
      }
      .btn-large {
        padding: 12px 24px;
        font-size: 1rem;
      }
    }
  `]
})
export class CtaFooterComponent {}