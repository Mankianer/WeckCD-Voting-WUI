import { Injectable } from '@angular/core';
import {CookiesService} from "./cookies.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private cookies: CookiesService) {
  }

  private readonly loginCookieName = "isSignIn";

  public isLoggedIn(): boolean {
    console.log(this.cookies.loadBoolean(this.loginCookieName))
    return this.cookies.loadBoolean(this.loginCookieName);
  }

  public loggIn(username: string | undefined | null, password: string | undefined | null): boolean {
    if(password == 'user') {
      this.cookies.save(this.loginCookieName, true.toString());
      return true;
    }
    return false;
  }

  public loggOut(){
    this.cookies.save(this.loginCookieName, false.toString());
  }
}
