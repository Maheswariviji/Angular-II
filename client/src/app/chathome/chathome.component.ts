import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-chathome',
  templateUrl: './chathome.component.html',
  styleUrls: ['./chathome.component.css']
})
export class ChathomeComponent implements OnInit {

username;
email;
  constructor( public authService: AuthService) { }

  ngOnInit() {
  this.authService.getProfile().subscribe(profile => {
  console.log(profile);
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
    });
  }

}
