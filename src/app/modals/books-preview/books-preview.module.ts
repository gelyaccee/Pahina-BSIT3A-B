import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksPreviewPageRoutingModule } from './books-preview-routing.module';

import { BooksPreviewPage } from './books-preview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksPreviewPageRoutingModule
  ],
  declarations: [BooksPreviewPage]
})
export class BooksPreviewPageModule {}
