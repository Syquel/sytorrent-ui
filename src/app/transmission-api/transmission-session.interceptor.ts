import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class TransmissionSessionInterceptor implements HttpInterceptor {

  private readonly TRANSMISSION_ID_HEADER = 'X-Transmission-Session-Id';
  private crsfValue: string | null = null;

  constructor(private readonly httpClient: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.crsfValue !== null) {
      const crsfHttpHeaders: HttpHeaders = new HttpHeaders().set(this.TRANSMISSION_ID_HEADER, this.crsfValue);
      request = request.clone({headers: crsfHttpHeaders});
    }

    return next
      .handle(request)
      .pipe(
        catchError(err => err instanceof HttpErrorResponse ? this.handleRequestError(request, err) : throwError(err))
      );
  }

  private handleRequestError(httpRequest : HttpRequest<unknown>, httpErrorResponse: HttpErrorResponse) : Observable<HttpEvent<unknown>> {
    if (httpErrorResponse.status != 409) {
      return throwError(httpErrorResponse);
    }

    this.crsfValue = httpErrorResponse.headers.get(this.TRANSMISSION_ID_HEADER);
    if (this.crsfValue === null) {
      return throwError(httpErrorResponse);
    }

    const crsfHttpHeaders: HttpHeaders = new HttpHeaders().set(this.TRANSMISSION_ID_HEADER, this.crsfValue);
    const csrfHttpRequest: HttpRequest<unknown> = httpRequest.clone({headers: crsfHttpHeaders});

    return this.httpClient.request(csrfHttpRequest);
  }

}
