import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { DataTableComponent, TableColumn } from '../../shared/components/data-table/data-table.component';
import { Order } from '../../models/dashboard.models';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  template: `
    <div class="orders-container">
      <div class="page-header">
        <h1>Order Management</h1>
        <p>Track and manage all delivery orders</p>
      </div>

      <div class="orders-stats">
        <div class="stat-card card">
          <div class="stat-icon pending">□</div>
          <div class="stat-content">
            <h3>{{ pendingOrders }}</h3>
            <p>Pending Orders</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon transit">▲</div>
          <div class="stat-content">
            <h3>{{ inTransitOrders }}</h3>
            <p>In Transit</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon delivered">✓</div>
          <div class="stat-content">
            <h3>{{ deliveredOrders }}</h3>
            <p>Delivered</p>
          </div>
        </div>
      </div>

      <div class="orders-filters">
        <div class="filter-group">
          <label>Status:</label>
          <select (change)="onStatusFilter($event)">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Priority:</label>
          <select (change)="onPriorityFilter($event)">
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div class="orders-table">
        <app-data-table
          title="All Orders"
          [data]="filteredOrders"
          [columns]="tableColumns"
          [showAddButton]="true"
          entityName="Order"
          (add)="onAddOrder()"
          (rowClick)="onOrderClick($event)">
        </app-data-table>
      </div>
    </div>
  `,
  styles: [`
    .orders-container {
      max-width: 1400px;
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

    .orders-stats {
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

    .stat-icon.pending {
      background: rgba(93, 156, 236, 0.1);
      color: var(--accent-color);
    }

    .stat-icon.transit {
      background: rgba(253, 203, 110, 0.1);
      color: var(--warning-color);
    }

    .stat-icon.delivered {
      background: rgba(0, 184, 148, 0.1);
      color: var(--success-color);
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

    .orders-filters {
      display: flex;
      gap: 24px;
      margin-bottom: 24px;
      padding: 20px;
      background: var(--card-background);
      border-radius: 12px;
      border: 1px solid var(--border-color);
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .filter-group label {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-primary);
    }

    .filter-group select {
      padding: 8px 12px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 14px;
      background: var(--card-background);
      color: var(--text-primary);
    }

    .filter-group select:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .orders-table {
      margin-top: 32px;
    }

    @media (max-width: 768px) {
      .orders-stats {
        grid-template-columns: 1fr;
      }

      .orders-filters {
        flex-direction: column;
        gap: 16px;
      }

      .page-header h1 {
        font-size: 24px;
      }
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  loading = false;
  statusFilter = '';
  priorityFilter = '';

  tableColumns: TableColumn[] = [
    { key: 'id', label: 'Order ID', type: 'text', sortable: true },
    { key: 'clientName', label: 'Client', type: 'text' },
    { key: 'driverName', label: 'Driver', type: 'text' },
    { key: 'pickupAddress', label: 'Pickup', type: 'text' },
    { key: 'deliveryAddress', label: 'Delivery', type: 'text' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'priority', label: 'Priority', type: 'status' },
    { key: 'amount', label: 'Amount', type: 'number', sortable: true },
    { key: 'orderDate', label: 'Order Date', type: 'date', sortable: true }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadOrders();
  }

  private loadOrders() {
    this.loading = true;
    this.dashboardService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.loading = false;
      }
    });
  }

  private applyFilters() {
    this.filteredOrders = this.orders.filter(order => {
      const statusMatch = !this.statusFilter || order.status === this.statusFilter;
      const priorityMatch = !this.priorityFilter || order.priority === this.priorityFilter;
      return statusMatch && priorityMatch;
    });
  }

  get pendingOrders() {
    return this.orders.filter(o => o.status === 'pending').length;
  }

  get inTransitOrders() {
    return this.orders.filter(o => o.status === 'in-transit').length;
  }

  get deliveredOrders() {
    return this.orders.filter(o => o.status === 'delivered').length;
  }

  onStatusFilter(event: any) {
    this.statusFilter = event.target.value;
    this.applyFilters();
  }

  onPriorityFilter(event: any) {
    this.priorityFilter = event.target.value;
    this.applyFilters();
  }

  onAddOrder() {
    console.log('Add new order');
    // TODO: Open add order modal/form
  }

  onOrderClick(order: Order) {
    console.log('Order clicked:', order);
    // TODO: Navigate to order details or open modal
  }
}