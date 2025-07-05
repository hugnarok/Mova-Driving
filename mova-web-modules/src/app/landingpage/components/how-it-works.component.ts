import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section" id="how-it-works">
      <div class="container">
        <h2 class="section-title">How It Works</h2>
        <p class="section-subtitle">
          Get your deliveries done in three simple steps
        </p>
        
        <div class="steps">
          <div class="step" *ngFor="let step of steps; let i = index">
            <div class="step-icon">
              <div class="icon-circle">
                <span [innerHTML]="step.icon"></span>
              </div>
              <div class="step-number">{{ i + 1 }}</div>
            </div>
            <div class="step-content">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-description">{{ step.description }}</p>
            </div>
            <div class="step-connector" *ngIf="i < steps.length - 1"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 3rem;
      position: relative;
      padding: 2rem 0;
    }

    .step {
      text-align: center;
      position: relative;
      padding: 1.5rem;
      border-radius: 12px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .step:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    .step-icon {
      position: relative;
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .icon-circle {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #3A80F7, #6B3BEF);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
      color: white;
      box-shadow: 0 5px 15px rgba(58, 128, 247, 0.3);
      transition: transform 0.3s ease; /* Added transition */
    }

    .step:hover .icon-circle {
      transform: scale(1.1); /* Added scale on hover */
    }

    .step-number {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 35px;
      height: 35px;
      background: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
      color: white;
      border: 3px solid var(--bg-primary);
    }

    .step-title {
      font-size: 1.8rem;
      margin-bottom: 0.8rem;
      color: var(--text-primary);
      font-weight: 700;
    }

    .step-description {
      color: var(--text-secondary);
      line-height: 1.7;
      font-size: 1rem;
    }

    .step-connector {
      position: absolute;
      top: 50%;
      left: calc(100% + 1.5rem);
      width: 3rem;
      height: 2px;
      background: linear-gradient(90deg, #3A80F7, #6B3BEF);
      z-index: -1;
      transform: translateY(-50%);
    }

    @media (max-width: 768px) {
      .steps {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .step-connector {
        display: none;
      }
    }
  `]
})
export class HowItWorksComponent {
  steps = [
    {
      icon: '📱',
      title: 'Choose Service',
      description: 'Select your delivery type, enter pickup and drop-off locations, and specify any special requirements.'
    },
    {
      icon: '🚗',
      title: 'Match with Driver',
      description: 'Our smart algorithm connects you with verified drivers nearby who can handle your delivery needs.'
    },
    {
      icon: '📍',
      title: 'Track & Deliver',
      description: 'Monitor your delivery in real-time and receive notifications when your package is successfully delivered.'
    }
  ];
}