import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MOCK_PARTICIPANTS } from '../models/mock-participants';
import { Participant } from '../models/participant.model';
import { ParticipantsService } from '../../../core/services/participants.service';

@Component({
  selector: 'app-participants-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule
  ],
  template: `
    <div class="participants-container">
      <div class="header">
        <h2>Participants</h2>
        <button mat-raised-button color="primary" routerLink="/participants/new">
          <mat-icon>add</mat-icon>
          Add Participant
        </button>
      </div>
      
      <mat-form-field class="search-field">
        <mat-label>Search participants</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Search by name, email, or GitHub ID">
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <div class="table-container">
        <table mat-table [dataSource]="dataSource" class="participants-table" matSort>
          
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
            <td mat-cell *matCellDef="let participant"> {{participant.name}} </td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef> Email </th>
            <td mat-cell *matCellDef="let participant"> {{participant.email}} </td>
          </ng-container>

          <ng-container matColumnDef="whatsapp">
            <th mat-header-cell *matHeaderCellDef> WhatsApp </th>
            <td mat-cell *matCellDef="let participant"> {{participant.whatsapp}} </td>
          </ng-container>

          <ng-container matColumnDef="linkedin">
            <th mat-header-cell *matHeaderCellDef> LinkedIn </th>
            <td mat-cell *matCellDef="let participant"> 
              <a [href]="participant.linkedin" target="_blank" mat-button>View</a>
            </td>
          </ng-container>

          <ng-container matColumnDef="github_id">
            <th mat-header-cell *matHeaderCellDef> GitHub </th>
            <td mat-cell *matCellDef="let participant"> {{participant.github_id}} </td>
          </ng-container>

          <ng-container matColumnDef="created_at">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Created At </th>
            <td mat-cell *matCellDef="let participant"> {{participant.created_at | date:'shortDate'}} </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let participant">
              <button mat-icon-button [routerLink]="['/participants', participant.id]" color="primary">
                <mat-icon>visibility</mat-icon>
              </button>
              <button mat-icon-button [routerLink]="['/participants', participant.id, 'edit']" color="accent">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button (click)="deleteParticipant(participant)" color="warn">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>

      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .participants-container {
      padding: 1rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .search-field {
      width: 100%;
      margin-bottom: 1rem;
    }
    .table-container {
      overflow-x: auto;
      margin-bottom: 1rem;
    }
    .participants-table {
      width: 100%;
    }
    .mat-mdc-row:hover {
      background-color: #f5f5f5;
    }
  `]
})
export class ParticipantsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'whatsapp', 'linkedin', 'github_id', 'created_at', 'actions'];
  dataSource = new MatTableDataSource<Participant>(MOCK_PARTICIPANTS);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private participantsService: ParticipantsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadParticipants();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Load participants from the service
   */
  loadParticipants() {
    // Use actual API service call
    this.participantsService.list().subscribe({
      next: (participants) => {
        this.dataSource.data = participants;
      },
      error: (error) => {
        this.snackBar.open(error.message, 'Close', { duration: 3000 });
        // Fallback to mock data if API fails
        this.dataSource.data = MOCK_PARTICIPANTS;
      }
    });
  }

  /**
   * Apply filter to the data source
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Delete a participant with confirmation
   */
  deleteParticipant(participant: Participant) {
    if (confirm(`Are you sure you want to delete ${participant.name}?`)) {
      // Use actual API service call
      this.participantsService.remove(participant.id).subscribe({
        next: () => {
          this.loadParticipants();
          this.snackBar.open('Participant deleted successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open(error.message, 'Close', { duration: 3000 });
        }
      });
    }
  }
}
