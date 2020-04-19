import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LightsLibrary } from './lights-library';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorDialogComponent } from '../user-controls/error-dialog/error-dialog.component';
import DefaultLibrary from '../../assets/lights/default.json';

@Injectable({
  providedIn: 'root'
})
export class LightsLibraryService {

  public library = new LightsLibrary();

  constructor(
    private http: HttpClient,
    private errorDialog: MatDialog
  ) { }

  public getDefaultLibrary(): LightsLibrary {
    const ret = DefaultLibrary as LightsLibrary;
    const lib = new LightsLibrary();
    ret.clone = lib.clone.bind(ret);
    return ret.clone();
  }

  // public getLibrary(name: string): LightsLibrary {

  //   const a = DefaultLibrary;

  //   const json = this.http.get(name).pipe(
  //     catchError(this.handleError<LightsLibrary>(
  //       'Failed to get default library:', new LightsLibrary())));

  //   return null;
  // }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      const dialogRef = this.errorDialog.open(ErrorDialogComponent, {
        width: '350px',
        data: {
          title: 'Error',
          label: operation,
          message: error
        }
      });

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
