import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/providers/services/products.service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {

  allproducts: any[] = []
  
  constructor(public _products:ProductsService,private _router:Router) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this._products.getProducts().subscribe(result => this.allproducts = result.data)
  }

  handelDelete(id:any){
    this._products.deleteProduct(id).subscribe(
      (res) => { console.log(res) },
      (err) => { console.log(err) },
      () => {
        // this._router.navigateByUrl('/products')
        this.getProducts()
      }
    )
  }

  handelEdit(data:any) {
    this._products.productData = data
    this._router.navigateByUrl(`/products/editproduct`)
  }
}
