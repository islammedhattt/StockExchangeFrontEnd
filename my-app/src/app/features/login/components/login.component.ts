import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Add FormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  model: any = {};

  constructor(private authService: AuthenticationService ,private router:Router) { }

  onSubmit() {
    this.authService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          console.log('Login successful');
          this.router.navigate(['/stocks']);

          // Handle login success
        },
        error => {
          console.error('Login failed');
          // Handle login failure
        }
      );
  }
}
