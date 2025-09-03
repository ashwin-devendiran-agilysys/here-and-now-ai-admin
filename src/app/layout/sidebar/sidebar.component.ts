import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="sidebar" [style.background]="brand.colors.secondary">
      <nav>
        <ul>
          <li><a routerLink="/dashboard">Dashboard</a></li>
          <li><a routerLink="/participants">Participants</a></li>
          <li><a routerLink="/analytics">Analytics & Reports</a></li>
          <li><a routerLink="/settings">Settings</a></li>
          <li><a routerLink="/help">Help & Support</a></li>
        </ul>
      </nav>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .sidebar { width: 220px; min-height: 100vh; color: #FFDF00; }
    ul { list-style: none; padding: 0; }
    li { margin: 1rem 0; }
    a { color: #FFDF00; text-decoration: none; font-weight: 500; }
    a:hover { text-decoration: underline; }
  `]
})
export class SidebarComponent {
  brand = {
    colors: { primary: '#FFDF00', secondary: '#004040' }
  };
}
