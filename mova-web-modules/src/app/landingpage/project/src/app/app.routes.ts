import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DeliveryTrackingComponent } from './pages/delivery-tracking/delivery-tracking.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'drivers', component: DriversComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'tracking', component: DeliveryTrackingComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: '**', redirectTo: '/dashboard' }
];