import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  DashboardStats,
  Driver,
  Client,
  Order,
  Delivery,
  Notification,
  PaymentReport,
  RevenueData
} from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  // Mock API call simulation
  private simulateApiCall<T>(data: T, delayMs: number = 1000): Observable<T> {
    this.loadingSubject.next(true);
    return of(data).pipe(
      delay(delayMs),
      // Complete loading after delay
      // Note: In real app, this would be in the component's subscription
    );
  }

  getDashboardStats(): Observable<DashboardStats> {
    const stats: DashboardStats = {
      totalDeliveries: 1247,
      activeDrivers: 23,
      pendingOrders: 87,
      revenue: 45280,
      deliveryTrend: 12.5,
      driverTrend: -2.3,
      orderTrend: 8.7,
      revenueTrend: 15.2
    };
    return this.simulateApiCall(stats, 800);
  }

  getDrivers(): Observable<Driver[]> {
    const drivers: Driver[] = [
      {
        id: '1',
        name: 'John Mitchell',
        email: 'john.mitchell@email.com',
        phone: '+1 234 567 8901',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        status: 'online',
        location: 'Downtown District',
        deliveriesCompleted: 234,
        rating: 4.8,
        vehicle: 'Ford Transit',
        licenseNumber: 'DL-2023-001',
        joinedDate: '2023-01-15'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 234 567 8902',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        status: 'busy',
        location: 'Airport Route',
        deliveriesCompleted: 189,
        rating: 4.9,
        vehicle: 'Mercedes Sprinter',
        licenseNumber: 'DL-2023-002',
        joinedDate: '2023-02-20'
      },
      {
        id: '3',
        name: 'Michael Brown',
        email: 'michael.brown@email.com',
        phone: '+1 234 567 8903',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        status: 'offline',
        location: 'Industrial Zone',
        deliveriesCompleted: 156,
        rating: 4.6,
        vehicle: 'Isuzu NPR',
        licenseNumber: 'DL-2023-003',
        joinedDate: '2023-03-10'
      },
      {
        id: '4',
        name: 'Emma Davis',
        email: 'emma.davis@email.com',
        phone: '+1 234 567 8904',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        status: 'online',
        location: 'Residential Area',
        deliveriesCompleted: 201,
        rating: 4.7,
        vehicle: 'Nissan NV200',
        licenseNumber: 'DL-2023-004',
        joinedDate: '2023-01-28'
      }
    ];
    return this.simulateApiCall(drivers, 600);
  }

  getClients(): Observable<Client[]> {
    const clients: Client[] = [
      {
        id: '1',
        name: 'TechCorp Solutions',
        email: 'orders@techcorp.com',
        phone: '+1 555 123 4567',
        company: 'TechCorp Solutions Ltd.',
        address: '123 Business Ave, Tech District',
        totalOrders: 45,
        totalSpent: 12450,
        lastOrderDate: '2024-01-15',
        status: 'active'
      },
      {
        id: '2',
        name: 'Global Retail Inc',
        email: 'logistics@globalretail.com',
        phone: '+1 555 234 5678',
        company: 'Global Retail Inc.',
        address: '456 Commerce St, Shopping Center',
        totalOrders: 78,
        totalSpent: 23890,
        lastOrderDate: '2024-01-14',
        status: 'active'
      },
      {
        id: '3',
        name: 'StartUp Dynamics',
        email: 'shipping@startupdyn.com',
        phone: '+1 555 345 6789',
        company: 'StartUp Dynamics LLC',
        address: '789 Innovation Blvd, Startup Hub',
        totalOrders: 23,
        totalSpent: 5670,
        lastOrderDate: '2024-01-10',
        status: 'active'
      }
    ];
    return this.simulateApiCall(clients, 700);
  }

  getOrders(): Observable<Order[]> {
    const orders: Order[] = [
      {
        id: 'ORD-001',
        clientName: 'TechCorp Solutions',
        clientId: '1',
        driverId: '1',
        driverName: 'John Mitchell',
        pickupAddress: '123 Business Ave, Tech District',
        deliveryAddress: '789 Client Street, Downtown',
        status: 'in-transit',
        orderDate: '2024-01-15T10:30:00Z',
        deliveryDate: '2024-01-15T15:45:00Z',
        amount: 285.50,
        priority: 'high',
        items: [
          { name: 'Electronics Package', quantity: 3, weight: 12.5 },
          { name: 'Documentation', quantity: 1, weight: 0.5 }
        ]
      },
      {
        id: 'ORD-002',
        clientName: 'Global Retail Inc',
        clientId: '2',
        pickupAddress: '456 Commerce St, Shopping Center',
        deliveryAddress: '321 Residential Ave, Suburbs',
        status: 'pending',
        orderDate: '2024-01-15T09:15:00Z',
        amount: 150.75,
        priority: 'medium',
        items: [
          { name: 'Retail Goods', quantity: 5, weight: 8.2 }
        ]
      }
    ];
    return this.simulateApiCall(orders, 650);
  }

  getDeliveries(): Observable<Delivery[]> {
    const deliveries: Delivery[] = [
      {
        id: 'DEL-001',
        orderId: 'ORD-001',
        driverId: '1',
        driverName: 'John Mitchell',
        clientName: 'TechCorp Solutions',
        status: 'in-transit',
        startTime: '2024-01-15T14:30:00Z',
        currentLocation: { lat: 40.7128, lng: -74.0060 },
        route: {
          pickup: '123 Business Ave, Tech District',
          delivery: '789 Client Street, Downtown'
        },
        estimatedArrival: '2024-01-15T15:45:00Z'
      }
    ];
    return this.simulateApiCall(deliveries, 900);
  }

  getNotifications(): Observable<Notification[]> {
    const notifications: Notification[] = [
      {
        id: '1',
        type: 'warning',
        title: 'Delivery Delay',
        message: 'Order ORD-003 is running 15 minutes behind schedule due to traffic.',
        timestamp: '2024-01-15T14:20:00Z',
        read: false,
        actionUrl: '/tracking'
      },
      {
        id: '2',
        type: 'success',
        title: 'Delivery Completed',
        message: 'Order ORD-002 has been successfully delivered to Global Retail Inc.',
        timestamp: '2024-01-15T13:45:00Z',
        read: false
      },
      {
        id: '3',
        type: 'info',
        title: 'New Driver Online',
        message: 'Emma Davis has come online and is available for deliveries.',
        timestamp: '2024-01-15T13:30:00Z',
        read: true
      },
      {
        id: '4',
        type: 'error',
        title: 'Payment Failed',
        message: 'Payment for order ORD-001 has failed. Please contact the client.',
        timestamp: '2024-01-15T12:15:00Z',
        read: false,
        actionUrl: '/payments'
      }
    ];
    return this.simulateApiCall(notifications, 400);
  }

  getPaymentReports(): Observable<PaymentReport[]> {
    const payments: PaymentReport[] = [
      {
        id: 'PAY-001',
        orderId: 'ORD-001',
        clientName: 'TechCorp Solutions',
        amount: 285.50,
        status: 'paid',
        paymentDate: '2024-01-15T12:00:00Z',
        dueDate: '2024-01-20T23:59:59Z',
        paymentMethod: 'Credit Card'
      },
      {
        id: 'PAY-002',
        orderId: 'ORD-002',
        clientName: 'Global Retail Inc',
        amount: 150.75,
        status: 'pending',
        paymentDate: '',
        dueDate: '2024-01-22T23:59:59Z',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: 'PAY-003',
        orderId: 'ORD-003',
        clientName: 'StartUp Dynamics',
        amount: 320.00,
        status: 'overdue',
        paymentDate: '',
        dueDate: '2024-01-12T23:59:59Z',
        paymentMethod: 'Invoice'
      }
    ];
    return this.simulateApiCall(payments, 750);
  }

  getRevenueData(): Observable<RevenueData[]> {
    const revenueData: RevenueData[] = [
      { month: 'Jul', revenue: 35200, orders: 156 },
      { month: 'Aug', revenue: 38900, orders: 174 },
      { month: 'Sep', revenue: 42100, orders: 189 },
      { month: 'Oct', revenue: 39800, orders: 167 },
      { month: 'Nov', revenue: 44500, orders: 198 },
      { month: 'Dec', revenue: 47300, orders: 212 },
      { month: 'Jan', revenue: 45280, orders: 203 }
    ];
    return this.simulateApiCall(revenueData, 550);
  }

  // Simulate API endpoints that would connect to Laravel backend
  // TODO: Replace with actual HTTP calls to Laravel API
  private getApiEndpoint(path: string): string {
    // This would be your Laravel API base URL
    const baseUrl = 'https://your-laravel-api.com/api';
    return `${baseUrl}${path}`;
  }

  markNotificationAsRead(notificationId: string): Observable<boolean> {
    // TODO: Implement actual API call
    // return this.http.patch(`${this.getApiEndpoint('/notifications')}/${notificationId}`, { read: true });
    return this.simulateApiCall(true, 300);
  }

  updateDriverStatus(driverId: string, status: string): Observable<boolean> {
    // TODO: Implement actual API call
    // return this.http.patch(`${this.getApiEndpoint('/drivers')}/${driverId}`, { status });
    return this.simulateApiCall(true, 400);
  }
}