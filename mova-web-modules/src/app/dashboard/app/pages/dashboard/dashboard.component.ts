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
    :host {
      display: block;
      padding: 20px;
      background-color: var(--background-color);
      min-height: calc(100vh - var(--topbar-height)); /* Adjust for topbar */
    }

    .dashboard-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 40px;
      text-align: center;
    }

    .dashboard-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 10px 0;
    }

    .dashboard-header p {
      color: var(--text-secondary);
      font-size: 1.1rem;
      margin: 0;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
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

    .chart-card,
    .recent-orders,
    .active-drivers,
    .quick-actions {
      background: var(--card-background);
      border-radius: 12px;
      border: 1px solid rgba(78, 90, 177, 0.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      padding: 24px;
    }

    .chart-card {
      grid-column: 1 / -1; /* Span full width */
    }

    .chart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .chart-header h3 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .chart-controls .btn {
      padding: 8px 16px;
      font-size: 0.9rem;
    }

    .revenue-chart {
      height: 250px; /* Adjusted height */
      display: flex;
      flex-direction: column;
    }

    .chart-bars {
      flex: 1;
      display: flex;
      align-items: flex-end;
      gap: 16px;
      padding-bottom: 16px;
    }

    .chart-bar {
      flex: 1;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      border-radius: 4px 4px 0 0;
      min-height: 10px; /* Minimum height for very small values */
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      transition: transform 0.3s ease;
    }

    .chart-bar:hover {
      transform: translateY(-5px) scale(1.02);
    }

    .bar-value {
      position: absolute;
      top: -20px; /* Adjusted position */
      font-size: 0.75rem;
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
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .section-header h3 {
      margin: 0;
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .view-all {
      color: var(--primary-color);
      text-decoration: none;
      font-size: 0.9rem;
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
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .order-info p,
    .driver-info p {
      margin: 0 0 4px 0;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .order-date {
      font-size: 0.8rem;
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

    .status-badge {
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .status-pending {
      background: rgba(255, 193, 7, 0.1);
      color: #ffc107;
    }
    .status-approved {
      background: rgba(40, 167, 69, 0.1);
      color: #28a745;
    }
    .status-rejected {
      background: rgba(220, 53, 69, 0.1);
      color: #dc3545;
    }
    .status-online {
      background: rgba(0, 184, 148, 0.1);
      color: #00b894;
    }

    .driver-item {
      align-items: center;
    }

    .driver-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 12px;
    }

    .driver-info {
      flex: 1;
    }

    .driver-stats {
      display: flex;
      gap: 16px;
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .quick-actions h3 {
      margin: 0 0 20px 0;
      font-size: 1.3rem;
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
      padding: 12px 16px;
      font-size: 1rem;
    }

    .action-buttons .btn mat-icon {
      margin-right: 8px;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    @media (max-width: 1024px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      :host {
        padding: 15px;
      }

      .dashboard-header h1 {
        font-size: 2rem;
      }

      .dashboard-header p {
        font-size: 1rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .chart-card,
      .recent-orders,
      .active-drivers,
      .quick-actions {
        padding: 20px;
      }

      .chart-header h3,
      .section-header h3,
      .quick-actions h3 {
        font-size: 1.2rem;
      }

      .action-buttons .btn {
        font-size: 0.9rem;
        padding: 10px 14px;
      }
    }
  `],
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