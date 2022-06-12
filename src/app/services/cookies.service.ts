import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  private cookiesActive: boolean = true;
  private cookieTempMap: Map<string, string> = new Map<string, string>()

  constructor(private cookieService: CookieService) {
  }

  public save(name: string, value: string) {
    if (this.cookiesActive) {
      this.cookieService.set(name, value);
    } else {
      this.cookieTempMap.set(name, value);
    }
  }

  public load(name: string) {
    if (this.cookiesActive) {
      return this.cookieService.get(name);
    } else {
      return  this.cookieTempMap.get(name);
    }
  }

  /**
   * unset name is false
   * @param name
   */
  public loadBoolean(name: string): boolean {
    if (this.cookiesActive) {
      return this.cookieService.check(name) ?  JSON.parse(this.cookieService.get(name)) : false;
    } else {
      let s = this.cookieTempMap.get(name);
      return s == undefined ? false : JSON.parse(s);
    }
  }

  public get isCookiesActive() {
    return this.cookiesActive;
  }

  public setCookiesActive(value: boolean) {
    this.cookiesActive = value;
  }
}
