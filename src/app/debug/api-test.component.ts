import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-api-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="api-test">
      <h3>API Test Component</h3>
      <p>API Base URL: {{ apiUrl }}</p>
      <p>API Key Header: {{ environment.apiKeyHeaderName }}</p>
      <p>API Key Value: {{ environment.apiKeyValue }}</p>
      
      <button (click)="testApi()">Test API Call</button>
      
      <div *ngIf="response">
        <h4>Response:</h4>
        <pre>{{ response | json }}</pre>
      </div>
      
      <div *ngIf="error" class="error">
        <h4>Error:</h4>
        <pre>{{ error | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .api-test {
      padding: 20px;
      border: 1px solid #ccc;
      margin: 20px;
    }
    .error {
      color: red;
    }
    pre {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
  `]
})
export class ApiTestComponent implements OnInit {
  apiUrl = `${environment.apiBaseUrl}/participants`;
  environment = environment;
  response: any = null;
  error: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('API Configuration:');
    console.log('Base URL:', environment.apiBaseUrl);
    console.log('API Key Header:', environment.apiKeyHeaderName);
    console.log('API Key Value:', environment.apiKeyValue);
  }

  testApi() {
    this.response = null;
    this.error = null;
    
    console.log('Making API call to:', this.apiUrl);
    
    this.http.get(this.apiUrl).subscribe({
      next: (data) => {
        console.log('API Response:', data);
        this.response = data;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.error = err;
      }
    });
  }
}
