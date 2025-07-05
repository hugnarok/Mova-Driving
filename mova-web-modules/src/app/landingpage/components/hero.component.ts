import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Fast and reliable deliveries with 
              <span class="gradient-text">MOVA</span>
            </h1>
            <p class="hero-subtitle">
              Connect with professional delivery drivers and get your packages delivered 
              quickly and safely. From same-day delivery to scheduled shipments, 
              MOVA makes logistics simple.
            </p>
            <div class="hero-buttons">
              <a href="#" class="btn btn-primary btn-large">Request Delivery</a>
              <a href="#" class="btn btn-secondary btn-large">Join as Driver</a>
            </div>
            <div class="hero-stats">
              <div class="stat">
                <span class="stat-number">10K+</span>
                <span class="stat-label">Deliveries Completed</span>
              </div>
              <div class="stat">
                <span class="stat-number">500+</span>
                <span class="stat-label">Active Drivers</span>
              </div>
              <div class="stat">
                <span class="stat-number">98%</span>
                <span class="stat-label">Customer Satisfaction</span>
              </div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="cube-container">
              <div class="cube">
                <div class="face front"></div>
                <div class="face back"></div>
                <div class="face right"></div>
                <div class="face left"></div>
                <div class="face top"></div>
                <div class="face bottom"></div>
              </div>
              <div class="floating-elements">
                <div class="element element-1"></div>
                <div class="element element-2"></div>
                <div class="element element-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding: 120px 0 80px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: var(--gradient-bg);
      position: relative;
      overflow: hidden;
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      position: relative;
      z-index: 1;
    }

    .hero-text {
      max-width: 600px;
    }

    .hero-title {
      font-size: 3.8rem;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
      font-weight: 800;
    }

    .gradient-text {
      background: linear-gradient(135deg, #3A80F7, #6B3BEF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.15rem;
      color: var(--text-secondary);
      margin-bottom: 2.5rem;
      line-height: 1.7;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 3rem;
    }

    .btn-large {
      padding: 16px 32px;
      font-size: 1.1rem;
    }

    .hero-stats {
      display: flex;
      gap: 2.5rem;
    }

    .stat {
      display: flex;
      flex-direction: column;
    }

    .stat-number {
      font-size: 2.2rem;
      font-weight: 700;
      color: #3A80F7;
    }

    .stat-label {
      font-size: 0.95rem;
      color: var(--text-secondary);
    }

    .cube-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 450px;
      perspective: 1000px;
    }

    .cube {
      position: relative;
      width: 220px;
      height: 220px;
      transform-style: preserve-3d;
      animation: rotate 25s infinite linear;
    }

    .face {
      position: absolute;
      width: 220px;
      height: 220px;
      border: 2px solid rgba(58, 128, 247, 0.3);
      background: rgba(58, 128, 247, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: rgba(255,255,255,0.7);
      text-shadow: 0 0 10px rgba(58, 128, 247, 0.5);
    }

    .front { transform: rotateY(0deg) translateZ(110px); }
    .back { transform: rotateY(180deg) translateZ(110px); }
    .right { transform: rotateY(90deg) translateZ(110px); }
    .left { transform: rotateY(-90deg) translateZ(110px); }
    .top { transform: rotateX(90deg) translateZ(110px); }
    .bottom { transform: rotateX(-90deg) translateZ(110px); }

    .floating-elements {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .element {
      position: absolute;
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
      filter: blur(2px);
    }

    .element-1 {
      width: 25px;
      height: 25px;
      background: #3A80F7;
      top: 15%;
      right: 15%;
      animation-delay: 0s;
    }

    .element-2 {
      width: 35px;
      height: 35px;
      background: #6B3BEF;
      bottom: 25%;
      left: 5%;
      animation-delay: 2s;
    }

    .element-3 {
      width: 20px;
      height: 20px;
      background: #3A80F7;
      top: 55%;
      right: 35%;
      animation-delay: 4s;
    }

    @keyframes rotate {
      0% { transform: rotateX(0deg) rotateY(0deg); }
      100% { transform: rotateX(360deg) rotateY(360deg); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-15px) translateX(10px); }
      50% { transform: translateY(0px) translateX(0px); }
      75% { transform: translateY(15px) translateX(-10px); }
    }

    @media (max-width: 992px) {
      .hero-title {
        font-size: 3rem;
      }
      .hero-subtitle {
        font-size: 1.1rem;
      }
      .hero-stats {
        flex-wrap: wrap;
      }
    }

    @media (max-width: 768px) {
      .hero {
        padding: 100px 0 60px;
      }
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 3rem;
      }
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      .hero-stats {
        justify-content: center;
      }
      .hero-visual {
        order: -1; /* Move visual to top on mobile */
      }
      .cube-container {
        height: 300px;
      }
      .cube, .face {
        width: 180px;
        height: 180px;
      }
      .front { transform: rotateY(0deg) translateZ(90px); }
      .back { transform: rotateY(180deg) translateZ(90px); }
      .right { transform: rotateY(90deg) translateZ(90px); }
      .left { transform: rotateY(-90deg) translateZ(90px); }
      .top { transform: rotateX(90deg) translateZ(90px); }
      .bottom { transform: rotateX(-90deg) translateZ(90px); }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 2.2rem;
      }
      .hero-subtitle {
        font-size: 1rem;
      }
      .btn-large {
        padding: 12px 24px;
        font-size: 1rem;
      }
      .stat-number {
        font-size: 1.8rem;
      }
      .stat-label {
        font-size: 0.85rem;
      }
    }
  `]
})
export class HeroComponent {}