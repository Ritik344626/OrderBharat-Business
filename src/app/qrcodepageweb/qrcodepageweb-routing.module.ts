import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrcodepagewebPage } from './qrcodepageweb.page';

const routes: Routes = [
  {
    path: '',
    component: QrcodepagewebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrcodepagewebPageRoutingModule {}
