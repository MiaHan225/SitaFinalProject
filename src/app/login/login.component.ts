import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { LoginStatusService } from '../login-status.service';
import { LoginService } from 'src/app/login.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Observable, Observer } from 'rxjs';
import { first } from 'rxjs/operators'

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  msg: string = "";
  loginStatus: boolean;
  uid: string = "";
  //users: [] = [];
  // CheckLogin(txt1:any){
  //   if(this.username == "admin" &&this.password == "manager"){
  //     this.msg = "Successful Login";
  //   } else {
  //     this.msg = "Invalid Login";
  //     txt1.focus();
  //   }
  // }

  constructor(
    private loginService: LoginService,
    public loginStatusService: LoginStatusService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginStatus = this.loginStatusService.isLoggedIn;
  }

  // CheckLogin(txt1:any){
  //   if (this.username == "Mia" && this.password == "App") {
  //     this.msg = "Hello Member!";
  //     this.loginStatusService.isLoggedIn = true;
  //     this.loginStatus = true;
  //   } else {
  //     this.msg = "Please review login info.";
  //     this.loginStatusService.isLoggedIn = false;
  //     this.loginStatus = false;
  //     txt1.focus();
  //   }
  // }
  // ngOnInit(): void {
  //   // document.body.classList.add('bg-img1');
  // }

  CheckLogin(txt1: any) {
    this.loginService.getUsers(this.uid, this.password)
    .pipe(first())
    .subscribe(
      (response: any) => { 
        if (!response.error&&response['status']==='active'){
          console.log(response);
          this.msg = "Success Login"
          this.loginStatusService.isLoggedIn = true;
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'user';
          this.router.navigateByUrl(returnUrl);
          //this.myobserver.next(res)
        } else {
          this.msg = "Invalid Login"
          this.loginStatusService.isLoggedIn = false;
          txt1.focus();
      // (response: any) => { 
      //   console.log(response);

      //   if (!response.error){
      //     this.msg = "Success Login"
      //     this.loginStatusService.isLoggedIn = true;
      //     const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'user';
      //     this.router.navigateByUrl(returnUrl);
      //     //this.myobserver.next(res)
      //   } else {
      //     this.msg = "Invalid Login"
      //     this.loginStatusService.isLoggedIn = false;
      //     txt1.focus();
        }
      },
      (error: any) => { alert(error); }
    )
    // for (var i = 0; i < this.users.length; i++){
    //   if (this.users(uid) == this.uid && this.users["password"] == this.password){
    //     this.msg = "Success Login"
    //     this.LoginStatusService.isLoggedIn = true;
    //   } else {
    //     this.msg = "Invalid Login"
    //     this.LoginStatusService.isLoggedIn = false;
    //      txt1.focus();
    //   }
    // }
  }



  Logout() {
    this.loginStatusService.isLoggedIn = false;
  }

  ngOnInit(): void {
  }

}
 
