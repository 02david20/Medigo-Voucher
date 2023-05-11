import { Component, Input, OnInit } from '@angular/core';
import { Voucher } from '../voucher';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VoucherService } from '../voucher.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css'],
})
export class VoucherComponent implements OnInit {
  @Input() voucher!: Voucher;
  constructor(
    private router: Router, 
    private voucherService: VoucherService,
    public cookieService: CookieService
  ) {}
  ngOnInit(): void {}
  toDetail() {
    this.router.navigate(['/vouchers/detail', this.voucher.voucher_id]);
  }
  toggleState() {
    const id:number = this.voucher.voucher_id!;
    this.voucher.state = this.voucher.state == 1 ? 2 : 1;
    this.voucher.voucher_state = {id:this.voucher.state+1, value: this.voucher.voucher_state.value === "ACTIVE" ? "INACTIVE" : "ACTIVE"}
    
    const {voucher_state, ...upadtedVoucher} = this.voucher;
    console.log(upadtedVoucher);
    
    this.voucherService.updateVoucher(id,upadtedVoucher)
  }
}
