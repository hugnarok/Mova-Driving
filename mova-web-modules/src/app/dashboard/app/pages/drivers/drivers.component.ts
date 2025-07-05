import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { Driver } from '../../models/dashboard.models';
import { TableColumn } from '../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  template: `
    <div class="drivers-container">
      <div class="page-header">
        <h1>Driver Management</h1>
        <p>Manage your delivery drivers and monitor their performance</p>
      </div>

      <div class="drivers-stats">
        <div class="stat-card card">
          <div class="stat-icon online">●</div>
          <div class="stat-content">
            <h3>{{ onlineDrivers }}</h3>
            <p>Online Drivers</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon busy">▲</div>
          <div class="stat-content">
            <h3>{{ busyDrivers }}</h3>
            <p>Busy Drivers</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon offline">○</div>
          <div class="stat-content">
            <h3>{{ offlineDrivers }}</h3>
            <p>Offline Drivers</p>
          </div>
        </div>
      </div>

      <div class="drivers-table">
        <app-data-table
          title="All Drivers"
          [data]="drivers"
          [columns]="tableColumns"
          [showAddButton]="true"
          entityName="Driver"
          (add)="onAddDriver()"
          (rowClick)="onDriverClick($event)">
        </app-data-table>
      </div>
    </div>
  `,
  styles: [`
    .drivers-container {
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

    .drivers-stats {
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

    .stat-icon.online {
      background: rgba(0, 184, 148, 0.1);
      color: var(--success-color);
    }

    .stat-icon.busy {
      background: rgba(253, 203, 110, 0.1);
      color: var(--warning-color);
    }

    .stat-icon.offline {
      background: rgba(225, 112, 85, 0.1);
      color: var(--danger-color);
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

    .drivers-table {
      margin-top: 32px;
    }

    @media (max-width: 768px) {
      .drivers-stats {
        grid-template-columns: 1fr;
      }

      .page-header h1 {
        font-size: 24px;
      }
    }
  `]
})
export class DriversComponent implements OnInit {
  drivers: Driver[] = [];
  loading = false;

  tableColumns: TableColumn[] = [
    { key: 'avatar', label: 'Avatar', type: 'text' },
    { key: 'name', label: 'Name', type: 'text', sortable: true },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'deliveriesCompleted', label: 'Deliveries', type: 'number', sortable: true },
    { key: 'rating', label: 'Rating', type: 'number', sortable: true },
    { key: 'vehicle', label: 'Vehicle', type: 'text' }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDrivers();
  }

  private loadDrivers() {
    this.loading = true;
    this.dashboardService.getDrivers().subscribe({
      next: (drivers) => {
        this.drivers = drivers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading drivers:', error);
        this.loading = false;
      }
    });
  }

  get onlineDrivers() {
    return this.drivers.filter(d => d.status === 'online').length;
  }

  get busyDrivers() {
    return this.drivers.filter(d => d.status === 'busy').length;
  }

  get offlineDrivers() {
    return this.drivers.filter(d => d.status === 'offline').length;
  }

  onAddDriver() {
    console.log('Add new driver');
    // TODO: Open add driver modal/form
  }

  onDriverClick(driver: Driver) {
    console.log('Driver clicked:', driver);
    // TODO: Navigate to driver details or open modal
  }
}