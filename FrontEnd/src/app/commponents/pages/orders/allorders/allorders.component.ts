import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/providers/services/orders.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  allorders: any[] = []
  
  constructor(public _orders:OrdersService,private _router:Router) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    // this._orders.getOrders().subscribe(result => this.allorders = result.data)
    this._orders.getOrders().subscribe(result => this.allorders = result.data )
  }

}
