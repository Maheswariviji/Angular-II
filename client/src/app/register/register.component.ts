import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

form;
message;
  messageClass;
  processing = false;
emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;
  constructor(
   private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
 this.createForm();
   }
createForm() {
    this.form = this.formBuilder.group({
     email: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(30), 
        this.validateEmail 
      ])],
     
      username: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername 
      ])],
      // Password Input
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(35), 
        this.validatePassword 
      ])],
     
      confirm: ['', Validators.required] 
    }, { validator: this.matchingPasswords('password', 'confirm') }); 
  }

  validateEmail(controls) {
   
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
   
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }

  
  validateUsername(controls) {
   
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
   
    if (regExp.test(controls.value)) {
      return null; 
    } else {
      return { 'validateUsername': true } 
    }
  }

  
  validatePassword(controls) {
    
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
   
    if (regExp.test(controls.value)) {
      return null; 
    } else {
      return { 'validatePassword': true } 
    }
  }

  
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
     
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; 
      } else {
        return { 'matchingPasswords': true } 
      }
    }
  }
  onRegisterSubmit()
  {
  console.log("form submitted");
  const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value, 
      password: this.form.get('password').value 
    }
this.authService.registerUser(user).subscribe(data => {
if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
        this.processing = false; // Re-enable submit button
        this.enableForm(); // Re-enable form
      } else {
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = data.message; // Set a success message
        // After 2 second timeout, navigate to the login page
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirect to login view
        }, 2000);
      }
  });
 
}
disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

   checkEmail() {
    // Function from authentication file to check if e-mail is taken
    this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
      // Check if success true or false was returned from API
      if (!data.success) {
        this.emailValid = false; // Return email as invalid
        this.emailMessage = data.message; // Return error message
      } else {
        this.emailValid = true; // Return email as valid
        this.emailMessage = data.message; // Return success message
      }
    });
  }

  // Function to check if username is available
  checkUsername() {
    // Function from authentication file to check if username is taken
    this.authService.checkUsername(this.form.get('username').value).subscribe(data => {
      // Check if success true or success false was returned from API
      if (!data.success) {
        this.usernameValid = false; // Return username as invalid
        this.usernameMessage = data.message; // Return error message
      } else {
        this.usernameValid = true; // Return username as valid
        this.usernameMessage = data.message; // Return success message
      }
    });
  }

}