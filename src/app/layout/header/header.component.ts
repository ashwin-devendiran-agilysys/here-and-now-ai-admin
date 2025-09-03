import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header" [style.background]="brand.colors.primary">
      <img [src]="brand.logo.title" alt="HERE AND NOW AI Logo" width="40" height="40" />
      <span class="brand-name">{{ brand.organizationName }}</span>
      <nav class="nav">
        <!-- Navigation links go here -->
      </nav>
      <div class="profile">
        <span>{{ brand.email }}</span>
        <span>{{ brand.mobile }}</span>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .header { display: flex; align-items: center; padding: 0.5rem 1rem; }
    .brand-name { font-weight: bold; margin-left: 1rem; color: #004040; }
    .nav { flex: 1; margin-left: 2rem; }
    .profile { margin-left: auto; display: flex; gap: 1rem; }
  `]
})
export class HeaderComponent {
  brand = {
    organizationName: 'HERE AND NOW AI',
    logo: { title: 'https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/logo-of-here-and-now-ai.png' },
    email: 'info@hereandnowai.com',
    mobile: '+91 996 296 1000',
    colors: { primary: '#FFDF00', secondary: '#004040' }
  };
}
