import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VouchersComponent } from './vouchers/vouchers.component';
import { VoucherDetailsComponent } from './voucher-details/voucher-details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: VouchersComponent,
    title: 'Voucher Page'
  },
  {
    path: 'vouchers/detail/:id',
    component: VoucherDetailsComponent,
    title: 'Voucher Detail'
  },
  {
    path: 'vouchers/create',
    component: VoucherDetailsComponent,
    title: 'Voucher Create'
  },
  {
    path: 'users/login',
    component: LoginComponent,
    title: 'Voucher Create'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
