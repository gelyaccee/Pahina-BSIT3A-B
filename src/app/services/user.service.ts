import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url: string = environment.url;
  private local: string = environment.local
  constructor(private http: HttpClient) { } 
 
  //login pass the parameter username and password
  login(uname, pass){ 
      return this.http.get(this.local+'/login?user_id='+uname+'&user_password='+pass); 
  }

  signup(name, email, uname, pass){
    return this.http.get(this.local+'/signup?user_name='+name+'&user_email='+email+'&user_id='+uname+'&user_password='+pass); 
  }
 
}
