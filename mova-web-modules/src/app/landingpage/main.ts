import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { HomeComponent } from './home/home.component'; // Import the new HomeComponent

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  //{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  // Add other routes here if needed
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, // Import RouterModule for routing to work
  ],
  template: `
    <div class="app">
      <router-outlet></router-outlet> <!-- This is where routed components will be displayed -->
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
    }
  `]
})
export class App {
  name = 'MOVA';
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // Provide HttpClient for services
  ]
});