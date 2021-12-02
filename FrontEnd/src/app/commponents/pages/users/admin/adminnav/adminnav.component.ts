import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from 'src/app/providers/services/userauth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {

  constructor(public _auth:UserauthService,private _router:Router) { }

  ngOnInit(): void {
    this._auth.adminAuth().subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        if (err.error.message = "unauthorized") this._router.navigateByUrl("/")
        else this._router.navigateByUrl("/notallowed")
      },
    ()=>{})
  }
}
