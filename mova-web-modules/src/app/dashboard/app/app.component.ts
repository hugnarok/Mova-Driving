import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TopbarComponent } from './shared/topbar/topbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, SidebarComponent, TopbarComponent],
  template: `
    <div class="app-container">
      <app-sidebar [isCollapsed]="sidebarCollapsed"></app-sidebar>
      <div class="main-content" [class.sidebar-collapsed]="sidebarCollapsed">
        <app-topbar (sidebarToggle)="toggleSidebar()"></app-topbar>
        <main class="page-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
      background: var(--background-color);
    }

    .main-content {
      flex: 1;
      margin-left: var(--sidebar-width);
      transition: margin-left 0.3s ease;
      overflow-x: hidden;
    }

    .main-content.sidebar-collapsed {
      margin-left: 80px;
    }

    .page-content {
      padding: 24px;
      min-height: calc(100vh - var(--topbar-height));
      margin-top: var(--topbar-height);
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }
      
      .main-content.sidebar-collapsed {
        margin-left: 0;
      }

      .page-content {
        padding: 16px;
      }
    }
  `]
})
export class AppComponent {
  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}