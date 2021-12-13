import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl  } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RepositoryService } from '../services/repository.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  username = '';
  password = '';
  user: any;
  
  constructor(private router: Router, private userService: UserService,
    private repository: RepositoryService, private toastController: ToastController) { }

  ngOnInit() {
    //check if there is an existing account redirect to home
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    if(this.user){
      this.router.navigate(['/home']);  
    }
  }

  login(){
  
    this.userService.login(this.username, this.password)
    .subscribe((result) => { 
      if(result['data'].length != 1){
        // do something if failed
        this.presentToast('Incorrect username or password.')
      }else{
        // Success login  
        this.repository.UserProfile = result['data']
        this.presentToast('Welcome!')
        this.router.navigate(['/main']);  
      } 
    });

  }

  async presentToast(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 500
    });
    toast.present();

  }

}