// src/home/home.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header.component';
import { HeroComponent } from '../components/hero.component';
import { HowItWorksComponent } from '../components/how-it-works.component';
import { BenefitsComponent } from '../components/benefits.component';
import { TestimonialsComponent } from '../components/testimonials.component';
import { CtaFooterComponent } from '../components/cta-footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    HowItWorksComponent,
    BenefitsComponent,
    TestimonialsComponent,
    CtaFooterComponent
  ],
  template: `
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-how-it-works></app-how-it-works>
      <app-benefits></app-benefits>
      <app-testimonials></app-testimonials>
    </main>
    <app-cta-footer></app-cta-footer>
  `,
  styleUrls: ['../global_styles.css']
})
export class HomeComponent {}
