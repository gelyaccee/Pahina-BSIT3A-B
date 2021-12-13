import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RepositoryService } from '../../services/repository.service';

import { AvatarComponent } from 'ngx-avatar'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  myProfile = []
  constructor(
    private repository: RepositoryService,
  ) {
    this.myProfile = this.repository.UserProfile
  }

  ngOnInit() {
  }

}
