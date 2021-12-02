import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from 'src/app/providers/services/customers.service';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
  
export class AddcustomerComponent implements OnInit {

  isSubmitted: Boolean = false
  // isEditProcess = false

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    rate: new FormControl(),
    address: new FormGroup({
      city:new FormControl('',Validators.required),
      area:new FormControl('',Validators.required),
      details:new FormControl('',Validators.required)
    }),
    phones: new FormArray([new FormGroup({
      phone: new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    }),new FormGroup({
      phone: new FormControl(),
    })]),
  })
  
  constructor(public customer: CustomersService) { }
  
  get name() { return this.myForm.get('name') }
  get rate() { return this.myForm.get('rate') }
  get city() { return this.myForm.get('address.city') }
  get area() { return this.myForm.get('address.area') }
  get details() { return this.myForm.get('address.details') }
  get phones(): FormArray {
    // console.log((this.myForm.get('phones') as FormArray).value)
    return ((this.myForm.get('phones') as FormArray));
  }
  
  get phone1() {
    // console.log(this.phones.get('0'))
    return this.phones.at(0).get('phone')
  }
  // get phone2() { return this.phones.value.at(1).get('phone') }

  phone(i:number) { return this.phones.at(i).get('phone') }
  
  ngOnInit(): void {
  }

  confirmData() {
    this.isSubmitted = true
    // if (this.isEditProcess) {
    //   this._products.editProduct(this._products.productData._id, this.myForm.value).subscribe(
    //     (res) => { console.log(res) },
    //     (err) => { console.log(err) },
    //     () => {
    //         this.isSubmitted = false
    //     }
    //   )
    // }
    // else {
    if (!this.myForm.value.phones[1].phone) this.myForm.value.phones.splice(1)
    this.customer.addCustomers(this.myForm.value).subscribe(
      (result) => { console.log(result) },
      (err) => {console.log(err)},
      ()=>{this.isSubmitted = false})
    this.myForm.reset()
    // }
  }

}
