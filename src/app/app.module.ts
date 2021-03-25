import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { LoginService } from './login.service';
import { LoginAuthService } from './login-auth.service';
import { LoginStatusService } from './login-status.service';
import { RegisterService } from './register.service';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { CanDeactivateService } from './can-deactivate.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from './material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { HomeComponent } from './home/home.component';

const myroutes: Routes =[
  { path:'', component: RegisterComponent, canDeactivate: [CanDeactivateService]},
  { path:'login', component: LoginComponent
    //,canActivate:[LoginAuthService]
  },
  { path:'user', component: UserComponent, 
  //canActivate:[LoginAuthService]
  }
]; 

const myroutes2 = RouterModule.forRoot(myroutes)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    DialogComponent,
    HomeComponent
    //MatSliderModule
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    myroutes2,
    BrowserAnimationsModule,
    MaterialModule,
    MatButtonModule
  ],
  providers: [LoginService, LoginAuthService, LoginStatusService, RegisterService, UserService, CanDeactivateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
