import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Participant, CreateParticipantDto, UpdateParticipantDto } from '../../features/participants/models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  private readonly apiUrl = `${environment.apiBaseUrl}/participants`;

  constructor(private http: HttpClient) { }

  /**
   * Fetch all participants from the API
   */
  list(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetch a single participant by ID
   */
  get(id: number): Observable<Participant> {
    return this.http.get<Participant>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Create a new participant
   */
  create(dto: CreateParticipantDto): Observable<Participant> {
    return this.http.post<Participant>(this.apiUrl, dto).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update an existing participant
   */
  update(id: number, dto: UpdateParticipantDto): Observable<Participant> {
    return this.http.put<Participant>(`${this.apiUrl}/${id}`, dto).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Delete a participant
   */
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors and provide user-friendly messages
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please check your API key.';
          break;
        case 404:
          errorMessage = 'Participant not found.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
