import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from 'src/app/providers/services/userauth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoaded = false

  constructor(public _auth:UserauthService,private _router:Router) { }

  ngOnInit(): void {
    this._auth.profile().subscribe(
      (res) => {
        this._auth.userData = res.data
        this._auth.isAuthed = true
        console.log("navar")

      },
      (err) => {
        this.isLoaded = true
        this._auth.isAuthed = false
        this._auth.userData = null
        this._router.navigateByUrl("/login")
        // console.log("from navbar : ", err.error.message)
      },
      () => {
    
        console.log(this._auth.userData)
        this.isLoaded=true
      }
    )
  }

  logout() {
    console.log("from navbar logout")
    this._auth.logout().subscribe(
      (res) => {
        this._auth.userData = null
        this._auth.isAuthed = false
      },
      (err) => {
        console.log("logout err : ",err)
      },
      () => {
        localStorage.removeItem('token')
        this._router.navigateByUrl("/login")
      })
  }
}
