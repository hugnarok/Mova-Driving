import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-management-container">
      <div class="page-header">
        <h1>Gerenciamento de Usuários</h1>
        <div class="page-actions">
          <button class="btn btn-primary" (click)="openAddUserForm()">Adicionar Usuário</button>
        </div>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Função</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td class="action-buttons">
                <button class="btn btn-sm btn-info" (click)="editUser(user)">Editar</button>
                <button class="btn btn-sm btn-danger" (click)="deleteUser(user.id)">Deletar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="showUserForm" class="user-form-modal">
        <div class="modal-content">
          <h3>{{ editingUser ? 'Editar Usuário' : 'Adicionar Usuário' }}</h3>
          <form (ngSubmit)="saveUser()">
            <div class="form-group">
              <label for="userName">Nome</label>
              <input type="text" id="userName" [(ngModel)]="currentUser.name" name="name" required>
            </div>
            <div class="form-group">
              <label for="userEmail">Email</label>
              <input type="email" id="userEmail" [(ngModel)]="currentUser.email" name="email" required>
            </div>
            <div class="form-group">
              <label for="userRole">Função</label>
              <input type="text" id="userRole" [(ngModel)]="currentUser.role" name="role" required>
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Salvar</button>
              <button type="button" class="btn btn-secondary" (click)="closeUserForm()">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-management-container {
      padding: 20px;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }

    .page-header h1 {
      font-size: 1.8rem;
      color: var(--text-primary);
    }

    .page-actions .btn {
      margin-left: 10px;
    }

    .card {
      background: var(--card-background);
      border-radius: 12px;
      border: 1px solid rgba(78, 90, 177, 0.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      overflow: hidden;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
    }

    .table th,
    .table td {
      padding: 16px;
      text-align: left;
      border-bottom: 1px solid rgba(178, 190, 195, 0.2);
    }

    .table th {
      background: rgba(78, 90, 177, 0.05);
      font-weight: 600;
      color: var(--text-primary);
    }

    .table tr:hover {
      background: rgba(78, 90, 177, 0.02);
    }

    .action-buttons .btn {
      margin-right: 8px;
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 0.85rem;
    }

    .btn-info {
      background-color: #17a2b8;
      color: white;
    }
    .btn-info:hover {
      background-color: #138496;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
    .btn-danger:hover {
      background-color: #c82333;
    }

    .user-form-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: var(--card-background);
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      width: 90%;
      max-width: 500px;
      color: var(--text-primary);
    }

    .modal-content h3 {
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 1.5rem;
      text-align: center;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    .form-group {
      margin-bottom: 15px;
      text-align: left;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
    }

    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }
  `], // Adicionada vírgula aqui
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  showUserForm: boolean = false;
  editingUser: boolean = false;
  currentUser: User = { id: 0, name: '', email: '', role: '' };

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    // Mock data for demonstration
    this.users = [
      { id: 1, name: 'João Silva', email: 'joao.silva@example.com', role: 'Admin' },
      { id: 2, name: 'Maria Souza', email: 'maria.souza@example.com', role: 'Editor' },
      { id: 3, name: 'Pedro Santos', email: 'pedro.santos@example.com', role: 'Viewer' },
    ];
  }

  openAddUserForm() {
    this.editingUser = false;
    this.currentUser = { id: this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1, name: '', email: '', role: '' };
    this.showUserForm = true;
  }

  editUser(user: User) {
    this.editingUser = true;
    this.currentUser = { ...user }; // Create a copy to avoid direct mutation
    this.showUserForm = true;
  }

  saveUser() {
    if (this.editingUser) {
      // Update existing user
      const index = this.users.findIndex(u => u.id === this.currentUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.currentUser };
      }
    } else {
      // Add new user
      this.users.push({ ...this.currentUser });
    }
    this.closeUserForm();
  }

  deleteUser(id: number) {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      this.users = this.users.filter(user => user.id !== id);
    }
  }

  closeUserForm() {
    this.showUserForm = false;
    this.currentUser = { id: 0, name: '', email: '', role: '' };
  }
}
