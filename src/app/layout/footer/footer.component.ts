import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer" [style.background]="brand.colors.secondary">
      <span>{{ brand.slogan }}</span>
      <span>{{ brand.email }} | {{ brand.mobile }}</span>
      <a [href]="brand.website" target="_blank">{{ brand.website }}</a>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .footer { display: flex; justify-content: space-between; align-items: center; padding: 1rem; color: #FFDF00; font-size: 0.95rem; }
    a { color: #FFDF00; text-decoration: none; margin-left: 1rem; }
    a:hover { text-decoration: underline; }
  `]
})
export class FooterComponent {
  brand = {
    slogan: 'designed with passion for innovation',
    email: 'info@hereandnowai.com',
    mobile: '+91 996 296 1000',
    website: 'https://hereandnowai.com',
    colors: { primary: '#FFDF00', secondary: '#004040' }
  };
}
