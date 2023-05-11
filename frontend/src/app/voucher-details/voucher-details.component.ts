import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Voucher } from '../voucher';
import { ActivatedRoute, Router } from '@angular/router';
import { VoucherService } from '../voucher.service';
import { FormControl, FormGroup} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
@Component({
  selector: 'app-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.css']
})
export class VoucherDetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute)
  voucher!:Voucher;
  applyForm = new FormGroup({
    kind: new FormControl(''),
    code: new FormControl(''),
    state: new FormControl(''),
    maxUse: new FormControl(''),
  });

  @ViewChild('picker') picker: any;
  @ViewChild('picker') picker1: any;

  public date!: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate!: moment.Moment;
  public maxDate!: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  public startControl = new FormControl(new Date(2021,9,4,5,6,7));
  public endControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());

  constructor(
    private voucherService:VoucherService,
    private router:Router
  ) {
   
    const voucher_id:number = this.route.snapshot.params['id'];   
    if (voucher_id !== undefined) {
      voucherService.getVoucherById(voucher_id).then((response) => {
        this.voucher = response.data
        console.log(this.voucher);
        
        this.applyForm.controls['code'].setValue(this.voucher.code)
        this.applyForm.controls['kind'].setValue(this.voucher.kind)
        this.applyForm.controls['state'].setValue(this.voucher.state.toString())
        this.applyForm.controls['maxUse'].setValue(this.voucher.maxUse.toString())
  
        this.startControl.setValue(new Date(this.voucher.start_date));
        this.endControl.setValue(new Date(this.voucher.end_date));
      })
    }
  }
  ngOnInit() {  }
  submitForm() {
    if(this.router.url === '/vouchers/create') {
      this.voucherService.createVoucher({
        code: this.applyForm.value.code!,
        kind: this.applyForm.value.kind!,
        maxUse: parseInt(this.applyForm.value.maxUse!),
        state: 1,
        start_date: this.startControl.value!.toISOString(),
        end_date: this.endControl.value!.toISOString(),
      }).then(
        (res) => {
          this.router.navigate(['/'])
        }
      )
      .catch((err) => {
        console.log(err);
        alert(err);
      })
    }else {
      this.voucherService.updateVoucher(this.voucher.voucher_id!,{
        code: this.applyForm.value.code!,
        kind: this.applyForm.value.kind!,
        maxUse: parseInt(this.applyForm.value.maxUse!),
        state: this.voucher.state,
        create_at: this.voucher.create_at,
        start_date: this.startControl.value!.toISOString(),
        end_date: this.endControl.value!.toISOString(),
      }).then(
        (res) => {
          this.router.navigate(['/'])
        }
      )
      .catch((err) => {
        alert(err)
      })
    }
    
  }
}
