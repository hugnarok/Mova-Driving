import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../services/dashboard.service';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { DashboardStats, Driver, Order, RevenueData } from '../../models/dashboard.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, MatIconModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your logistics operations today.</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid" [class.loading]="loading">
        <app-stat-card 
          *ngIf="stats"
          icon="local_shipping"
          [value]="stats.totalDeliveries"
          label="Total Deliveries"
          [trend]="stats.deliveryTrend">
        </app-stat-card>
        
        <app-stat-card 
          *ngIf="stats"
          icon="person"
          [value]="stats.activeDrivers"
          label="Active Drivers"
          [trend]="stats.driverTrend">
        </app-stat-card>
        
        <app-stat-card 
          *ngIf="stats"
          icon="inventory_2"
          [value]="stats.pendingOrders"
          label="Pending Orders"
          [trend]="stats.orderTrend">
        </app-stat-card>
        
        <app-stat-card 
          *ngIf="stats"
          icon="attach_money"
          [value]="stats.revenue"
          label="Revenue ($)"
          [trend]="stats.revenueTrend">
        </app-stat-card>
      </div>

      <!-- Content Grid -->
      <div class="content-grid">
        <!-- Revenue Chart -->
        <div class="chart-card card">
          <div class="chart-header">
            <h3>Revenue Trend</h3>
            <div class="chart-controls">
              <button class="btn btn-outline">Last 7 Days</button>
            </div>
          </div>
          <div class="chart-content">
            <div class="revenue-chart">
              <div class="chart-bars">
                <div class="chart-bar" *ngFor="let data of revenueData" [style.height.%]="getBarHeight(data.revenue)">
                  <div class="bar-value">{{formatRevenue(data.revenue)}}</div>
                </div>
              </div>
              <div class="chart-labels">
                <span *ngFor="let data of revenueData">{{data.month}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="recent-orders card">
          <div class="section-header">
            <h3>Recent Orders</h3>
            <a href="/orders" class="view-all">View All</a>
          </div>
          <div class="order-list">
            <div class="order-item" *ngFor="let order of recentOrders">
              <div class="order-info">
                <h4>{{order.id}}</h4>
                <p>{{order.clientName}}</p>
                <span class="order-date">{{formatDate(order.orderDate)}}</span>
              </div>
              <div class="order-details">
                <span class="order-amount">\${{order.amount}}</span>
                <span class="status-badge" [ngClass]="'status-' + order.status">
                  {{order.status}}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Drivers -->
        <div class="active-drivers card">
          <div class="section-header">
            <h3>Active Drivers</h3>
            <a href="/drivers" class="view-all">View All</a>
          </div>
          <div class="driver-list">
            <div class="driver-item" *ngFor="let driver of activeDrivers">
              <img [src]="driver.avatar" [alt]="driver.name" class="driver-avatar">
              <div class="driver-info">
                <h4>{{driver.name}}</h4>
                <p>{{driver.location}}</p>
                <div class="driver-stats">
                  <span class="deliveries">{{driver.deliveriesCompleted}} deliveries</span>
                  <span class="rating">{{driver.rating}} ★</span>
                </div>
              </div>
              <span class="status-badge" [ngClass]="'status-' + driver.status">
                {{driver.status}}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions card">
          <h3>Quick Actions</h3>
          <div class="action-buttons">
            <button class="btn btn-primary">
              <mat-icon>add</mat-icon>
              New Order
            </button>
            <button class="btn btn-secondary">
              <mat-icon>person_add</mat-icon>
              Add Driver
            </button>
            <button class="btn btn-outline">
              <mat-icon>assessment</mat-icon>
              View Reports
            </button>
            <button class="btn btn-outline">
              <mat-icon>notifications</mat-icon>
              Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 32px;
    }

    .dashboard-header h1 {
      font-size: 32px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }

    .dashboard-header p {
      color: var(--text-secondary);
      font-size: 16px;
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stats-grid.loading {
      opacity: 0.6;
      pointer-events: none;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
    }

    .chart-card {
      grid-column: 1 / -1;
      padding: 24px;
    }

    .chart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .chart-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .revenue-chart {
      height: 300px;
      display: flex;
      flex-direction: column;
    }

    .chart-bars {
      flex: 1;
      display: flex;
      align-items: end;
      gap: 16px;
      padding-bottom: 16px;
    }

    .chart-bar {
      flex: 1;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      border-radius: 4px 4px 0 0;
      min-height: 20px;
      position: relative;
      display: flex;
      align-items: end;
      justify-content: center;
      transition: transform 0.3s ease;
    }

    .chart-bar:hover {
      transform: scale(1.05);
    }

    .bar-value {
      position: absolute;
      top: -24px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-primary);
      white-space: nowrap;
    }

    .chart-labels {
      display: flex;
      gap: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(178, 190, 195, 0.2);
    }

    .chart-labels span {
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: var(--text-secondary);
    }

    .recent-orders,
    .active-drivers,
    .quick-actions {
      padding: 24px;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .section-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .view-all {
      color: var(--primary-color);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
    }

    .view-all:hover {
      text-decoration: underline;
    }

    .order-list,
    .driver-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .order-item,
    .driver-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      background: rgba(78, 90, 177, 0.02);
      border-radius: 8px;
      transition: background 0.2s ease;
    }

    .order-item:hover,
    .driver-item:hover {
      background: rgba(78, 90, 177, 0.05);
    }

    .order-info h4,
    .driver-info h4 {
      margin: 0 0 4px 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .order-info p,
    .driver-info p {
      margin: 0 0 4px 0;
      font-size: 13px;
      color: var(--text-secondary);
    }

    .order-date {
      font-size: 12px;
      color: var(--text-muted);
    }

    .order-details {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }

    .order-amount {
      font-weight: 600;
      color: var(--text-primary);
    }

    .driver-item {
      align-items: center;
    }

    .driver-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }

    .driver-info {
      flex: 1;
      margin-left: 12px;
    }

    .driver-stats {
      display: flex;
      gap: 16px;
      font-size: 12px;
      color: var(--text-muted);
    }

    .quick-actions h3 {
      margin: 0 0 20px 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .action-buttons .btn {
      justify-content: flex-start;
      width: 100%;
    }

    @media (max-width: 1024px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }

      .dashboard-header h1 {
        font-size: 24px;
      }

      .chart-card,
      .recent-orders,
      .active-drivers,
      .quick-actions {
        padding: 16px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  recentOrders: Order[] = [];
  activeDrivers: Driver[] = [];
  revenueData: RevenueData[] = [];
  loading = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.loading = true;
    
    // Load all dashboard data
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
        this.loading = false;
      }
    });

    this.dashboardService.getOrders().subscribe({
      next: (orders) => {
        this.recentOrders = orders.slice(0, 5);
      }
    });

    this.dashboardService.getDrivers().subscribe({
      next: (drivers) => {
        this.activeDrivers = drivers.filter(d => d.status === 'online').slice(0, 4);
      }
    });

    this.dashboardService.getRevenueData().subscribe({
      next: (data) => {
        this.revenueData = data;
      }
    });
  }

  getBarHeight(revenue: number): number {
    const maxRevenue = Math.max(...this.revenueData.map(d => d.revenue));
    return (revenue / maxRevenue) * 100;
  }

  formatRevenue(revenue: number): string {
    return `$${revenue.toLocaleString()}`;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}