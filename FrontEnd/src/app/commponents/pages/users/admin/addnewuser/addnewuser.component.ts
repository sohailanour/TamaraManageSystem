import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserauthService } from 'src/app/providers/services/userauth.service';
// import { pseudoRandomBytes, randomFill, randomInt } from 'crypto';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.css']
})
export class AddnewuserComponent implements OnInit {

  randomstring = Math.random().toString(36).slice(-8)
  invalidData = false
  isSubmited = false
  userData :any

  RegisterForm = new FormGroup({
    email: new FormControl('hanaanour@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl(this.randomstring, [Validators.required]),
    role: new FormControl('', [Validators.required]),
  })

  get email(){return this.RegisterForm.get('email')}
  get password(){return this.RegisterForm.get('password')}
  get role(){return this.RegisterForm.get('role')}

  constructor(private _auth: UserauthService, private _router: Router) { }

  ngOnInit(): void {
  }

  handelRegister() {
    this.isSubmited = true
    if(this.RegisterForm.valid){
      this._auth.registerAuth(this.RegisterForm.value).subscribe(
        (res) => {
          this.userData = this.RegisterForm.value
        },
        (err) => {
          this.invalidData = err.error.message;},
        () => {
          this.RegisterForm.reset()
          this.isSubmited = false
        }
      )
    }
  }

}
