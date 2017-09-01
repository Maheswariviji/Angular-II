import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../service/auth.service';

@Injectable()
export class CrudserviceService {

domain="";

options;
  constructor( private authService: AuthService,
    private http: Http) { }

createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }
newitem(item) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + '/item/newitem', item, this.options).map(res => res.json());
  }
getAllBlogs() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/item/allBlogs', this.options).map(res => res.json());
  }
  getSingle(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/item/singleitem/' + id, this.options).map(res => res.json());
  }
editBlog(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/item/update/' +data._id , data,this.options).map(res => res.json());
  }
  deleteBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + '/item/delete/' + id, this.options).map(res => res.json());
  }
}
