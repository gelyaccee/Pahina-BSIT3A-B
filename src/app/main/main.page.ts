import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';  
import { BooksService } from '../services/books.service'; 
import { RepositoryService } from '../services/repository.service';  

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  NewBooks = [] 
  SearchStarted = false
  SKeyword = ""
  searchDummyNoUse = ""

  constructor(private router: Router,  
    private api_login: BooksService,
    private api_repo: RepositoryService) {
      this.browse(); 
    }

  browse(){
    this.api_login.Library().subscribe((result:any) =>{   
      this.NewBooks = result['books'] 
      this.SearchStarted = false;
    },(error) => { 
      console.error(error);
    })   

  }


  search(q: string) {  
      this.api_login.findBook(q).subscribe((result:any) =>{  
        this.NewBooks = result['books'] 
        this.SKeyword = q;
        this.SearchStarted = true;
      },(error) => { 
        console.error(error);
      })   

      // this.router.navigate(['/home']);   
  } 

  preview(value){  
    this.api_login.previewBook(value).subscribe((result:any) =>{    
      this.api_repo.BookstoPreview = result   
      this.presentModal()
    },(error) => { 
      console.error(error);
    })   
  }

  presentModal() {
    this.router.navigate(['/books-preview']);   
  }

  ngOnInit() {
  }

}
