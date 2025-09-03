
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <mat-toolbar class="app-toolbar">
      <div class="header-content">
        <div class="brand-section">
          <div class="logo-container">
            <mat-icon class="brand-icon">psychology</mat-icon>
          </div>
          <div class="brand-text">
            <h1 class="app-title">HERE AND NOW AI</h1>
            <span class="app-subtitle">Participant Admin Portal</span>
          </div>
        </div>
        
        <nav class="nav-links">
          <a mat-button routerLink="/dashboard" routerLinkActive="active" class="nav-button">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          <a mat-button routerLink="/participants" routerLinkActive="active" class="nav-button">
            <mat-icon>people</mat-icon>
            <span>Participants</span>
          </a>
          <a mat-button routerLink="/api-test" routerLinkActive="active" class="nav-button">
            <mat-icon>api</mat-icon>
            <span>API Test</span>
          </a>
        </nav>
        
        <div class="user-section">
          <mat-icon class="user-icon">account_circle</mat-icon>
        </div>
      </div>
    </mat-toolbar>

    <div class="app-container">
      <main class="main-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4285f4 100%);
      box-shadow: 0 4px 20px rgba(66, 133, 244, 0.3);
      min-height: 80px;
      padding: 0 2rem;
      border-bottom: 3px solid #FFDF00;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
    }
    
    .brand-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .logo-container {
      background: linear-gradient(45deg, #FFDF00, #FFF176);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 10px rgba(255, 223, 0, 0.4);
    }
    
    .brand-icon {
      font-size: 2rem;
      color: #1e3c72;
    }
    
    .brand-text {
      display: flex;
      flex-direction: column;
    }
    
    .app-title {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 700;
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      letter-spacing: 1px;
    }
    
    .app-subtitle {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 400;
      margin-top: -2px;
    }
    
    .nav-links {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    
    .nav-button {
      color: white !important;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem !important;
      border-radius: 25px !important;
      font-weight: 500;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      min-width: 120px;
      justify-content: center;
    }
    
    .nav-button:hover {
      background: rgba(255, 223, 0, 0.2) !important;
      border-color: #FFDF00;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255, 223, 0, 0.3);
    }
    
    .nav-button.active {
      background: #FFDF00 !important;
      color: #1e3c72 !important;
      border-color: #FFDF00;
      font-weight: 600;
      box-shadow: 0 3px 12px rgba(255, 223, 0, 0.4);
    }
    
    .nav-button mat-icon {
      font-size: 1.2rem;
    }
    
    .user-section {
      display: flex;
      align-items: center;
    }
    
    .user-icon {
      font-size: 2.5rem;
      color: white;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    
    .user-icon:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: scale(1.1);
    }
    
    .app-container {
      min-height: calc(100vh - 80px);
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    .main-content {
      padding: 0;
      max-width: 100%;
    }
    
    /* Mobile Responsiveness */
    @media (max-width: 1024px) {
      .app-toolbar {
        padding: 0 1rem;
        min-height: 70px;
      }
      
      .app-title {
        font-size: 1.4rem;
      }
      
      .nav-button {
        padding: 0.5rem 1rem !important;
        min-width: 100px;
      }
      
      .nav-button span {
        display: none;
      }
      
      .nav-button mat-icon {
        margin: 0;
      }
    }
    
    @media (max-width: 768px) {
      .app-toolbar {
        padding: 0 0.5rem;
        min-height: 60px;
      }
      
      .header-content {
        flex-wrap: nowrap;
      }
      
      .brand-section {
        gap: 0.5rem;
      }
      
      .logo-container {
        width: 40px;
        height: 40px;
      }
      
      .brand-icon {
        font-size: 1.5rem;
      }
      
      .app-title {
        font-size: 1.1rem;
      }
      
      .app-subtitle {
        font-size: 0.7rem;
      }
      
      .nav-links {
        gap: 0.25rem;
      }
      
      .nav-button {
        padding: 0.4rem 0.8rem !important;
        min-width: 60px;
        border-radius: 20px !important;
      }
      
      .user-icon {
        font-size: 2rem;
        padding: 0.25rem;
      }
    }
    
    @media (max-width: 480px) {
      .brand-text {
        display: none;
      }
      
      .nav-links {
        flex: 1;
        justify-content: center;
        gap: 0.2rem;
      }
      
      .nav-button {
        padding: 0.3rem 0.6rem !important;
        min-width: 50px;
      }
    }
  `]
})
export class AppComponent {}
