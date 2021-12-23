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
 
  
  login(uname, pass){ 
      return this.http.get(this.local+'/login?user_id='+uname+'&user_password='+pass); 
  }

  signup(name, email, uname, pass){
    return this.http.get(this.local+'/signup?user_name='+name+'&user_email='+email+'&user_id='+uname+'&user_password='+pass); 
  }

  updateUser(name, email, uname, pass){
    return this.http.get(this.local+'/edit-profile?user_name='+name+'&user_email='+email+'&user_id='+uname+'&user_password='+pass); 
  }
  
  addFavorites(user_id, isbn13, image, title, author){
    return this.http.get(this.local+'/addFavorites?userid='+user_id+'&isbn13='+isbn13+'&image='+image+'&title='+title+'&author='+author)
  }

  fetchFavorites(user_id){
    return this.http.get(this.local+'/fetchFavorites?userid='+user_id)
  }

  fetchHistory(user_id){
    return this.http.get(this.local+'/fetchHistory?userid='+user_id)
  } 
  
  save_history(user_id, isbn13, image, title, author){ 
    return this.http.get(this.local+'/save_history?userid='+user_id+'&isbn13='+isbn13+'&image='+image+'&title='+title+'&author='+author)
  }
 
}
