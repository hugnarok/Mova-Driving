import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Driver {
  id: number;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  vehicleType: string;
}

interface FreightCalculation {
  origin: string;
  destination: string;
  distance: number;
  estimatedTime: string;
  price: number;
}

@Component({
  selector: 'app-new-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="home-container">
      <!-- Header -->
      <header class="header">
        <div class="container">
          <div class="logo">
            <h1>Mova</h1>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <div class="container">
          <!-- Hero Section -->
          <div class="hero-section">
            <h2 class="hero-title">Para onde vamos?</h2>
            <p class="hero-subtitle">Conectamos você aos melhores motoristas da região</p>
          </div>

          <div class="content-grid">
            <!-- Left Panel -->
            <div class="left-panel">
              <!-- Quick Actions -->
              <div class="quick-actions">
                <button class="quick-action-btn ride" (click)="requestRide()">
                  <div class="action-icon">
                    <span class="material-icons">directions_car</span>
                  </div>
                  <span>Viagem</span>
                </button>
                <button class="quick-action-btn delivery" (click)="requestDelivery()">
                  <div class="action-icon">
                    <span class="material-icons">local_shipping</span>
                  </div>
                  <span>Entrega</span>
                </button>
              </div>

              <!-- Freight Calculator -->
              <div class="freight-calculator">
                <h3>
                  <span class="material-icons">calculate</span>
                  Calcular frete
                </h3>
                <div class="location-inputs">
                  <div class="input-wrapper">
                    <div class="location-dot origin">
                      <span class="material-icons">my_location</span>
                    </div>
                    <input 
                      type="text" 
                      placeholder="De onde?" 
                      [(ngModel)]="freightData.origin"
                      class="location-input"
                    />
                  </div>
                  <div class="input-wrapper">
                    <div class="location-dot destination">
                      <span class="material-icons">place</span>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Para onde?" 
                      [(ngModel)]="freightData.destination"
                      class="location-input"
                    />
                  </div>
                </div>
                <button class="calculate-btn" (click)="calculateFreight()">
                  <span class="material-icons">calculate</span>
                  Calcular frete
                </button>
                
                <div class="freight-result" *ngIf="freightResult">
                  <div class="result-summary">
                    <div class="result-main">
                      <div class="price-section">
                        <span class="material-icons">attach_money</span>
                        <span class="price">R$ {{ freightResult.price.toFixed(2) }}</span>
                      </div>
                      <div class="time-section">
                        <span class="material-icons">schedule</span>
                        <span class="time">{{ freightResult.estimatedTime }}</span>
                      </div>
                    </div>
                    <div class="result-details">
                      <span class="material-icons">straighten</span>
                      <span class="distance">{{ freightResult.distance }} km</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Driver CTA -->
              <div class="driver-cta">
                <div class="cta-content">
                  <div class="cta-icon">
                    <span class="material-icons">person_add</span>
                  </div>
                  <div class="cta-text">
                    <h4>Seja um motorista parceiro</h4>
                    <p>Tenha mais liberdade e renda</p>
                  </div>
                </div>
                <button class="cta-btn" (click)="registerDriver()">
                  <span class="material-icons">app_registration</span>
                  Cadastrar
                </button>
              </div>
            </div>

            <!-- Right Panel - Map -->
            <div class="right-panel">
              <div class="map-container">
                <div class="map-header">
                  <div class="map-title">
                    <h4>
                      <span class="material-icons">map</span>
                      Motoristas próximos
                    </h4>
                    <span class="online-indicator">
                      <span class="status-dot"></span>
                      {{ drivers.length }} online
                    </span>
                  </div>
                </div>
                <div class="mock-map">
                  <div 
                    class="driver-marker" 
                    *ngFor="let driver of drivers"
                    [style.left.%]="driver.lat"
                    [style.top.%]="driver.lng"
                    [title]="driver.name + ' - ' + driver.rating + '⭐'"
                  >
                    <div class="marker-icon" [class]="'vehicle-' + driver.vehicleType">
                      <span class="material-icons">{{ getVehicleIcon(driver.vehicleType) }}</span>
                    </div>
                    <div class="marker-info">
                      <div class="driver-name">
                        <span class="material-icons">person</span>
                        {{ driver.name }}
                      </div>
                      <div class="driver-rating">
                        <span class="material-icons">star</span>
                        {{ driver.rating }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class NewHomeComponent implements OnInit {
  drivers: Driver[] = [];
  freightData = {
    origin: '',
    destination: ''
  };
  freightResult: FreightCalculation | null = null;

  ngOnInit() {
    this.loadMockDrivers();
  }

  loadMockDrivers() {
    this.drivers = [
      { id: 1, name: 'João Silva', lat: 20, lng: 15, rating: 4.8, vehicleType: 'car' },
      { id: 2, name: 'Maria Santos', lat: 60, lng: 30, rating: 4.9, vehicleType: 'motorcycle' },
      { id: 3, name: 'Pedro Lima', lat: 80, lng: 70, rating: 4.7, vehicleType: 'truck' },
      { id: 4, name: 'Ana Costa', lat: 40, lng: 80, rating: 4.6, vehicleType: 'car' },
      { id: 5, name: 'Carlos Oliveira', lat: 70, lng: 20, rating: 4.8, vehicleType: 'motorcycle' },
      { id: 6, name: 'Lucia Ferreira', lat: 30, lng: 60, rating: 4.9, vehicleType: 'car' }
    ];
  }

  getVehicleIcon(vehicleType: string): string {
    const icons = {
      'car': 'directions_car',
      'motorcycle': 'two_wheeler',
      'truck': 'local_shipping'
    };
    return icons[vehicleType as keyof typeof icons] || 'directions_car';
  }

  requestRide() {
    console.log('Solicitando viagem...');
    // Aqui você pode integrar com o serviço de viagens do seu projeto
    alert('Funcionalidade em desenvolvimento! Você será redirecionado para solicitar uma viagem.');
  }

  requestDelivery() {
    console.log('Solicitando envio...');
    // Aqui você pode integrar com o serviço de entregas do seu projeto
    alert('Funcionalidade em desenvolvimento! Você será redirecionado para solicitar um envio.');
  }

  calculateFreight() {
    if (!this.freightData.origin || !this.freightData.destination) {
      alert('Por favor, preencha origem e destino');
      return;
    }

    console.log('Calculando frete...', this.freightData);
    
    // Mock calculation - substitua pela lógica real do seu projeto
    const distance = Math.floor(Math.random() * 50) + 5;
    const timeInMinutes = Math.floor(distance * 2.5);
    const price = distance * 2.5 + Math.random() * 10;

    this.freightResult = {
      origin: this.freightData.origin,
      destination: this.freightData.destination,
      distance: distance,
      estimatedTime: `${timeInMinutes} min`,
      price: price
    };

    console.log('Resultado do frete:', this.freightResult);
  }

  registerDriver() {
    console.log('Redirecionando para cadastro de motorista...');
    // Aqui você pode integrar com o sistema de cadastro de motoristas
    alert('Funcionalidade em desenvolvimento! Você será redirecionado para o cadastro de motoristas.');
  }
}
