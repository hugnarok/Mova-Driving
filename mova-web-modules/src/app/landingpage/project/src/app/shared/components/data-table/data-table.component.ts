import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'status' | 'action';
  sortable?: boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="table-container card">
      <div class="table-header" *ngIf="title">
        <h3>{{ title }}</h3>
        <div class="table-actions">
          <button class="btn btn-primary" *ngIf="showAddButton" (click)="onAdd()">
            <mat-icon>add</mat-icon>
            Add {{ entityName }}
          </button>
        </div>
      </div>
      
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th *ngFor="let column of columns" 
                  [class.sortable]="column.sortable"
                  (click)="column.sortable && onSort(column.key)">
                {{ column.label }}
                <mat-icon class="sort-icon" *ngIf="column.sortable && sortField === column.key">
                  {{ sortDirection === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
                </mat-icon>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of data" (click)="onRowClick(item)">
              <td *ngFor="let column of columns" [ngClass]="getCellClass(column.type, item[column.key])">
                <ng-container [ngSwitch]="column.type">
                  <span *ngSwitchCase="'status'" 
                        class="status-badge" 
                        [ngClass]="'status-' + item[column.key]">
                    {{ item[column.key] }}
                  </span>
                  <span *ngSwitchCase="'date'">
                    {{ formatDate(item[column.key]) }}
                  </span>
                  <span *ngSwitchCase="'number'">
                    {{ formatNumber(item[column.key]) }}
                  </span>
                  <span *ngSwitchDefault>
                    {{ item[column.key] }}
                  </span>
                </ng-container>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="table-footer" *ngIf="showPagination">
        <div class="pagination-info">
          Showing {{ ((currentPage - 1) * pageSize) + 1 }} to 
          {{ Math.min(currentPage * pageSize, totalItems) }} of {{ totalItems }} entries
        </div>
        <div class="pagination-controls">
          <button 
            class="btn btn-outline" 
            [disabled]="currentPage === 1"
            (click)="onPageChange(currentPage - 1)">
            <mat-icon>chevron_left</mat-icon>
            Previous
          </button>
          <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
          <button 
            class="btn btn-outline" 
            [disabled]="currentPage === totalPages"
            (click)="onPageChange(currentPage + 1)">
            Next
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .table-container {
      overflow: hidden;
    }

    .table-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid rgba(178, 190, 195, 0.2);
    }

    .table-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .table-actions {
      display: flex;
      gap: 12px;
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
    }

    .table th {
      padding: 16px 24px;
      text-align: left;
      font-weight: 600;
      font-size: 14px;
      color: var(--text-primary);
      background: rgba(78, 90, 177, 0.05);
      border-bottom: 1px solid rgba(178, 190, 195, 0.2);
    }

    .table th.sortable {
      cursor: pointer;
      user-select: none;
      transition: background 0.2s ease;
    }

    .table th.sortable:hover {
      background: rgba(78, 90, 177, 0.1);
    }

    .sort-icon {
      margin-left: 8px;
      color: var(--primary-color);
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .table td {
      padding: 16px 24px;
      border-bottom: 1px solid rgba(178, 190, 195, 0.1);
      font-size: 14px;
    }

    .table tr:hover {
      background: rgba(78, 90, 177, 0.02);
      cursor: pointer;
    }

    .table tr:last-child td {
      border-bottom: none;
    }

    .table-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      background: rgba(78, 90, 177, 0.02);
      border-top: 1px solid rgba(178, 190, 195, 0.2);
    }

    .pagination-info {
      font-size: 14px;
      color: var(--text-secondary);
    }

    .pagination-controls {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .page-info {
      font-size: 14px;
      color: var(--text-secondary);
    }

    @media (max-width: 768px) {
      .table-header {
        padding: 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .table th,
      .table td {
        padding: 12px 16px;
      }

      .table-footer {
        padding: 16px;
        flex-direction: column;
        gap: 16px;
      }

      .pagination-controls {
        width: 100%;
        justify-content: space-between;
      }
    }
  `]
})
export class DataTableComponent {
  @Input() title = '';
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() showAddButton = false;
  @Input() entityName = 'Item';
  @Input() showPagination = true;
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;
  
  @Output() add = new EventEmitter<void>();
  @Output() rowClick = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() sort = new EventEmitter<{field: string, direction: string}>();

  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  Math = Math;

  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onAdd() {
    this.add.emit();
  }

  onRowClick(item: any) {
    this.rowClick.emit(item);
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  onSort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sort.emit({ field: this.sortField, direction: this.sortDirection });
  }

  getCellClass(type: string | undefined, value: any): string {
    if (type === 'status') {
      return `status-${value}`;
    }
    return '';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }
}