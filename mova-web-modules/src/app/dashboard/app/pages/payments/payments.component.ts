import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { DataTableComponent, TableColumn } from '../../shared/components/data-table/data-table.component';
import { PaymentReport } from '../../models/dashboard.models';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  template: `
    <div class="payments-container">
      <div class="page-header">
        <h1>Payment Reports</h1>
        <p>Monitor payment status and revenue analytics</p>
      </div>

      <div class="payment-stats">
        <div class="stat-card card">
          <div class="stat-icon paid">$</div>
          <div class="stat-content">
            <h3>\${{ totalPaid | number }}</h3>
            <p>Total Paid</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon pending">○</div>
          <div class="stat-content">
            <h3>\${{ totalPending | number }}</h3>
            <p>Pending Payments</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon overdue">!</div>
          <div class="stat-content">
            <h3>\${{ totalOverdue | number }}</h3>
            <p>Overdue Payments</p>
          </div>
        </div>
      </div>

      <div class="revenue-chart card">
        <div class="chart-header">
          <h3>Revenue Overview</h3>
          <div class="chart-controls">
            <button class="btn btn-outline">This Month</button>
            <button class="btn btn-outline">Last 3 Months</button>
            <button class="btn btn-outline">This Year</button>
          </div>
        </div>
        <div class="chart-content">
          <div class="chart-placeholder">
            <div class="chart-icon">■</div>
            <h4>Revenue Analytics</h4>
            <p>Advanced revenue charts and analytics would be displayed here</p>
          </div>
        </div>
      </div>

      <div class="payments-table">
        <app-data-table
          title="Payment Reports"
          [data]="payments"
          [columns]="tableColumns"
          [showAddButton]="false"
          entityName="Payment"
          (rowClick)="onPaymentClick($event)">
        </app-data-table>
      </div>
    </div>
  `,
  styles: [`
    .payments-container {
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

    .payment-stats {
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

    .stat-icon.paid {
      background: rgba(0, 184, 148, 0.1);
      color: var(--success-color);
    }

    .stat-icon.pending {
      background: rgba(93, 156, 236, 0.1);
      color: var(--accent-color);
    }

    .stat-icon.overdue {
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

    .revenue-chart {
      margin-bottom: 32px;
      padding: 0;
      overflow: hidden;
    }

    .chart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-color);
    }

    .chart-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .chart-controls {
      display: flex;
      gap: 8px;
    }

    .chart-controls .btn {
      padding: 8px 16px;
      font-size: 12px;
    }

    .chart-content {
      padding: 24px;
    }

    .chart-placeholder {
      height: 300px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .chart-icon {
      font-size: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
      font-weight: bold;
    }

    .chart-placeholder h4 {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }

    .chart-placeholder p {
      color: var(--text-secondary);
      margin: 0;
    }

    .payments-table {
      margin-top: 32px;
    }

    @media (max-width: 768px) {
      .payment-stats {
        grid-template-columns: 1fr;
      }

      .chart-header {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
      }

      .chart-controls {
        width: 100%;
        justify-content: space-between;
      }

      .page-header h1 {
        font-size: 24px;
      }
    }
  `]
})
export class PaymentsComponent implements OnInit {
  payments: PaymentReport[] = [];
  loading = false;

  tableColumns: TableColumn[] = [
    { key: 'id', label: 'Payment ID', type: 'text', sortable: true },
    { key: 'orderId', label: 'Order ID', type: 'text' },
    { key: 'clientName', label: 'Client', type: 'text' },
    { key: 'amount', label: 'Amount', type: 'number', sortable: true },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'paymentMethod', label: 'Method', type: 'text' },
    { key: 'dueDate', label: 'Due Date', type: 'date', sortable: true },
    { key: 'paymentDate', label: 'Paid Date', type: 'date', sortable: true }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadPayments();
  }

  private loadPayments() {
    this.loading = true;
    this.dashboardService.getPaymentReports().subscribe({
      next: (payments) => {
        this.payments = payments;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading payments:', error);
        this.loading = false;
      }
    });
  }

  get totalPaid() {
    return this.payments
      .filter(p => p.status === 'paid')
      .reduce((sum, payment) => sum + payment.amount, 0);
  }

  get totalPending() {
    return this.payments
      .filter(p => p.status === 'pending')
      .reduce((sum, payment) => sum + payment.amount, 0);
  }

  get totalOverdue() {
    return this.payments
      .filter(p => p.status === 'overdue')
      .reduce((sum, payment) => sum + payment.amount, 0);
  }

  onPaymentClick(payment: PaymentReport) {
    console.log('Payment clicked:', payment);
    // TODO: Navigate to payment details or open modal
  }
}