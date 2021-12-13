import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router'; 
import { BooksService } from '../../services/books.service'; 
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
    private api_repo: RepositoryService) {
     this.view(api_repo.BookstoPreview['isbn13']); 
    }
  
   view(isbn){
    this.api_login.previewBook(isbn).subscribe((result:any) =>{   
      this.BookToPreviewData = result 
      console.log(this.BookToPreviewData)

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

      if(result['pdf'] != undefined){ 
        this.PDF = result['pdf'] 
        this.PDFValues.push(this.PDF['Free eBook'])
        this.HavePreview = true
      }
    },(error) => { 
      console.error(error);
    })   

  }
  
 

  ngOnInit() {
  }

  public toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

}
