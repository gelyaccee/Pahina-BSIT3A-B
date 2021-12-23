import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router'; 
import { BooksService } from '../../services/books.service'; 
import { UserService } from '../../services/user.service'; 
import { RepositoryService } from '../../services/repository.service';  

@Component({
  selector: 'app-books-preview',
  templateUrl: './books-preview.page.html',
  styleUrls: ['./books-preview.page.scss'],
})
export class BooksPreviewPage implements OnInit {

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  BookToPreviewData = []
  PDF = []
  PDFValues = []
  HavePreview = false

  // books Details
  authors = ""
  desc = ""
  error = ""
  image = ""
  isbn10 = ""
  isbn13 = ""
  language = ""
  pages = ""
  price = ""
  publisher = ""
  rating = ""
  subtitle = ""
  title = ""
  url = ""
  year = ""

  constructor(private router: Router,  
    private api_login: BooksService,
    private api_user: UserService,
    private api_repo: RepositoryService) {
     this.view(api_repo.BookstoPreview['isbn13']); 
 
    }
  
   view(isbn){
    this.api_login.previewBook(isbn).subscribe((result:any) =>{   
      this.BookToPreviewData = result  

      this.authors = result['authors']
      this.desc = result['desc']
      this.error = result['error']
      this.image = result['image']
      this.isbn10 = result['isbn10']
      this.isbn13 = result['isbn13']
      this.language =result['language']
      this.pages = result['pages']
      this.price = result['price']
      this.publisher = result['publisher']
      this.rating = result['rating']
      this.subtitle = result['subtitle']
      this.title = result['title']
      this.url = result['url']
      this.year = result['year']

      this.savetoHistory();
      
      if(result['pdf'] != undefined){ 
        this.PDF = result['pdf'] 
        this.PDFValues.push(this.PDF['Free eBook']) 
        this.HavePreview = true
      }
    },(error) => { 
      console.error(error);
    })   

  }
  
  share_facebook(value){
    value = value.replace('://','%3A%2F%2F')
    let Sharelink = "https://www.facebook.com/sharer/sharer.php?u="+value+"%2F&amp;src=sdkpreparse"
    console.log(Sharelink)
    window.open(Sharelink, '_blank') 
  }

  ngOnInit() {
  }

  public toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

  savetoHistory(){

    this.api_user.save_history(
      this.api_repo.UserProfile[0].id,
      this.isbn13,
      this.image,
      this.title,
      this.authors
    ).subscribe((result:any) =>{   
    });
  }
  getBook(){ 
    // save to database
    this.api_user.addFavorites(
      this.api_repo.UserProfile[0].id,
      this.isbn13,
      this.image,
      this.title,
      this.authors
    ).subscribe((result:any) =>{   
    });


    // to preview data
    this.api_user.fetchFavorites(
      this.api_repo.UserProfile[0].id
    ).subscribe((result:any) =>{   
      console.log(result)
    });

  }

}
