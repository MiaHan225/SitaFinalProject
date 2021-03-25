import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { RegisterService } from 'src/app/register.service';
// import { AuthService } from 'src/app/auth.service';

//import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
//import { User } from './user';

//import { CanComponentDeactivate } from '../../shared/interface/can-component-deactivate';
//import { CanDeactivateGuardService } from '../../shared/services/registerservice/can-deactivate-guard.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // registerForm: FormGroup;
  // registerFormInvalid = false;
  // fields = ["email", "password", "firstname", "lastname", "dob"]

  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";
  phone?: string = "";
  gender: string = "";
  dob: string = "";
  msg: string = "";
  msg2: string = "";
  myform!: FormGroup;

  constructor(private rs: RegisterService, 
              private router: Router,
              private route: ActivatedRoute) {

    this.myform = new FormGroup({
      firstname: new FormControl("", [Validators.required, Validators.minLength(3),
      Validators.maxLength(20), Validators.pattern("^[a-zA-Z]*$")]),
      lastname: new FormControl("", [Validators.required, Validators.minLength(3),
      Validators.maxLength(20), Validators.pattern("^[a-zA-Z]*$")]),
      email: new FormControl("", [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]),
      password: new FormControl("", [Validators.required, Validators.minLength(3),
      Validators.maxLength(20), Validators.pattern("^[a-zA-Z0-9]+$")]),
      phone: new FormControl("", [Validators.required, Validators.pattern("[- +()0-9]+")]),
      gender: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required])
    })

    // this.router.events.subscribe((event: Event) => {
      
    //   if (event instanceof NavigationStart) {
        
    //     if (!this.myform.valid && this.myform.untouched) {
    //       this.canNavigate = true;
    //     } else if(this.myform.valid){
    //       this.canNavigate = true;
    //     }else {
    //       this.canNavigate = false;
    //     }
    //   }
    //   // if (event instanceof NavigationEnd) {
    //   //   // Hide loading indicator
    //   // }
    
    //   // if (event instanceof NavigationError) {
    //   //   // Hide loading indicator
    
    //   //   // Present error to user
    //   //   console.log(event.error);
    //   // }
    // });
    //}
  }



  //@HostListener('window:beforeunload')

PostData() {
  if (this.myform.valid) {
    this.msg = "Hooray!! You have successful registered!"
    console.log(this.myform.value);
  
    this.myform.value["uid"] = this.myform.value.email
    console.log(this.myform.value);
  
    this.rs.register(this.myform.value).subscribe(
      (res: any) => {
        console.log(res);
  
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'login';
        this.router.navigateByUrl(returnUrl);
      },
      () => { console.log('Please Review Your Register Info'); }
    )
  } else {
    //this.canNavigate=false;
    this.msg = "Invalid";
  }
  }
  
  ngOnInit(): void {
  }
  
  
}




