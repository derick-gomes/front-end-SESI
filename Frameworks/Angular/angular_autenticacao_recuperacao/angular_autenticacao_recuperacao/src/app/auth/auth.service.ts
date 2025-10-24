import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private users: User[] = [
    { id: 1, email: 'user@example.com', name: 'Usuário Exemplo' }
  ];

  constructor() {
    // Simular usuário logado do localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulação de login - em produção, isso seria uma chamada API
      const user = this.users.find(u => u.email === email);
      if (user && password === 'password') { // Senha simples para demo
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulação de registro
      const existingUser = this.users.find(u => u.email === email);
      if (!existingUser) {
        const newUser: User = {
          id: this.users.length + 1,
          email,
          name
        };
        this.users.push(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.currentUserSubject.next(newUser);
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  forgotPassword(email: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulação de envio de email de recuperação
      const user = this.users.find(u => u.email === email);
      if (user) {
        // Em produção, enviaria email com token
        localStorage.setItem('resetToken', 'demo-token-123');
        localStorage.setItem('resetEmail', email);
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  resetPassword(token: string, newPassword: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulação de reset de senha
      const storedToken = localStorage.getItem('resetToken');
      const email = localStorage.getItem('resetEmail');
      if (token === storedToken && email) {
        // Em produção, atualizaria a senha no backend
        localStorage.removeItem('resetToken');
        localStorage.removeItem('resetEmail');
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}
