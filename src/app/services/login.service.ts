import { Injectable } from '@angular/core';
import {CookiesService} from "./cookies.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private cookies: CookiesService, private http: HttpClient) {
  }

  private readonly loginCookieName = "isSignIn";
  private readonly token = 'token';

  public isLoggedIn(): boolean {
    return this.cookies.loadBoolean(this.loginCookieName);
  }


  public loggIn(username: string | undefined | null, password: string | undefined | null): boolean {
    let param: any = {'cookies': this.cookies.isCookiesActive};
    this.http.post<string>("http://localhost:8080/token", {username: username, password: password}, {params: param }).subscribe((value) => {
      this.cookies.save(this.token, value);
      this.cookies.save(this.loginCookieName, true.toString());
    });
    this.cookies.save(this.loginCookieName, true.toString());
    return true;
  }

  public loggOut(){
    this.cookies.save(this.loginCookieName, false.toString());
  }
}
