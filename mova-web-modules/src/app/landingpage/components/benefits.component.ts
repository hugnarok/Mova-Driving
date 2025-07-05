import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <h2 class="section-title">Why Choose MOVA?</h2>
        <p class="section-subtitle">
          Experience the difference with our premium delivery service
        </p>
        
        <div class="grid grid-3">
          <div class="card benefit-card" *ngFor="let benefit of benefits">
            <div class="benefit-icon">
              <span [innerHTML]="benefit.icon"></span>
            </div>
            <h3 class="benefit-title">{{ benefit.title }}</h3>
            <p class="benefit-description">{{ benefit.description }}</p>
            <div class="benefit-features">
              <div class="feature" *ngFor="let feature of benefit.features">
                ✓ {{ feature }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .benefit-card {
      text-align: center;
      height: 100%;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .benefit-icon {
      width: 70px;
      height: 70px;
      background: linear-gradient(135deg, #3A80F7, #6B3BEF);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.8rem;
      font-size: 1.8rem;
      color: white;
      box-shadow: 0 5px 15px rgba(58, 128, 247, 0.3);
      transition: transform 0.3s ease; /* Added transition */
    }

    .benefit-card:hover .benefit-icon {
      transform: scale(1.1); /* Added scale on hover */
    }

    .benefit-title {
      font-size: 1.8rem;
      margin-bottom: 0.8rem;
      color: var(--text-primary);
      font-weight: 700;
    }

    .benefit-description {
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      line-height: 1.7;
      font-size: 1rem;
      flex-grow: 1;
    }

    .benefit-features {
      text-align: left;
      width: 100%;
      margin-top: 1rem;
    }

    .feature {
      color: var(--text-secondary);
      margin-bottom: 0.6rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.95rem;
    }

    .feature::before {
      content: '✓';
      color: #3A80F7;
      font-weight: bold;
      font-size: 1.1rem;
    }
  `]
})
export class BenefitsComponent {
  benefits = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Same-day and express delivery options to meet your urgent needs.',
      features: [
        'Same-day delivery available',
        'Express 2-hour delivery',
        'Real-time tracking',
        'Priority support'
      ]
    },
    {
      icon: '🛡️',
      title: 'Reliable & Secure',
      description: 'Your packages are in safe hands with our verified drivers.',
      features: [
        'Background-checked drivers',
        'Package insurance included',
        'Secure handling protocols',
        '24/7 customer support'
      ]
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      description: 'Transparent pricing with no hidden fees and flexible payment options.',
      features: [
        'Upfront pricing calculator',
        'No hidden fees',
        'Multiple payment methods',
        'Volume discounts available'
      ]
    }
  ];
}