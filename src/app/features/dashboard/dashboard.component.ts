import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MOCK_PARTICIPANTS } from '../participants/models/mock-participants';
import { Participant } from '../participants/models/participant.model';
import { ParticipantsService } from '../../core/services/participants.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    MatIconModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>
          <mat-icon class="dashboard-icon">dashboard</mat-icon>
          Participant Admin Dashboard
        </h1>
        <p class="subtitle">Comprehensive overview of participant skills and progress</p>
      </div>
      
      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-container">
        <mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
        <p>Loading participant data...</p>
      </div>

      <!-- Dashboard Content -->
      <div *ngIf="!isLoading" class="dashboard-content">
        <!-- KPI Cards -->
        <div class="kpi-section">
          <h2>Key Performance Indicators</h2>
          <div class="kpi-grid">
            <mat-card class="kpi-card total">
              <mat-card-content>
                <div class="kpi-header">
                  <mat-icon>people</mat-icon>
                  <h3>Total Participants</h3>
                </div>
                <div class="kpi-value">{{ kpiData.totalParticipants }}</div>
              </mat-card-content>
            </mat-card>
            
            <mat-card class="kpi-card python">
              <mat-card-content>
                <div class="kpi-header">
                  <mat-icon>code</mat-icon>
                  <h3>Avg Python Skill</h3>
                </div>
                <div class="kpi-value">{{ kpiData.avgPython }}<span class="scale">/10</span></div>
              </mat-card-content>
            </mat-card>
            
            <mat-card class="kpi-card angular">
              <mat-card-content>
                <div class="kpi-header">
                  <mat-icon>web</mat-icon>
                  <h3>Avg Angular Skill</h3>
                </div>
                <div class="kpi-value">{{ kpiData.avgAngular }}<span class="scale">/10</span></div>
              </mat-card-content>
            </mat-card>
            
            <mat-card class="kpi-card javascript">
              <mat-card-content>
                <div class="kpi-header">
                  <mat-icon>javascript</mat-icon>
                  <h3>Avg JavaScript Skill</h3>
                </div>
                <div class="kpi-value">{{ kpiData.avgJavaScript }}<span class="scale">/10</span></div>
              </mat-card-content>
            </mat-card>
          </div>
        </div>

        <!-- Skills Overview -->
        <div class="skills-section">
          <mat-card class="skills-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>bar_chart</mat-icon>
                Skills Overview
              </mat-card-title>
              <mat-card-subtitle>Average skill levels across all participants</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="skills-grid">
                <div class="skill-item" *ngFor="let skill of skillsData">
                  <div class="skill-header">
                    <h4>{{ skill.name }}</h4>
                    <span class="skill-value">{{ skill.average }}/10</span>
                  </div>
                  <div class="skill-bar-container">
                    <mat-progress-bar 
                      mode="determinate" 
                      [value]="skill.average * 10"
                      [color]="getSkillColor(skill.average)">
                    </mat-progress-bar>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      background: transparent;
      min-height: calc(100vh - 140px);
    }
    
    .dashboard-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .dashboard-header h1 {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin: 0 0 0.5rem 0;
      color: #1e3c72;
      font-size: 2.5rem;
      font-weight: 300;
    }
    
    .dashboard-icon {
      font-size: 2.5rem;
      color: #4285f4;
    }
    
    .subtitle {
      color: #666;
      font-size: 1.1rem;
      margin: 0;
    }
    
    .loading-container {
      text-align: center;
      padding: 3rem;
    }
    
    .loading-container p {
      margin-top: 1rem;
      color: #666;
    }
    
    .dashboard-content {
      animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .kpi-section h2 {
      color: #1e3c72;
      margin-bottom: 1.5rem;
      font-weight: 400;
    }
    
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    
    .kpi-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border-radius: 12px;
      overflow: hidden;
    }
    
    .kpi-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .kpi-card.total {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
    }
    
    .kpi-card.python {
      background: linear-gradient(135deg, #4285f4 0%, #1e88e5 100%);
      color: white;
    }
    
    .kpi-card.angular {
      background: linear-gradient(135deg, #42a5f5 0%, #1976d2 100%);
      color: white;
    }
    
    .kpi-card.javascript {
      background: linear-gradient(135deg, #5c6bc0 0%, #3f51b5 100%);
      color: white;
    }
    
    .kpi-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .kpi-header mat-icon {
      font-size: 1.5rem;
    }
    
    .kpi-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
      opacity: 0.9;
    }
    
    .kpi-value {
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .scale {
      font-size: 1.5rem;
      opacity: 0.8;
    }
    
    .skills-section {
      margin-top: 2rem;
    }
    
    .skills-card {
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .skills-card mat-card-header {
      background: linear-gradient(135deg, #1e3c72 0%, #4285f4 100%);
      color: white;
      margin: -24px -24px 24px -24px;
      padding: 24px;
    }
    
    .skills-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      font-size: 1.5rem;
    }
    
    .skills-card mat-card-subtitle {
      color: rgba(255, 255, 255, 0.8);
      margin-top: 0.5rem;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }
    
    .skill-item {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #4285f4;
      transition: all 0.3s ease;
    }
    
    .skill-item:hover {
      background: #e3f2fd;
      transform: translateX(8px);
      border-left-color: #1e3c72;
    }
    
    .skill-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .skill-header h4 {
      margin: 0;
      color: #1e3c72;
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    .skill-value {
      color: white;
      font-weight: 600;
      background: linear-gradient(135deg, #4285f4, #1e3c72);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.9rem;
    }
    
    .skill-bar-container {
      margin-top: 0.5rem;
    }
    
    ::ng-deep .mat-progress-bar {
      height: 8px !important;
      border-radius: 4px;
      overflow: hidden;
    }
    
    ::ng-deep .mat-progress-bar-fill::after {
      border-radius: 4px;
    }
    
    ::ng-deep .mat-progress-bar-buffer {
      background-color: #e0e0e0;
    }
    
    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }
      
      .kpi-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .skills-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .dashboard-header h1 {
        font-size: 2rem;
      }
      
      .kpi-value {
        font-size: 2.5rem;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  participants: Participant[] = [];
  isLoading = true;
  
  kpiData = {
    totalParticipants: 0,
    avgPython: 0,
    avgAngular: 0,
    avgJavaScript: 0
  };

  skillsData = [
    { name: 'Python', average: 0 },
    { name: 'Angular', average: 0 },
    { name: 'JavaScript', average: 0 },
    { name: 'HTML', average: 0 },
    { name: 'CSS', average: 0 },
    { name: 'Java', average: 0 }
  ];

  constructor(
    private participantsService: ParticipantsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  /**
   * Load participants data and compute statistics
   */
  private loadDashboardData() {
    this.isLoading = true;
    // Use actual API service call
    this.participantsService.list().subscribe({
      next: (participants) => {
        console.log('Dashboard loaded participants:', participants);
        this.participants = participants;
        this.computeKPIs();
        this.isLoading = false;
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: (error) => {
        console.error('Error loading participants:', error);
        // Fallback to mock data if API fails
        this.participants = MOCK_PARTICIPANTS;
        this.computeKPIs();
        this.isLoading = false;
        this.cdr.detectChanges(); // Trigger change detection
      }
    });
  }

  /**
   * Compute KPI statistics
   */
  private computeKPIs() {
    this.kpiData = {
      totalParticipants: this.participants.length,
      avgPython: this.calculateAverage('python_skill'),
      avgAngular: this.calculateAverage('angular_skill'),
      avgJavaScript: this.calculateAverage('javascript_skill')
    };

    this.skillsData = [
      { name: 'Python', average: this.calculateAverage('python_skill') },
      { name: 'Angular', average: this.calculateAverage('angular_skill') },
      { name: 'JavaScript', average: this.calculateAverage('javascript_skill') },
      { name: 'HTML', average: this.calculateAverage('html_skill') },
      { name: 'CSS', average: this.calculateAverage('css_skill') },
      { name: 'Java', average: this.calculateAverage('java_skill') }
    ];
  }

  /**
   * Calculate average skill level for a specific skill
   */
  private calculateAverage(skill: keyof Participant): number {
    const validParticipants = this.participants.filter(p => (p[skill] as number) > 0);
    if (validParticipants.length === 0) return 0;
    
    const sum = validParticipants.reduce((acc, p) => acc + (p[skill] as number), 0);
    return Math.round((sum / validParticipants.length) * 10) / 10;
  }

  /**
   * Get color for skill progress bar based on skill level
   */
  getSkillColor(average: number): 'primary' | 'accent' | 'warn' {
    if (average >= 7) return 'primary';
    if (average >= 4) return 'accent';
    return 'warn';
  }
}
