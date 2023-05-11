import { Injectable } from '@angular/core';
import { Voucher } from './voucher';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  url = "http://localhost:3000/"

  async getVoucherCount() {
    return axios.get(this.url+"vouchers/count");
  }
  async getPage( offset:number, limit:number) {
    return axios.get(this.url+`vouchers?filter={"offset":${offset}, "limit": ${limit}, "include": [{"relation":"voucher_state"}]}`)
  }
  async getAllVoucher(){
    return axios.get(this.url+"vouchers"+`?filter={"include": [{"relation":"voucher_state"}]}`);
  }
  async getVoucherById(id:number) {
    const token = this.cookieService.get("jwt")
    return axios.get(
      this.url+"vouchers/"+id+`?filter={"include": [{"relation":"voucher_state"}]}`,
      {
        headers:{
          Authorization: "Bearer " +token
        }
      }
    )
  }
  async updateVoucher(id:number,voucher:any) {
    return axios.put(this.url+"vouchers/"+id, voucher)
  }
  async createVoucher(voucher:any) {
    return axios.post(this.url+"vouchers/", voucher);
  }
  constructor(private cookieService: CookieService) { }
  
  // submitChange(updateVoucher) {
  //   return axios.put(this.url+"vouchers"+`?filter={"include": [{"relation":"state"}]}`);
  // }
}
