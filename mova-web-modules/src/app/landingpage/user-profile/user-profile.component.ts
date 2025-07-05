import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="user-profile-container">
      <div class="user-profile-card">
        <h2 class="user-profile-title">Bem-vindo(a), Usuário!</h2>
        <p class="user-profile-subtitle">Esta é a sua página de perfil.</p>

        <div class="profile-details">
          <p><strong>Nome:</strong> Nome do Usuário</p>
          <p><strong>Email:</strong> usuario &#64;example.com</p>
          <p><strong>Status:</strong> Ativo</p>
        </div>

        <button class="btn btn-primary">Editar Perfil</button>
        <button class="btn btn-secondary">Sair</button>
      </div>
    </section>
  `,
  styles: [`
    .user-profile-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: var(--bg-primary);
      padding: 20px;
    }

    .user-profile-card {
      background: var(--bg-card);
      border-radius: 12px;
      padding: 3rem;
      border: 1px solid var(--border-color);
      box-shadow: 0 10px 30px var(--shadow);
      width: 100%;
      max-width: 600px;
      text-align: center;
    }

    .user-profile-title {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .user-profile-subtitle {
      font-size: 1.2rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .profile-details {
      text-align: left;
      margin-bottom: 2rem;
      font-size: 1.1rem;
      color: var(--text-primary);
    }

    .profile-details p {
      margin-bottom: 0.8rem;
    }

    .profile-details strong {
      color: #3A80F7;
    }

    .btn {
      margin: 0 10px;
    }

    @media (max-width: 768px) {
      .user-profile-card {
        padding: 2rem;
      }

      .user-profile-title {
        font-size: 2rem;
      }

      .user-profile-subtitle {
        font-size: 1rem;
      }

      .profile-details {
        font-size: 1rem;
      }
    }
  `]
})
export class UserProfileComponent { }
