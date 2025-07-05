import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <nav class="sidebar" [class.collapsed]="isCollapsed">
      <div class="sidebar-header">
        <div class="logo">
          <mat-icon class="logo-icon">local_shipping</mat-icon>
          <span class="logo-text" *ngIf="!isCollapsed">Mova</span>
        </div>
      </div>
      
      <div class="sidebar-menu">
        <div class="menu-section">
          <h3 class="menu-title" *ngIf="!isCollapsed">Main</h3>
          <ul class="menu-items">
            <li class="menu-item">
              <a routerLink="/dashboard" routerLinkActive="active" class="menu-link">
                <mat-icon class="menu-icon">dashboard</mat-icon>
                <span class="menu-text" *ngIf="!isCollapsed">Dashboard</span>
              </a>
            </li>
            <li class="menu-item">
              <a routerLink="/tracking" routerLinkActive="active" class="menu-link">
                <mat-icon class="menu-icon">map</mat-icon>
                <span class="menu-text" *ngIf="!isCollapsed">Live Tracking</span>
              </a>
            </li>
            <li class="menu-item">
              <a routerLink="/orders" routerLinkActive="active" class="menu-link">
                <mat-icon class="menu-icon">inventory_2</mat-icon>
                <span class="menu-text" *ngIf="!isCollapsed">Orders</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="menu-section">
          <h3 class="menu-title" *ngIf="!isCollapsed">Management</h3>
          <ul class="menu-items">
            <li class="menu-item">
              <a routerLink="/drivers" routerLinkActive="active" class="menu-link">
                <mat-icon class="menu-icon">person</mat-icon>
                <span class="menu-text" *ngIf="!isCollapsed">Drivers</span>
              </a>
            </li>
            <li class="menu-item">
              <a routerLink="/clients" routerLinkActive="active" class="menu-link">
                <mat-icon class="menu-icon">business</mat-icon>
                <span class="menu-text" *ngIf="!isCollapsed">Clients</span>
              </a>
            </li>
            <li class="menu-item">
              <a routerLink="/payments" routerLinkActive="active" class="menu-link">
                <mat-icon class="menu-icon">payment</mat-icon>
                <span class="menu-text" *ngIf="!isCollapsed">Payments</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="menu-section">
          <h3 class="menu-title" *ngIf="!isCollapsed">System</h3>
          <ul class="menu-items">
            <li class="menu-item">
              <a routerLink="/notifications" routerLinkActive="active" class="menu-link">
                <mat-icon class="menu-icon">notifications</mat-icon>
                <span class="menu-text" *ngIf="!isCollapsed">Notifications</span>
                <span class="notification-badge" *ngIf="!isCollapsed">3</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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
      transition: width 0.3s ease;
      overflow-y: auto;
    }

    .sidebar.collapsed {
      width: 80px;
    }

    .sidebar-header {
      padding: 20px 24px;
      border-bottom: 1px solid rgba(178, 190, 195, 0.2);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
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