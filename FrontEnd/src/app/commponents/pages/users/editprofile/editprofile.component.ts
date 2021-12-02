import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserauthService } from 'src/app/providers/services/userauth.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  // isLoaded = false
  invalidData = false
  isSubmited = false
  useremail : any
  EditForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl( '', [Validators.required]),
  })

  get email() { return this.EditForm.get('email') }
  get password() { return this.EditForm.get('password') }
  get firstname() { return this.EditForm.get('firstname') }
  get lastname() { return this.EditForm.get('lastname') }
  get phone() { return this.EditForm.get('phone') }

  constructor(public _auth:UserauthService,private _router:Router) { }


  ngOnInit(): void {
    let url = this._router.url.split('/')
    this._auth.profile().subscribe(
      (res) => {
        this._auth.userData = res.data
        this._auth.isAuthed = true
        if (res.data.active && url.includes('activateaccount')) {
          this._router.navigateByUrl('/editprofile')
        }
      },
      (err) => { console.log(err) },
      () => {
        this.EditForm.patchValue(this._auth.userData)
      }
    )
  }

  handleForm() {
    this.isSubmited = true
    console.log({ ...this.EditForm.value, active: true });
    if(this.EditForm.valid){
      this._auth.editprofile({ ...this.EditForm.value, active: true }).subscribe(
        (res)=>{console.log(res)},
        (err)=>{console.log(err)},
      )
    }
  }

}
