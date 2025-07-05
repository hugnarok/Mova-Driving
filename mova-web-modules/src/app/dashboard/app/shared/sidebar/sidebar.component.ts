import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <aside class="sidebar" [class.collapsed]="isCollapsed">
      <div class="sidebar-header">
        <a routerLink="/" class="logo">
          <span class="logo-icon"></span>
          <span class="logo-text">Mova</span>
        </a>
      </div>
      <div class="sidebar-menu">
        <span class="menu-title">Menu</span>
        <ul class="menu-items">
          <li class="menu-item">
            <a class="menu-link" routerLink="/admin/dashboard" routerLinkActive="active">
              <mat-icon class="menu-icon">dashboard</mat-icon>
              <span class="menu-text">Dashboard</span>
            </a>
          </li>
          <li class="menu-item">
            <a class="menu-link" routerLink="/admin/orders" routerLinkActive="active">
              <mat-icon class="menu-icon">receipt_long</mat-icon>
              <span class="menu-text">Orders</span>
            </a>
          </li>
          <li class="menu-item">
            <a class="menu-link" routerLink="/admin/tracking" routerLinkActive="active">
              <mat-icon class="menu-icon">local_shipping</mat-icon>
              <span class="menu-text">Delivery Tracking</span>
            </a>
          </li>
          <li class="menu-item">
            <a class="menu-link" routerLink="/admin/clients" routerLinkActive="active">
              <mat-icon class="menu-icon">people</mat-icon>
              <span class="menu-text">Clients</span>
            </a>
          </li>
          <li class="menu-item">
            <a class="menu-link" routerLink="/admin/drivers" routerLinkActive="active">
              <mat-icon class="menu-icon">drive_eta</mat-icon>
              <span class="menu-text">Drivers</span>
            </a>
          </li>
          <li class="menu-item">
            <a class="menu-link" routerLink="/admin/payments" routerLinkActive="active">
              <mat-icon class="menu-icon">payment</mat-icon>
              <span class="menu-text">Payments</span>
            </a>
          </li>
          <li class="menu-item">
            <a class="menu-link" routerLink="/admin/notifications" routerLinkActive="active">
              <mat-icon class="menu-icon">notifications</mat-icon>
              <span class="menu-text">Notifications</span>
              <span class="notification-badge">3</span>
            </a>
          </li>
          <li class="menu-item">
            <a class="menu-link" routerLink="/admin/users" routerLinkActive="active">
              <mat-icon class="menu-icon">manage_accounts</mat-icon>
              <span class="menu-text">User Management</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-width);
      height: 100vh;
      background: var(--card-background);
      border-right: 1px solid var(--border-color);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
      transition: width 0.3s ease, transform 0.3s ease;
      overflow-y: auto;
      padding-top: var(--topbar-height);
    }

    .sidebar.collapsed {
      width: 80px;
    }

    .sidebar-header {
      padding: 20px 24px;
      border-bottom: 1px solid rgba(178, 190, 195, 0.2);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: var(--card-background);
      z-index: 101;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }

    .logo-icon {
      color: var(--primary-color);
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .logo-text {
      font-size: 24px;
      font-weight: 700;
      color: var(--primary-color);
    }

    .sidebar-menu {
      padding: 24px 0;
    }

    .menu-section {
      margin-bottom: 32px;
    }

    .menu-title {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 12px 24px;
    }

    .menu-items {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .menu-item {
      margin-bottom: 4px;
    }

    .menu-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 24px;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.2s ease;
      position: relative;
    }

    .menu-link:hover {
      background: rgba(78, 90, 177, 0.05);
      color: var(--primary-color);
    }

    .menu-link.active {
      background: rgba(78, 90, 177, 0.1);
      color: var(--primary-color);
      border-right: 3px solid var(--primary-color);
    }

    .menu-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .menu-text {
      font-weight: 500;
      font-size: 14px;
    }

    .notification-badge {
      background: var(--danger-color);
      color: white;
      border-radius: 10px;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 600;
      min-width: 16px;
      text-align: center;
      margin-left: auto;
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }
      
      .sidebar.collapsed {
        transform: translateX(0);
        width: 100vw;
      }
    }
  `]
})
export class SidebarComponent {
  @Input() isCollapsed = false;
}