import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../../../features/login/services/authentication.service';
import { Stock } from './../models/stock.model';
import { ApiUrls } from './../../../urls'


@Injectable({
  providedIn: 'root'
})
export class stockService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  getAllStocks(): Observable<Stock[]> {
    const token = this.authService.getToken();
    debugger

    // Check if the user is logged in and has a token
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.httpClient.get<Stock[]>(ApiUrls.GetAllStocks, { headers: headers });
    } else {
      // Handle the case where the user is not logged in or doesn't have a token
      // You might want to redirect the user to the login page or take appropriate action
      console.error('User is not logged in.');
      return new Observable(); // You can return an observable with an appropriate error handling
    }
  }
}
