import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { TopbarComponent } from '../shared/topbar/topbar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    TopbarComponent
  ],
  template: `
    <div class="dashboard-wrapper">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-topbar></app-topbar>
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-wrapper {
      display: flex;
      min-height: 100vh;
      background-color: var(--background-color);
    }

    .main-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      margin-left: var(--sidebar-width, 280px); /* Adjust based on sidebar width */
      padding-top: var(--topbar-height);
    }

    .content-area {
      padding: 20px;
      flex-grow: 1;
    }

    /* Basic responsive adjustments */
    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }
    }
  `]
})
export class DashboardLayoutComponent { }
