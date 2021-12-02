import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from 'src/app/providers/services/userauth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public _auth:UserauthService,private _router:Router) { }

  ngOnInit(): void {
  // console.log(this._auth.userData)
    // if (!this._auth.userData.active) this._router.navigateByUrl("/activateaccount")
  }

  
}
