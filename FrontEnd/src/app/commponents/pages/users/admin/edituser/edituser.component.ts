import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserauthService } from 'src/app/providers/services/userauth.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  randomstring = ''
  invalidData = false
  isSubmited = false
  staffData: any
  staffId : any

  EditForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
  })

  get email(){return this.EditForm.get('email')}
  get password(){return this.EditForm.get('password')}
  get role() { return this.EditForm.get('role') }
  // set password(value) { this.EditForm.setValue({ password: value }) }

  constructor(private _auth: UserauthService, private _router: Router) { }

  ngOnInit(): void {
    const url = this._router.url.split('/')
    this.staffId = url[url.length - 1]
    this._auth.getuser(this.staffId).subscribe(
      (res) => {
        console.log(res)
        this.EditForm.patchValue(res.data)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  handelEdit() {
    this.isSubmited = true
    console.log(this.EditForm.value)
    if(this.EditForm.valid){
      this._auth.edituser(this.staffId,this.EditForm.value).subscribe(
        (res) => {
          this.staffData = this.EditForm.value
        },
        (err) => {
          this.invalidData = err.error.message;},
        () => {
          this.EditForm.reset()
          this.isSubmited = false
        }
      )
    }
  }

  generatePass() {
    this.randomstring = Math.random().toString(36).slice(-8)
    this.EditForm.setControl("password", new FormControl(this.randomstring))
  }
}
