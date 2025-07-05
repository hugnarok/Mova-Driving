import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  template: `
    <section class="login-container">
      <div class="login-card">
        <h2 class="login-title">Bem-vindo de volta!</h2>
        <p class="login-subtitle">Faça login para acessar sua conta.</p>

        <form (ngSubmit)="login()">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" [(ngModel)]="email" required autocomplete="off">
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <input type="password" id="password" name="password" [(ngModel)]="password" required autocomplete="off">
          </div>
          <button type="submit" class="btn btn-primary btn-full-width">Entrar</button>
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

        <div class="login-footer">
          <a href="#" class="forgot-password">Esqueceu a senha? </a>
          <span> Não tem uma conta? <br><a href="/register" class="register-link"><br> Cadastre-se </a></span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
    }

    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #0A0C16; /* Fundo mais escuro para contraste */
      padding: 20px;
      box-sizing: border-box;
    }

    .login-card {
      background: var(--bg-card); /* Usar variável para o fundo do card */
      border-radius: 16px; /* Bordas mais arredondadas */
      padding: 3.5rem; /* Mais padding */
      border: 1px solid rgba(255, 255, 255, 0.1); /* Borda sutil */
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2); /* Sombra mais elegante */
      width: 100%;
      max-width: 480px; /* Aumentar um pouco a largura máxima */
      text-align: center;
      backdrop-filter: blur(5px); /* Efeito de desfoque no fundo do card */
      -webkit-backdrop-filter: blur(5px);
    }

    .login-title {
      font-family: 'Poppins', sans-serif;
      font-size: 2.2rem; /* Título um pouco maior */
      margin-bottom: 0.75rem;
      color: var(--text-primary);
      font-weight: 700;
    }

    .login-subtitle {
      font-size: 1.05rem;
      color: var(--text-secondary);
      margin-bottom: 2.5rem; /* Mais espaçamento */
      line-height: 1.5;
    }

    .form-group {
      margin-bottom: 1.75rem; /* Mais espaçamento entre grupos */
      text-align: left;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.6rem; /* Espaçamento da label para o input */
      color: var(--text-primary);
      font-weight: 600;
      font-size: 0.95rem;
    }

    .form-group input {
      width: 100%;
      padding: 14px 18px; /* Mais padding nos inputs */
      border: 1px solid rgba(255, 255, 255, 0.15); /* Borda mais visível */
      border-radius: 10px; /* Bordas mais arredondadas */
      background-color: rgba(255, 255, 255, 0.05); /* Fundo do input mais sutil */
      color: var(--text-primary);
      font-size: 1rem;
      transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    }

    .form-group input:focus {
      border-color: #3A80F7; /* Cor de foco vibrante */
      outline: none;
      background-color: rgba(255, 255, 255, 0.08); /* Fundo levemente mais claro no foco */
      box-shadow: 0 0 0 4px rgba(58, 128, 247, 0.3); /* Sombra de foco mais suave */
    }

    .btn-full-width {
      width: 100%;
      padding: 16px 24px; /* Mais padding no botão principal */
      font-size: 1.15rem; /* Fonte um pouco maior */
      margin-top: 1.5rem; /* Mais espaçamento */
      border-radius: 10px; /* Bordas arredondadas */
      font-weight: 700;
      background-color: #3A80F7; /* Cor primária */
      color: white;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .btn-full-width:hover {
      background-color: #2563eb; /* Tom mais escuro no hover */
      transform: translateY(-2px); /* Efeito de "levantar" */
    }

    .social-login {
      margin-top: 2rem; /* Mais espaçamento */
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem; /* Mais espaçamento entre botões sociais */
    }

    .btn-google, .btn-apple {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 14px 24px; /* Padding consistente */
      border-radius: 10px; /* Bordas arredondadas */
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
    }

    .btn-google {
      background-color: #FFFFFF;
      color: #1A1A1A; /* Cor de texto mais escura para contraste */
      border: 1px solid #E0E0E0;
    }

    .btn-google:hover {
      background-color: #F0F0F0;
      border-color: #3A80F7;
      transform: translateY(-2px);
    }

    .btn-apple {
      background-color: #1A1A1A; /* Fundo escuro para Apple */
      color: #FFFFFF;
      border: 1px solid #333333;
    }

    .btn-apple:hover {
      background-color: #333333;
      border-color: #666666;
      transform: translateY(-2px);
    }

    .social-login svg {
      margin-right: 10px; /* Espaçamento do ícone */
    }

    .login-footer {
      margin-top: 2.5rem; /* Mais espaçamento */
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .login-footer a {
      color: #3A80F7;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .login-footer a:hover {
      color: #2563eb;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .login-card {
        padding: 2.5rem;
      }

      .login-title {
        font-size: 1.9rem;
      }

      .login-subtitle {
        font-size: 0.95rem;
      }

      .btn-full-width {
        font-size: 1.05rem;
        padding: 14px 20px;
      }

      .social-login {
        gap: 1rem;
      }

      .btn-google, .btn-apple {
        padding: 12px 20px;
      }
    }

    @media (max-width: 480px) {
      .login-card {
        padding: 2rem;
      }

      .login-title {
        font-size: 1.7rem;
      }

      .login-subtitle {
        font-size: 0.9rem;
      }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor() { }

  login() {
    // Implement your login logic here
    console.log('Login attempt with:', this.email, this.password);
    alert('Login clicado! Email: ' + this.email + ', Senha: ' + this.password);
    // You would typically call an authentication service here
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
