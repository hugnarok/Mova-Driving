import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="register-container">
      <div class="register-card">
        <h2 class="register-title">Crie sua conta MOVA</h2>
        <p class="register-subtitle">Preencha os dados abaixo para se cadastrar.</p>

        <form (ngSubmit)="register()">
          <div class="form-group">
            <label for="name">Nome Completo</label>
            <input type="text" id="name" name="name" [(ngModel)]="name" required autocomplete="off">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" [(ngModel)]="email" required autocomplete="off">
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <input type="password" id="password" name="password" [(ngModel)]="password" required autocomplete="off">
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirmar Senha</label>
            <input type="password" id="confirmPassword" autocomplete="off" name="confirmPassword" [(ngModel)]="confirmPassword" required>
          </div>
          <button type="submit" class="btn btn-primary btn-full-width">Cadastrar</button>
        </form>

        <div class="social-login">
          <button class="btn btn-google" (click)="loginWithGoogle()">
            <svg viewBox="0 0 48 48" width="20px" height="20px" style="margin-right: 8px;">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.6-6.44C38.14 2.54 32.6 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-.83-.07-1.65-.2-2.46H24v4.61h12.48c-.56 2.92-2.28 5.34-4.78 6.9l7.66 5.93c4.5-4.4 7.12-10.84 7.12-18.08z"/>
              <path fill="#FBBC04" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 17.21 0 20.58 0 24c0 3.42.92 6.79 2.56 9.59L10.53 28.59z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.66-5.93c-2.5 1.64-4.78 2.92-7.66 2.92-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continuar com Google
          </button>
          <button class="btn btn-apple" (click)="loginWithApple()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20px" height="20px" style="margin-right: 8px;">
              <path fill="currentColor" d="M13.07 8.72c-.08-.6-.48-1.1-.98-1.4-.5-.3-1.1-.4-1.7-.3-.6.1-1.1.4-1.4.9-.3.5-.4 1.1-.3 1.7.1.6.4 1.1.9 1.4.5.3 1.1.4 1.7.3.6-.1 1.1-.4 1.4-.9.3-.5.4-1.1.3-1.7zm-2.4-6.4c.4-.5.6-1.1.6-1.7 0-.6-.2-1.2-.6-1.7-.4-.5-.9-.8-1.5-.8-.6 0-1.2.3-1.6.8-.4.5-.6 1.1-.6 1.7 0 .6.2 1.2.6 1.7.4.5.9.8 1.5.8.6 0 1.2-.3 1.6-.8zM8 16c-2.2 0-4.1-1.2-5.1-3.1-.9-1.9-.8-4.1.3-5.9 1.1-1.8 2.9-2.9 4.9-2.9 2 0 3.8 1.1 4.9 2.9 1.1 1.8 1.2 4.1.3 5.9-1 1.9-2.9 3.1-5.1 3.1z"/>
            </svg>
            Continuar com Apple
          </button>
        </div>

        <div class="register-footer">
          <span>Já tem uma conta? <a routerLink="/login" href="/login" class="login-link">Faça login</a></span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #0A0C16; /* Um tom mais escuro para o fundo */
      padding: 20px;
    }

    .register-card {
      background: var(--bg-card);
      border-radius: 12px;
      padding: 3rem;
      border: 1px solid var(--border-color);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); /* Sombra mais pronunciada */
      width: 100%;
      max-width: 450px;
      text-align: center;
    }

    .register-title {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .register-subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
      text-align: left;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
      font-weight: 600;
    }

    .form-group input {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background-color: var(--bg-secondary);
      color: #333333; /* Explicitly dark color */
      font-size: 1rem;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .form-group input:focus {
      border-color: #3A80F7;
      outline: none;
      box-shadow: 0 0 0 3px rgba(58, 128, 247, 0.2);
    }

    .btn-full-width {
      width: 100%;
      padding: 14px 24px;
      font-size: 1.1rem;
      margin-top: 1rem;
    }

    .social-login {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem; /* Adicionado para espaçamento */
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .btn-google {
      background-color: white;
      color: #333; /* Cor do texto para contraste */
      border: 1px solid var(--border-color); /* Adiciona borda para visibilidade */
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .btn-google:hover {
      background-color: #e0e0e0; /* Cinza um pouco mais escuro para o hover */
      border-color: #3A80F7;
    }

    .btn-apple {
      background-color: var(--text-primary); /* Use theme variable for background */
      color: var(--bg-primary); /* Use theme variable for text color */
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-apple:hover {
      background-color: var(--text-secondary); /* Adjust hover for theme */
    }

    .login-footer {
      margin-top: 2rem;
      font-size: 0.9rem;
      color: #666666 !important; /* Explicitly dark color */
    }

    .register-footer a {
      color: #3A80F7;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .register-footer a:hover {
      color: #2563eb;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .register-card {
        padding: 2rem;
      }

      .register-title {
        font-size: 1.75rem;
      }

      .btn-full-width {
        font-size: 1rem;
        padding: 12px 20px;
      }
    }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor() { }

  register() {
    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Register attempt with:', this.name, this.email, this.password);
    alert('Cadastro clicado! Nome: ' + this.name + ', Email: ' + this.email);
    // Implement your registration logic here
  }

  loginWithGoogle() {
    console.log('Login with Google clicked');
    alert('Login com Google clicado!');
    // Implement Google login logic here
  }

  loginWithApple() {
    console.log('Login with Apple clicked');
    alert('Login com Apple clicado!');
    // Implement Apple login logic here
  }
}
