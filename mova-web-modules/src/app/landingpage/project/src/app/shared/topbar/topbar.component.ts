import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <header class="topbar">
      <div class="topbar-left">
        <button class="sidebar-toggle" (click)="toggleSidebar()">
          <mat-icon>menu</mat-icon>
        </button>
        <div class="page-title">
          <h1>Dashboard</h1>
        </div>
      </div>
      
      <div class="topbar-right">
        <div class="search-box">
          <mat-icon class="search-icon">search</mat-icon>
          <input type="text" placeholder="Search..." />
        </div>
        
        <div class="notification-bell">
          <mat-icon class="bell-icon">notifications</mat-icon>
          <span class="notification-count">3</span>
        </div>
        
        <div class="user-profile">
          <img 
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" 
            alt="Profile" 
            class="profile-avatar"
          />
          <div class="profile-info">
            <span class="profile-name">John Doe</span>
            <span class="profile-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .topbar {
      height: var(--topbar-height);
      background: var(--card-background);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      position: fixed;
      top: 0;
      right: 0;
      left: var(--sidebar-width);
      z-index: 90;
      transition: left 0.3s ease;
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .sidebar-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: background 0.2s ease;
    }

    .sidebar-toggle:hover {
      background: rgba(78, 90, 177, 0.1);
    }

    .sidebar-toggle mat-icon {
      color: var(--text-secondary);
    }

    .page-title h1 {
      font-size: 24px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .search-box {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-box input {
      width: 300px;
      padding: 10px 16px 10px 40px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 14px;
      background: var(--background-color);
      transition: border-color 0.2s ease;
    }

    .search-box input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .search-icon {
      position: absolute;
      left: 12px;
      color: var(--text-muted);
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .notification-bell {
      position: relative;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: background 0.2s ease;
    }

    .notification-bell:hover {
      background: rgba(78, 90, 177, 0.1);
    }

    .bell-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      color: var(--text-secondary);
    }

    .notification-count {
      position: absolute;
      top: 4px;
      right: 4px;
      background: var(--danger-color);
      color: white;
      border-radius: 10px;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 600;
      min-width: 16px;
      text-align: center;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: background 0.2s ease;
    }

    .user-profile:hover {
      background: rgba(78, 90, 177, 0.05);
    }

    .profile-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .profile-info {
      display: flex;
      flex-direction: column;
    }

    .profile-name {
      font-weight: 600;
      font-size: 14px;
      color: var(--text-primary);
    }

    .profile-role {
      font-size: 12px;
      color: var(--text-muted);
    }

    @media (max-width: 768px) {
      .topbar {
        left: 0;
        padding: 0 16px;
      }

      .sidebar-toggle {
        display: block;
      }

      .search-box {
        display: none;
      }

      .profile-info {
        display: none;
      }
    }
  `]
})
export class TopbarComponent {
  @Output() sidebarToggle = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggle.emit();
  }
}