import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { CrudserviceService } from '../service/crudservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

messageClass;
  message;
  processing = false;
  form;
  items;
  newPost = false;
  availableitem=false;
  title;desc;
  data={};
  updatebtn=true;
 sbt=true;

  constructor(private formBuilder: FormBuilder,
    public authService: AuthService,
    private crudService: CrudserviceService,
     public router: Router
  ) {
    this.create(); // Create new blog form on start up
    }

newBlogForm() {
    this.newPost = true;
    this.sbt=false; // Show new blog form
  }
    create() {
    this.form = this.formBuilder.group({
      // Title field
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      // Body field
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    })
  }

alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'alphaNumericValidation': true } // Return error in validation
    }
  }

  enableFormNewBlogForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
  }

  // Disable new blog form
  disableFormNewBlogForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable(); // Disable body field
  }



  onBlogSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormNewBlogForm(); // Lock form

    // Create blog object from form fields
    const item = {
      title: this.form.get('title').value, // Title field
      body: this.form.get('body').value // Body field
      
    }

    // Function to save blog into database
    this.crudService.newitem(item).subscribe(data => {
      // Check if blog was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormNewBlogForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = data.message; // Return success message
        this.getAllBlogs();
        // Clear form data after two seconds
        setTimeout(() => {
          this.newPost = false; // Hide form
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.form.reset(); // Reset all form fields
          this.enableFormNewBlogForm(); // Enable the form fields
        }, 2000);
      }
    });
  }
  goBack() {
    window.location.reload(); // Clear all variable states
  }
getAllBlogs() {
    // Function to GET all blogs from database
    this.crudService.getAllBlogs().subscribe(data => {
      this.items = data.blogs; 
      console.log(this.items);
      if(this.items.length>0)
      {
this.availableitem=true;
      }
      else{
this.availableitem=false
      }
    });
  }
Edit(i){
	this.crudService.getSingle(i._id).subscribe(data=>{
		console.log(data.title);
		this.data=data;
		// this.data.title=data.title;
		console.log(this.data);
		this.newPost=true;
		 this.sbt=true;
		 this.updatebtn=false;
	})
}
update()
{
console.log(this.data);
    this.processing = true; // Lock form fields
    // Function to send blog object to backend
    this.crudService.editBlog(this.data).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; 
        this.getAllBlogs();// Set success message
        // After two seconds, navigate back to blog page
        // setTimeout(() => {
        //   this.router.navigate(['/dashboard']); // Navigate back to route page
        //  // window.location.reload(); 
        // }, 2000);
      }
    });
  }
  Delete(i){

    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.crudService.deleteBlog(i._id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message;
          this.getAllBlogs();
         // Return success message
        // After two second timeout, route to blog page
        // setTimeout(() => {
        //   this.router.navigate(['/dashboard']);
        //   // window.location.reload(); // Route users to blog page
        // }, 1000);
      }
    });
  

  }

  ngOnInit() {
  	this.getAllBlogs();
  }

}
