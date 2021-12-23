import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { BooksService } from '../services/books.service'; 
import { UserService } from '../services/user.service'; 
import { RepositoryService } from '../services/repository.service';  

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  History : any
  constructor(private router: Router,  
    private api_login: BooksService,
    private api_user: UserService,
    private api_repo: RepositoryService) {
      this.view(this.api_repo.UserProfile[0].id) 
    }

    view(id){
      this.api_user.fetchHistory(id).subscribe((result:any) =>{   
        this.History  = result['data']
        console.log(this.History)

      },(error) => { 
        console.error(error);
      })   
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
