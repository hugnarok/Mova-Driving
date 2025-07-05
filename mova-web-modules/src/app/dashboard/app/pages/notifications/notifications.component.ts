import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { Notification } from '../../models/dashboard.models';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-container">
      <div class="page-header">
        <h1>Notifications</h1>
        <p>Stay updated with important alerts and system notifications</p>
      </div>

      <div class="notification-stats">
        <div class="stat-card card">
          <div class="stat-icon unread">!</div>
          <div class="stat-content">
            <h3>{{ unreadCount }}</h3>
            <p>Unread Notifications</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon today">■</div>
          <div class="stat-content">
            <h3>{{ todayCount }}</h3>
            <p>Today's Notifications</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon total">●</div>
          <div class="stat-content">
            <h3>{{ notifications.length }}</h3>
            <p>Total Notifications</p>
          </div>
        </div>
      </div>

      <div class="notifications-actions">
        <button class="btn btn-primary" (click)="markAllAsRead()">
          Mark All as Read
        </button>
        <button class="btn btn-outline" (click)="clearAll()">
          Clear All
        </button>
      </div>

      <div class="notifications-list">
        <div class="notification-item card" 
             *ngFor="let notification of notifications" 
             [class.unread]="!notification.read"
             [class]="'type-' + notification.type">
          <div class="notification-icon">
            <span>{{ getNotificationIcon(notification.type) }}</span>
          </div>
          
          <div class="notification-content">
            <div class="notification-header">
              <h4>{{ notification.title }}</h4>
              <span class="notification-time">{{ formatTime(notification.timestamp) }}</span>
            </div>
            
            <p class="notification-message">{{ notification.message }}</p>
            
            <div class="notification-actions" *ngIf="notification.actionUrl">
              <a [href]="notification.actionUrl" class="btn btn-sm btn-primary">
                Take Action
              </a>
            </div>
          </div>
          
          <div class="notification-controls">
            <button class="btn btn-sm btn-outline" 
                    *ngIf="!notification.read"
                    (click)="markAsRead(notification)">
              Mark as Read
            </button>
            <button class="btn btn-sm btn-outline" (click)="deleteNotification(notification)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notifications-container {
      max-width: 1000px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: 32px;
    }

    .page-header h1 {
      font-size: 32px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }

    .page-header p {
      color: var(--text-secondary);
      font-size: 16px;
      margin: 0;
    }

    .notification-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-card {
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      flex-shrink: 0;
    }

    .stat-icon.unread {
      background: rgba(225, 112, 85, 0.1);
      color: var(--danger-color);
    }

    .stat-icon.today {
      background: rgba(93, 156, 236, 0.1);
      color: var(--accent-color);
    }

    .stat-icon.total {
      background: rgba(78, 90, 177, 0.1);
      color: var(--primary-color);
    }

    .stat-content h3 {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .stat-content p {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0;
    }

    .notifications-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
    }

    .notifications-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .notification-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 20px;
      transition: all 0.2s ease;
      border-left: 4px solid transparent;
    }

    .notification-item.unread {
      background: rgba(78, 90, 177, 0.02);
      border-left-color: var(--primary-color);
    }

    .notification-item.type-error {
      border-left-color: var(--danger-color);
    }

    .notification-item.type-warning {
      border-left-color: var(--warning-color);
    }

    .notification-item.type-success {
      border-left-color: var(--success-color);
    }

    .notification-item.type-info {
      border-left-color: var(--accent-color);
    }

    .notification-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      flex-shrink: 0;
      background: rgba(78, 90, 177, 0.1);
    }

    .notification-content {
      flex: 1;
    }

    .notification-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .notification-header h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .notification-time {
      font-size: 12px;
      color: var(--text-muted);
    }

    .notification-message {
      margin: 0 0 16px 0;
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .notification-actions {
      margin-top: 12px;
    }

    .notification-controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex-shrink: 0;
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 12px;
    }

    @media (max-width: 768px) {
      .notification-stats {
        grid-template-columns: 1fr;
      }

      .notifications-actions {
        flex-direction: column;
      }

      .notification-item {
        flex-direction: column;
        align-items: stretch;
      }

      .notification-controls {
        flex-direction: row;
        justify-content: flex-end;
      }

      .page-header h1 {
        font-size: 24px;
      }
    }
  `]
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  loading = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  private loadNotifications() {
    this.loading = true;
    this.dashboardService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.loading = false;
      }
    });
  }

  get unreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  get todayCount() {
    const today = new Date().toDateString();
    return this.notifications.filter(n => 
      new Date(n.timestamp).toDateString() === today
    ).length;
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'error': return '×';
      case 'warning': return '!';
      case 'success': return '✓';
      case 'info': return 'i';
      default: return '●';
    }
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes || 1} minute${diffMinutes > 1 ? 's' : ''} ago`;
    }
  }

  markAsRead(notification: Notification) {
    notification.read = true;
    this.dashboardService.markNotificationAsRead(notification.id).subscribe({
      next: (success) => {
        if (success) {
          console.log('Notification marked as read');
        }
      },
      error: (error) => {
        console.error('Error marking notification as read:', error);
        notification.read = false; // Revert on error
      }
    });
  }

  markAllAsRead() {
    this.notifications.forEach(notification => {
      if (!notification.read) {
        this.markAsRead(notification);
      }
    });
  }

  deleteNotification(notification: Notification) {
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
    // TODO: Implement actual delete API call
  }

  clearAll() {
    this.notifications = [];
    // TODO: Implement actual clear all API call
  }
}