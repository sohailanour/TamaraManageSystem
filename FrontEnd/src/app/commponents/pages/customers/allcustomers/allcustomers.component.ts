import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/providers/services/customers.service';

@Component({
  selector: 'app-allcustomers',
  templateUrl: './allcustomers.component.html',
  styleUrls: ['./allcustomers.component.css']
})
export class AllcustomersComponent implements OnInit {

  
  allcustomers: any[] = []
  
  constructor(public _customers:CustomersService,private _router:Router) { }

  ngOnInit(): void {
    this.getCustomers()
  }

  getCustomers() {
    this._customers.getCustomers().subscribe(result => {
      console.log(result.data)
      this.allcustomers = result.data
    })
    // this._customers.getCustomers().subscribe(result => console.log(result.data))

  }

  handelDelete(id:any){
    this._customers.deleteCustomer(id).subscribe(
      (res) => { console.log(res) },
      (err) => { console.log(err) },
      () => {
        // this._router.navigateByUrl('/customers')
        this.getCustomers()
      }
    )
  }

  // handelEdit(data:any) {
  //   this._customers.customerData = data
  //   this._router.navigateByUrl(`/customers/editcustomer`)
  // }

}
