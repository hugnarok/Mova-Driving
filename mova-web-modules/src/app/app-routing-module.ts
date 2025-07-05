import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './landingpage/home/home.component';
import { NewHomeComponent } from './components/home/home.component';
import { LoginComponent } from './landingpage/login/login.component';
import { RegisterComponent } from './landingpage/register/register.component';
import { UserProfileComponent } from './landingpage/user-profile/user-profile.component';

// Dashboard Components
import { DashboardLayoutComponent } from './dashboard/app/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './dashboard/app/pages/dashboard/dashboard.component';
import { DriversComponent } from './dashboard/app/pages/drivers/drivers.component';
import { ClientsComponent } from './dashboard/app/pages/clients/clients.component';
import { OrdersComponent } from './dashboard/app/pages/orders/orders.component';
import { DeliveryTrackingComponent } from './dashboard/app/pages/delivery-tracking/delivery-tracking.component';
import { PaymentsComponent } from './dashboard/app/pages/payments/payments.component';
import { NotificationsComponent } from './dashboard/app/pages/notifications/notifications.component';
import { UserManagementComponent } from './dashboard/app/pages/user-management/user-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: NewHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  {
    path: 'admin',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'drivers', component: DriversComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'tracking', component: DeliveryTrackingComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'users', component: UserManagementComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
