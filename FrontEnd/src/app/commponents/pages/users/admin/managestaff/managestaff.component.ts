import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from 'src/app/providers/services/userauth.service';

@Component({
  selector: 'app-managestaff',
  templateUrl: './managestaff.component.html',
  styleUrls: ['./managestaff.component.css']
})
export class ManagestaffComponent implements OnInit {

  constructor(public _auth:UserauthService,private _router:Router) { }

  allusers: any[] = []
  
  ngOnInit(): void {
    this._auth.adminAuth().subscribe(
      (res) => {
        console.log(res.data)
        this.allusers = res.data
    })
  }

  deleteUser(id:any) {
    console.log("id:",id)
    this._auth.deleteUser(id).subscribe(
      (res) => {
        this.allusers = this.allusers.filter(u => u._id != id)
       },
      (err) => {console.log(err)}
    )
  }

  edituser(id: any) {
    this._router.navigateByUrl(`/staff/edituser/${id}`)
  }
}

