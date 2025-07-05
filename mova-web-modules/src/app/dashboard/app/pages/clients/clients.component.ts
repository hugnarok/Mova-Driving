import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { DataTableComponent, TableColumn } from '../../shared/components/data-table/data-table.component';
import { Client } from '../../models/dashboard.models';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  template: `
    <div class="clients-container">
      <div class="page-header">
        <h1>Client Management</h1>
        <p>Manage your clients and track their order history</p>
      </div>

      <div class="clients-stats">
        <div class="stat-card card">
          <div class="stat-icon">◆</div>
          <div class="stat-content">
            <h3>{{ clients.length }}</h3>
            <p>Total Clients</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon">✓</div>
          <div class="stat-content">
            <h3>{{ activeClients }}</h3>
            <p>Active Clients</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon">$</div>
          <div class="stat-content">
            <h3>\${{ totalRevenue | number }}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div class="clients-table">
        <app-data-table
          title="All Clients"
          [data]="clients"
          [columns]="tableColumns"
          [showAddButton]="true"
          entityName="Client"
          (add)="onAddClient()"
          (rowClick)="onClientClick($event)">
        </app-data-table>
      </div>
    </div>
  `,
  styles: [`
    .clients-container {
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

    .clients-stats {
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
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      color: white;
      flex-shrink: 0;
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

    .clients-table {
      margin-top: 32px;
    }

    @media (max-width: 768px) {
      .clients-stats {
        grid-template-columns: 1fr;
      }

      .page-header h1 {
        font-size: 24px;
      }
    }
  `]
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  loading = false;

  tableColumns: TableColumn[] = [
    { key: 'name', label: 'Name', type: 'text', sortable: true },
    { key: 'company', label: 'Company', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'totalOrders', label: 'Orders', type: 'number', sortable: true },
    { key: 'totalSpent', label: 'Total Spent', type: 'number', sortable: true },
    { key: 'lastOrderDate', label: 'Last Order', type: 'date', sortable: true },
    { key: 'status', label: 'Status', type: 'status' }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadClients();
  }

  private loadClients() {
    this.loading = true;
    this.dashboardService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
        this.loading = false;
      }
    });
  }

  get activeClients() {
    return this.clients.filter(c => c.status === 'active').length;
  }

  get totalRevenue() {
    return this.clients.reduce((sum, client) => sum + client.totalSpent, 0);
  }

  onAddClient() {
    console.log('Add new client');
    // TODO: Open add client modal/form
  }

  onClientClick(client: Client) {
    console.log('Client clicked:', client);
    // TODO: Navigate to client details or open modal
  }
}