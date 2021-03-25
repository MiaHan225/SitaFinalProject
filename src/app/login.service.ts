import { Injectable, Inject } from '@angular/core';
import { Observable, Observer, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';
import { LoginStatusService } from './login-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // constructor(@Inject(HttpClient) private http:HttpClient) { }
  // getUsers(uid: any, password:any): Observable<User[]>{
  //   return this.http.get<User[]>
  //   // ("http://alakart.cloud/training/user/logon?usr="+uid+"&password="
  //   // +password+"",{responseType:"json"})
  //   (`https://alakart.cloud/training/user/logon?usr=${uid}&password=${password}`,{responseType:"json"})
  // }
  private userSubject!: BehaviorSubject<any>;
  public user!: Observable<User>;

  constructor(
     private http: HttpClient,
     public LoginStatusService: LoginStatusService,
     private router: Router,
     private route: ActivatedRoute) 
    {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
  }

  getUsers(uid: any, password: any): Observable<User[]> {
  
    return this.http.get<User[]>(`https://alakart.cloud/training/user/logon?usr=${uid}&password=${password}`, { responseType: "json" })
      .pipe(map(user => {
        if (uid && password) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }
        return user;
      }));
  }
  // can also use link format below
  // `https://alakart.cloud/training/user/logon?usr=${uid}&password=${password}`, 

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.LoginStatusService.isLoggedIn = false;
    this.userSubject.next(null);
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'login';
    this.router.navigateByUrl(returnUrl);
  }

  update(user: any){
    console.log(user);
    return this.http.post(`https://alakart.cloud/training/user/update?usr=${user.uid}&info={"uid":"${user.email}","firstname":"${user.firstname}","lastname":"${user.lastname}","email":"${user.email}","password":"${user.password}","phone":"${user.phone}","gender":"${user.gender}","dob":"${user.dob}"}`,{})
  }

  delete(uid: string){
    console.log(uid);
    return this.http.post(`https://alakart.cloud/training/user/update?usr=${uid}&info={"status":"inactive"}`,{})
        .pipe(map(x => {
            // auto logout if the logged in user deleted their own record
            if (uid == this.userValue.username) {
                this.logout();
            }
            return x;
        }));
  }

  active(uid: string){
    console.log(uid);
    return this.http.post(`https://alakart.cloud/training/user/update?usr=${uid}&info={"status":"active"}`,{})
  }

}
