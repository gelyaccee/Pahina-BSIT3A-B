import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl  } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  name = '';
  email = '';
  username = '';
  password = '';
  user: any;
  constructor(private router: Router, private userService: UserService, private toastController: ToastController) { }


  ngOnInit() {
    
  }

  updateUser() {
    
   
    this.userService.updateUser(this.name, this.email, this.username, this.password)
    .subscribe((result) => { 
      if(result){
        this.presentToast('Your profile is updated.')
        this.router.navigate(['/profile']);

        this.name = ""; //clear input field when submit
        this.email = "";
        this.username = "";
        this.password = "";
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
