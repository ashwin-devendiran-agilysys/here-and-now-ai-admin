import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParticipantsService } from '../../../core/services/participants.service';
import { Participant, CreateParticipantDto, UpdateParticipantDto } from '../models/participant.model';

@Component({
  selector: 'app-participant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <div class="form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Edit' : 'Add' }} Participant</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="participantForm" (ngSubmit)="onSubmit()">
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" placeholder="Enter full name">
              <mat-error *ngIf="participantForm.get('name')?.hasError('required')">
                Name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="Enter email address">
              <mat-error *ngIf="participantForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="participantForm.get('email')?.hasError('email')">
                Please enter a valid email address
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>WhatsApp</mat-label>
              <input matInput formControlName="whatsapp" placeholder="Enter WhatsApp number">
              <mat-error *ngIf="participantForm.get('whatsapp')?.hasError('required')">
                WhatsApp number is required
              </mat-error>
              <mat-error *ngIf="participantForm.get('whatsapp')?.hasError('pattern')">
                Please enter a valid WhatsApp number
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>LinkedIn URL</mat-label>
              <input matInput formControlName="linkedin" placeholder="Enter LinkedIn profile URL">
              <mat-error *ngIf="participantForm.get('linkedin')?.hasError('pattern')">
                Please enter a valid URL
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>GitHub ID</mat-label>
              <input matInput formControlName="github_id" placeholder="Enter GitHub username">
              <mat-error *ngIf="participantForm.get('github_id')?.hasError('required')">
                GitHub ID is required
              </mat-error>
            </mat-form-field>

            <div class="skills-section">
              <h3>Skills (1-10 scale)</h3>
              
              <div class="skills-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Python</mat-label>
                  <mat-select formControlName="python_skill">
                    <mat-option *ngFor="let level of skillLevels" [value]="level">{{level}}</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Angular</mat-label>
                  <mat-select formControlName="angular_skill">
                    <mat-option *ngFor="let level of skillLevels" [value]="level">{{level}}</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>JavaScript</mat-label>
                  <mat-select formControlName="javascript_skill">
                    <mat-option *ngFor="let level of skillLevels" [value]="level">{{level}}</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>HTML</mat-label>
                  <mat-select formControlName="html_skill">
                    <mat-option *ngFor="let level of skillLevels" [value]="level">{{level}}</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>CSS</mat-label>
                  <mat-select formControlName="css_skill">
                    <mat-option *ngFor="let level of skillLevels" [value]="level">{{level}}</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Java</mat-label>
                  <mat-select formControlName="java_skill">
                    <mat-option *ngFor="let level of skillLevels" [value]="level">{{level}}</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Outcome</mat-label>
              <textarea matInput formControlName="outcome" rows="4" placeholder="Enter outcome or notes"></textarea>
            </mat-form-field>

          </form>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" 
                  [disabled]="participantForm.invalid || isLoading"
                  (click)="onSubmit()">
            {{ isLoading ? 'Saving...' : 'Save' }}
          </button>
          <button mat-button (click)="onCancel()">Cancel</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .form-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }
    .skills-section {
      margin: 2rem 0;
    }
    .skills-section h3 {
      margin-bottom: 1rem;
      color: #333;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    mat-card {
      padding: 1rem;
    }
  `]
})
export class ParticipantFormComponent implements OnInit {
  participantForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  participantId: number | null = null;
  
  skillLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private participantsService: ParticipantsService,
    private snackBar: MatSnackBar
  ) {
    this.participantForm = this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.participantId = +params['id'];
        this.loadParticipant(this.participantId);
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: ['', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-]+$/)]],
      linkedin: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      github_id: ['', [Validators.required]],
      python_skill: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      angular_skill: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      javascript_skill: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      html_skill: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      css_skill: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      java_skill: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      outcome: ['']
    });
  }

  private loadParticipant(id: number) {
    this.isLoading = true;
    this.participantsService.get(id).subscribe({
      next: (participant) => {
        this.participantForm.patchValue(participant);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading participant:', error);
        this.snackBar.open('Error loading participant. Please try again.', 'Close', { duration: 3000 });
        this.isLoading = false;
        // Fallback to mock data if API fails
        this.participantForm.patchValue({
          name: 'John Doe',
          email: 'john.doe@example.com',
          whatsapp: '+1234567890',
          linkedin: 'https://linkedin.com/in/johndoe',
          github_id: 'johndoe',
          python_skill: 7,
          angular_skill: 8,
          javascript_skill: 9,
          html_skill: 8,
          css_skill: 7,
          java_skill: 6,
          outcome: 'Great progress in web development'
        });
      }
    });
  }

  onSubmit() {
    if (this.participantForm.valid) {
      this.isLoading = true;
      const formData = this.participantForm.value;

      if (this.isEditMode && this.participantId) {
        this.updateParticipant(this.participantId, formData);
      } else {
        this.createParticipant(formData);
      }
    }
  }

  private createParticipant(data: CreateParticipantDto) {
    this.participantsService.create(data).subscribe({
      next: (participant) => {
        this.snackBar.open('Participant created successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/participants']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating participant:', error);
        this.snackBar.open('Error creating participant. Please try again.', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  private updateParticipant(id: number, data: UpdateParticipantDto) {
    this.participantsService.update(id, data).subscribe({
      next: (participant) => {
        this.snackBar.open('Participant updated successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/participants']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating participant:', error);
        this.snackBar.open('Error updating participant. Please try again.', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/participants']);
  }
}
