import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <nav class="nav">
          <div class="logo">
            <h2>MOVA</h2>
          </div>
          <div class="nav-links">
            <a href="#services" class="nav-link">Services</a>
            <a href="#how-it-works" class="nav-link">How it Works</a>
            <a href="#contact" class="nav-link">Contact</a>
            <a routerLink="/login" class="btn btn-secondary">Login</a>
            <a routerLink="/register" class="btn btn-primary">Get Started</a>
          </div>
          <div class="mobile-menu-toggle" (click)="toggleMobileMenu()">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: var(--header-bg);
      backdrop-filter: blur(10px);
      z-index: 1000;
      border-bottom: 1px solid var(--border-color);
      transition: all 0.3s ease;
      padding: 0.8rem 0;
    }

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo h2 {
      background: linear-gradient(135deg, #3A80F7, #6B3BEF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 2.5rem;
      font-weight: 900;
      font-family: 'Poppins', sans-serif;
      letter-spacing: -0.02em;
      text-shadow: 0 0 30px rgba(58, 128, 247, 0.3);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2.5rem;
    }

    .nav-link {
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      font-size: 1.05rem;
    }

    .nav-link:hover {
      color: #3A80F7;
    }

    .mobile-menu-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;
      gap: 5px;
    }

    .mobile-menu-toggle span {
      width: 30px;
      height: 3px;
      background: var(--text-primary);
      border-radius: 2px;
      transition: 0.3s;
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
      
      .mobile-menu-toggle {
        display: flex;
      }
      
      .logo h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class HeaderComponent {
  toggleMobileMenu() {
    // Mobile menu logic would go here
    console.log('Mobile menu toggled');
  }
}