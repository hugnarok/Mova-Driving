import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { Delivery } from '../../models/dashboard.models';

@Component({
  selector: 'app-delivery-tracking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tracking-container">
      <div class="page-header">
        <h1>Live Delivery Tracking</h1>
        <p>Monitor real-time delivery status and driver locations</p>
      </div>

      <div class="tracking-layout">
        <!-- Map Section -->
        <div class="map-section card">
          <div class="map-header">
            <h3>Live Map</h3>
            <div class="map-controls">
              <button class="btn btn-outline">◉ Center Map</button>
              <button class="btn btn-outline">↻ Refresh</button>
            </div>
          </div>
          <div class="map-placeholder">
            <div class="map-content">
              <div class="map-icon">■</div>
              <h4>Interactive Map</h4>
              <p>Real-time delivery tracking map would be integrated here</p>
              <div class="map-features">
                <span class="feature">◉ Driver Locations</span>
                <span class="feature">▲ Delivery Routes</span>
                <span class="feature">□ Pickup Points</span>
                <span class="feature">◆ Delivery Destinations</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Delivery List -->
        <div class="delivery-sidebar">
          <div class="delivery-stats">
            <div class="stat-item">
              <span class="stat-number">{{ activeDeliveries }}</span>
              <span class="stat-label">Active Deliveries</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ completedToday }}</span>
              <span class="stat-label">Completed Today</span>
            </div>
          </div>

          <div class="delivery-list card">
            <h3>Active Deliveries</h3>
            <div class="delivery-items">
              <div class="delivery-item" *ngFor="let delivery of deliveries" [class]="'status-' + delivery.status">
                <div class="delivery-header">
                  <span class="delivery-id">{{ delivery.id }}</span>
                  <span class="status-badge" [ngClass]="'status-' + delivery.status">
                    {{ delivery.status }}
                  </span>
                </div>
                
                <div class="delivery-info">
                  <h4>{{ delivery.clientName }}</h4>
                  <p class="driver-info">
                    <span class="driver-icon">●</span>
                    {{ delivery.driverName }}
                  </p>
                </div>

                <div class="delivery-route">
                  <div class="route-point pickup">
                    <span class="route-icon">◉</span>
                    <span class="route-text">{{ delivery.route.pickup }}</span>
                  </div>
                  <div class="route-line"></div>
                  <div class="route-point delivery">
                    <span class="route-icon">◆</span>
                    <span class="route-text">{{ delivery.route.delivery }}</span>
                  </div>
                </div>

                <div class="delivery-time" *ngIf="delivery.estimatedArrival">
                  <span class="time-icon">○</span>
                  <span class="time-text">ETA: {{ formatTime(delivery.estimatedArrival) }}</span>
                </div>

                <div class="delivery-actions">
                  <button class="btn btn-outline btn-sm">View Details</button>
                  <button class="btn btn-primary btn-sm">Contact Driver</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tracking-container {
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

    .tracking-layout {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 24px;
    }

    .map-section {
      padding: 0;
      overflow: hidden;
    }

    .map-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-color);
    }

    .map-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .map-controls {
      display: flex;
      gap: 12px;
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 12px;
    }

    .map-placeholder {
      height: 600px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .map-content {
      text-align: center;
      padding: 40px;
    }

    .map-icon {
      font-size: 64px;
      margin-bottom: 16px;
      opacity: 0.5;
      font-weight: bold;
    }

    .map-content h4 {
      font-size: 24px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }

    .map-content p {
      color: var(--text-secondary);
      margin: 0 0 24px 0;
    }

    .map-features {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
    }

    .feature {
      background: var(--card-background);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      color: var(--text-primary);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .delivery-sidebar {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .delivery-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .stat-item {
      background: var(--card-background);
      padding: 20px;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 24px;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 14px;
      color: var(--text-secondary);
    }

    .delivery-list {
      padding: 0;
      overflow: hidden;
    }

    .delivery-list h3 {
      margin: 0;
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-color);
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .delivery-items {
      max-height: 500px;
      overflow-y: auto;
    }

    .delivery-item {
      padding: 20px 24px;
      border-bottom: 1px solid rgba(178, 190, 195, 0.1);
      transition: background 0.2s ease;
    }

    .delivery-item:hover {
      background: rgba(78, 90, 177, 0.02);
    }

    .delivery-item:last-child {
      border-bottom: none;
    }

    .delivery-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .delivery-id {
      font-weight: 600;
      color: var(--text-primary);
    }

    .delivery-info {
      margin-bottom: 16px;
    }

    .delivery-info h4 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .driver-info {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      font-size: 14px;
      color: var(--text-secondary);
    }

    .driver-icon {
      font-size: 16px;
      font-weight: bold;
    }

    .delivery-route {
      margin-bottom: 16px;
    }

    .route-point {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .route-icon {
      font-size: 14px;
      font-weight: bold;
    }

    .route-text {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.3;
    }

    .route-line {
      width: 2px;
      height: 16px;
      background: var(--border-color);
      margin: 0 0 8px 7px;
    }

    .delivery-time {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      padding: 8px 12px;
      background: rgba(93, 156, 236, 0.1);
      border-radius: 6px;
    }

    .time-icon {
      font-size: 14px;
      font-weight: bold;
    }

    .time-text {
      font-size: 13px;
      color: var(--accent-color);
      font-weight: 500;
    }

    .delivery-actions {
      display: flex;
      gap: 8px;
    }

    .delivery-actions .btn {
      flex: 1;
      justify-content: center;
    }

    @media (max-width: 1024px) {
      .tracking-layout {
        grid-template-columns: 1fr;
      }
      
      .delivery-sidebar {
        order: -1;
      }
    }

    @media (max-width: 768px) {
      .page-header h1 {
        font-size: 24px;
      }

      .map-placeholder {
        height: 400px;
      }

      .delivery-stats {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DeliveryTrackingComponent implements OnInit {
  deliveries: Delivery[] = [];
  loading = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDeliveries();
  }

  private loadDeliveries() {
    this.loading = true;
    this.dashboardService.getDeliveries().subscribe({
      next: (deliveries) => {
        this.deliveries = deliveries;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading deliveries:', error);
        this.loading = false;
      }
    });
  }

  get activeDeliveries() {
    return this.deliveries.filter(d => d.status === 'in-transit').length;
  }

  get completedToday() {
    // Mock data - in real app, this would filter by today's date
    return 12;
  }

  formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}