import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserauthService } from 'src/app/providers/services/userauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  invalidData = false
  isSubmited = false
  LoginForm = new FormGroup({
    email: new FormControl( 'sohailanour@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl( '1234', [Validators.required]),
  })

  get email(){return this.LoginForm.get('email')}
  get password(){return this.LoginForm.get('password')}

  constructor(public _auth:UserauthService,private _router:Router) { }

  ngOnInit(): void {
    // this._auth.profile().subscribe(
    //   (res) => {
    //       this._auth.userData = res.data
    //       this._auth.isAuthed = true
    //   },
    //   (err) => {
    //     console.log("from login : ",err.error.message)
    //   },
    //   () => {
    //       // if (!this._auth.userData.active) this._router.navigateByUrl("/activateaccount")
    //       // else if(this._auth.userData.role == "Admin") this._router.navigateByUrl("/products")
    //       // else this._router.navigateByUrl("/profile")
    //   }
    // )
  }

  handelLogin() { 
    this.isSubmited = true
    if(this.LoginForm.valid){
      this._auth.loginUser(this.LoginForm.value).subscribe(
        (res) => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          this._auth.userData = res.data.user
          this._auth.isAuthed = true
          if (res.data.user.active == false) this._router.navigateByUrl("/activateaccount")
          else if(res.data.user.role == "Admin") this._router.navigateByUrl("/products")
          else this._router.navigateByUrl("/profile")
        },
        (err) => {
          console.log("login error")
          console.log(err.error.message)
          this.invalidData = err.error.message;},
        () => {
          this.LoginForm.reset()
          this.isSubmited = false
          // localStorage.setItem('token', res.data.token)
        }
      )
    }
  }

}
