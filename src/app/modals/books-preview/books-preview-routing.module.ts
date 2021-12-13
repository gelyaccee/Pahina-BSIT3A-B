import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksPreviewPage } from './books-preview.page';

const routes: Routes = [
  {
    path: '',
    component: BooksPreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksPreviewPageRoutingModule {}
