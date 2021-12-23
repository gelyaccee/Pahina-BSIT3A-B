import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { BooksService } from '../../services/books.service'; 
import { UserService } from '../../services/user.service'; 
import { RepositoryService } from '../../services/repository.service';  

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  Favorites : any
  constructor(private router: Router,  
    private api_login: BooksService,
    private api_user: UserService,
    private api_repo: RepositoryService) {
      this.view(this.api_repo.UserProfile[0].id) 
    }

    view(id){
      this.api_user.fetchFavorites(id).subscribe((result:any) =>{   
        this.Favorites  = result['data']
        console.log(this.Favorites)

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

