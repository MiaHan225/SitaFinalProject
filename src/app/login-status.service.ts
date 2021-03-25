import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  isLoggedIn: boolean = false;

  constructor() { }
  
}
