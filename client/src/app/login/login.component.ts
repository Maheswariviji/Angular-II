import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
messageClass;
  message;
  processing = false;
  form;
  previousUrl;
  constructor(private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private authGuard: AuthGuard
    ) {
this.createForm();
     }


 createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }

 
  disableForm() {
    this.form.controls['username'].disable(); // Disable username field
    this.form.controls['password'].disable(); // Disable password field
  }

 
  enableForm() {
    this.form.controls['username'].enable(); // Enable username field
    this.form.controls['password'].enable(); // Enable password field
  }

onLoginSubmit() {
    this.processing = true; 
    this.disableForm(); 
    
    const user = {
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value // Password input field
    }

    
    this.authService.login(user).subscribe(data => {
    console.log(user);
     
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      } else {
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = data.message;
         this.authService.storeUserData(data.token, data.user);
        
       setTimeout(() => {
          // Check if user was redirected or logging in for first time
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
          } else {
            this.router.navigate(['/chat']); // Navigate to dashboard view
          }
        }, 2000);
        }
        });
        }

 ngOnInit() {
    // On page load, check if user was redirected to login
    if (this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger'; // Set error message: need to login
      this.message = 'You must be logged in to view that page.'; // Set message
      this.previousUrl = this.authGuard.redirectUrl; // Set the previous URL user was redirected from
      this.authGuard.redirectUrl = undefined; // Erase previous URL
    }
  }
}
