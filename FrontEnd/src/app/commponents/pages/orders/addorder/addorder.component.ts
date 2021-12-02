import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CustomersService } from 'src/app/providers/services/customers.service';
import { OrdersService } from 'src/app/providers/services/orders.service';
import { ProductsService } from 'src/app/providers/services/products.service';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {

// ] customerId: {},
// code: {},
// request_date: {},
// from: { enum: ['Instagram', 'Facebook', 'whatsApp', 'Facebook Adds'] },
// products: [{productId: {},
// size: { enum: ['S', 'M', 'L', 'XL', 'XXL', 'XXXl'], type: String },
// color: {},
// status: { enum: ['Done', 'Recall', 'Cancel', 'Inprogress'], type: String, default: 'Inprogress' },
// quantity: { type: Number, default: 1 }}],
// notes: { type: String },
// shippingBy: { type: String },
// delivery_date: {type: Date}, -
  allproducts:any = []
  allcustomer:any = []
  
  prodColors: any = "Choose Product ..."
  prodCoId: any = "Choose Color ..."

  // productSelected = this.allproducts.find((ps) => ps['_id'] == this.prodId)
  
  isSubmitted: Boolean = false
  isEditProcess = false
  myForm = new FormGroup({
    customerId: new FormControl('Choose Customer Phone ...',[Validators.required]),
    code: new FormControl('',[Validators.required]),
    request_date: new FormControl(''),
    from: new FormControl('Choose from ...',[Validators.required]),
    products: new FormArray([new FormGroup({
      productname: new FormControl('Choose Product ...',Validators.required),
      productId: new FormControl('Choose Product ...',Validators.required),
      // color: new FormControl('',[Validators.required]),
      size: new FormControl('Choose Size ...', [Validators.required]),
      status: new FormControl('Inprogress',[Validators.required]),
      quantity: new FormControl(1,[Validators.required]),
    })]),
    notes: new FormControl(''),
    delivery_date : new FormControl(''),
    shippingBy: new FormControl(''),
  })

  get customerphone(){return this.myForm.get('customerphone')}
  get code(){return this.myForm.get('code')}
  get request_date() { return this.myForm.get('request_date') }
  get from() { return this.myForm.get('from') }
  
  get products(): FormArray {
    return this.myForm.get('products') as FormArray;
  }

  // get product() { return this.products.at(0).get('product') }
  // get productname() { return this.products.at(0).get('productname') }
 
  constructor(private _orders:OrdersService,private _products:ProductsService,private _customers:CustomersService) { }

  ngOnInit(): void {

    this._products.getProducts().subscribe(result => {
      console.log(result.data)
      this.allproducts = result.data
    })
    this._customers.getCustomers().subscribe(result => this.allcustomer = result.data)

    // console.log(this._orders.orderData)
    // if (this._orders.orderData) {
    //   this.isEditProcess = true
    //   for (let i = 1; i < this._orders.orderData.products.length; i++){
    //       this.addFormGroup()
    //   }
    //   this.myForm.patchValue(this._orders.orderData)
    // }
  } 
 
  addFormGroup() {
      this.products.push(new FormGroup({
      productname: new FormControl('Choose Product ...',Validators.required),
      productId: new FormControl('Choose Product ...',Validators.required),
      // color: new FormControl('',[Validators.required]),
      size: new FormControl('Choose Size ...', [Validators.required]),
      status: new FormControl('Inprogress',[Validators.required]),
      quantity: new FormControl(1,[Validators.required]),
    }));
  }

  removeFormGroup() {
    if (this.products.length != 1) this.products.removeAt(this.products.length - 1)
  }

  confirmData() {
    this.isSubmitted = true
    console.log(this.myForm.value)
     this._orders.addOrder(this.myForm.value).subscribe(
        (result) => { console.log(result) },
        (err) => {console.log(err)},
        ()=>{this.isSubmitted = false})
      // this.myForm.reset()

    // if (this.isEditProcess) {
    //   this._orders.editOrder(this._orders.orderData._id, this.myForm.value).subscribe(
    //     (res) => { console.log(res) },
    //     (err) => { console.log(err) },
    //     () => {
    //         this.isSubmitted = false
    //     }
    //   )
    // }
    // else {
     
    // }
  }

}
