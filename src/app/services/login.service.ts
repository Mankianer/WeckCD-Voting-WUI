import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isSignIn: boolean = false;

  constructor() { }

  public isLoggedIn(): boolean {
    return this.isSignIn;
  }

  public loggIn(username: string | undefined | null, password: string | undefined | null): boolean {
    if(password == 'user') {
      return this.isSignIn = true;
    }
    return false;
  }

  public loggOut(){
    this.isSignIn = false;
  }
}
