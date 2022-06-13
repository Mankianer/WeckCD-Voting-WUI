import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "./cookies.service";

export interface Vote {
  id: number;
  votes: number;
}

const HAS_VOTET_COOKIE = "hasVoted";

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private loginService: LoginService, private http: HttpClient, private cookies: CookiesService) { }

  public sendVotes(votes: Vote[]) {
    console.log(votes);
    this.cookies.save(HAS_VOTET_COOKIE, true.toString());
    // return this.http.post("http://localhost:8080/api/votes", votes);
  }

  public hasVoted(){
    return this.cookies.loadBoolean(HAS_VOTET_COOKIE);
  }
}
