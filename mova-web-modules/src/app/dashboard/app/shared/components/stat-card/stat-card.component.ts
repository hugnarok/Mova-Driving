import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="stat-card card">
      <div class="stat-icon" *ngIf="icon">
        <mat-icon>{{ icon }}</mat-icon>
      </div>
      <div class="stat-content">
        <h3 class="stat-value">{{ value | number }}</h3>
        <p class="stat-label">{{ label }}</p>
        <div class="stat-trend" [class]="trendClass">
          <mat-icon class="trend-icon">{{ trendIcon }}</mat-icon>
          <span class="trend-value">{{ Math.abs(trend) }}%</span>
          <span class="trend-period">vs last month</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: transform 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-icon mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
      color: white;
    }

    .stat-content {
      flex: 1;
    }

    .stat-value {
      font-size: 32px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .stat-label {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0 0 8px 0;
    }

    .stat-trend {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
    }

    .stat-trend.positive {
      color: var(--success-color);
    }

    .stat-trend.negative {
      color: var(--danger-color);
    }

    .trend-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .trend-value {
      font-weight: 600;
    }

    .trend-period {
      color: var(--text-muted);
    }

    @media (max-width: 768px) {
      .stat-card {
        padding: 16px;
        gap: 16px;
      }

      .stat-icon {
        width: 48px;
        height: 48px;
      }

      .stat-icon mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      .stat-value {
        font-size: 24px;
      }
    }
  `]
})
export class StatCardComponent {
  @Input() icon = '';
  @Input() value = 0;
  @Input() label = '';
  @Input() trend = 0;

  Math = Math;

  get trendClass() {
    return this.trend >= 0 ? 'positive' : 'negative';
  }

  get trendIcon() {
    return this.trend >= 0 ? 'trending_up' : 'trending_down';
  }
}