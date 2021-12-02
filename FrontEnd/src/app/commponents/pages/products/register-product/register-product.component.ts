import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/providers/services/products.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {
  isSubmitted: Boolean = false
  isEditProcess = false
  myForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    code: new FormControl(''),
    season: new FormControl(),
    colors: new FormArray([new FormGroup({
      color: new FormControl(),
      quantity: new FormControl(),
    })]),
  })

  constructor(private _products:ProductsService) { }

  ngOnInit(): void {
    // console.log(this._products.productData)
    if (this._products.productData) {
      this.isEditProcess = true
      for (let i = 1; i < this._products.productData.colors.length; i++){
          this.addFormGroup()
      }
      this.myForm.patchValue(this._products.productData)
    }
  }
  
  get name(){return this.myForm.get('name')}
  get code(){return this.myForm.get('code')}
  get season() { return this.myForm.get('season') }
  get colors(): FormArray {
    return this.myForm.get('colors') as FormArray;
  }
  quantity(i:number) { return this.colors.at(i).get('quantity') }
  color(i:number) { return this.colors.at(i).get('color') }

  addFormGroup() {
      this.colors.push(new FormGroup({
      color: new FormControl(),
      quantity: new FormControl(),
    }));
  }

  removeFormGroup() {
    if (this.colors.length != 1) this.colors.removeAt(this.colors.length - 1)
  }

  confirmData() {
    this.isSubmitted = true
    if (this.isEditProcess) {
      this._products.editProduct(this._products.productData._id, this.myForm.value).subscribe(
        (res) => { console.log(res) },
        (err) => { console.log(err) },
        () => {
            this.isSubmitted = false
        }
      )
    }
    else {
      this._products.register(this.myForm.value).subscribe(
        (result) => { console.log(result) },
        (err) => {console.log(err)},
        ()=>{this.isSubmitted = false})
      this.myForm.reset()
    }
  }

}
