import { Component, inject } from '@angular/core';
import { VoucherComponent } from '../voucher/voucher.component';
import { CommonModule } from '@angular/common';
import { VoucherService } from '../voucher.service';
import { Voucher } from '../voucher';
import { Router } from '@angular/router';
import { map, reduce } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css']
})
export class VouchersComponent {
  voucherService : VoucherService = inject(VoucherService);
  voucherList:Voucher[] = []
  count:number = 0;
  pageOffset : number[] = []
  pageLimit:number = 2;

  offsetForm = new FormControl(1)
  chosen : number = 0;
  constructor(private router: Router, public cookieService:CookieService) {
    
    this.offsetForm.setValue(this.pageLimit);
    this.voucherService.getVoucherCount().then(response => {
      {
        this.count = response.data.count;
        for(let i = 0 ; i < this.count; i += this.pageLimit) {
          this.pageOffset.push(i);
        }
        this.voucherService.getPage(0,this.pageLimit).then(response => {
          this.voucherList = response.data;     
          console.log(this.voucherList); 
        });
      }
    })
  }
  
  getPage(offset:number) {
    this.voucherService.getPage(offset, this.pageLimit).then(response => {
      this.voucherList = response.data;
    })
    this.chosen = offset / this.pageLimit;
  }

  createVoucher() {
    this.router.navigate(['vouchers/create'])
  }

  update() {
    this.pageLimit = this.offsetForm.value!;
    this.pageOffset = []
    for(let i = 0 ; i < this.count; i += this.pageLimit) {
      this.pageOffset.push(i);
    }
    this.voucherService.getPage(0,this.pageLimit).then(response => {
      this.voucherList = response.data;     
      console.log(this.voucherList); 
    });
  }

  toLogin() {
    this.router.navigate(["users/login"])
  }
  logout() {
    this.cookieService.delete("jwt")
  }
}
