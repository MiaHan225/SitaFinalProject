import { Injectable, Inject } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Router, Routes } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    console.log(user);
    return this.http.post(`https://alakart.cloud/training/user/regist?info={"uid":"${user.email}","password":"${user.password}","phone":"${user.phone}",
    "gender":"${user.gender}","firstname":"${user.firstname}","lastname":"${user.lastname}","email":"${user.email}","dob":"${user.dob}","status":"${user.status}"}`,{});
}
}



