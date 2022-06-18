import {EventEmitter, Injectable, Output} from '@angular/core';
import {LoginService} from "./login.service";
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "./cookies.service";

export interface Voting {
  id: number;
  title: string;
  interpret: string;
  links: string[];
  link: string;
  points: number;
  isSumme: boolean;
}

const HAS_VOTET_COOKIE = "hasVoted";
const VOTING_COOKIE_NAME = "voting-cookie-";

export class Points {
  constructor(public id: number, public points: number) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  @Output() votings = new EventEmitter<Voting[]>();
  @Output() summe = new EventEmitter<Voting>();

  constructor(private loginService: LoginService, private http: HttpClient, private cookies: CookiesService) {
      http.get<Voting[]>("/assets/votes.json").subscribe((value) => {
        value.forEach(element => {
          if (this.cookies.exists(VOTING_COOKIE_NAME + element.id)) {
            element.points = parseInt(this.cookies.load(VOTING_COOKIE_NAME + element.id));
          }else {
            element.points = 0;
          }
          if (element.interpret === "GESAMTPUNKTZAHL") {
            element.isSumme = true;
            this.summe.emit(element);
            return
          }
          element.links = [element.link];
          element.isSumme = false;
        });
        this.votings.emit(value);
      });
    // } else {
    //   let text = this.cookies.load(VOTING_COOKIE_NAME);
    //   if(typeof text === "string") {
    //     this.votings.emit(JSON.parse(text));
    //   }
    // }
  }

  public sendVotes(votes: Voting[]) {
    this.cookies.save(HAS_VOTET_COOKIE, true.toString());
    // return this.http.post("http://localhost:8080/api/votes", votes);
  }

  // public getVotes() {
  //   return this.votings;
  // }

  public hasVoted() {
    return this.cookies.loadBoolean(HAS_VOTET_COOKIE);
  }



  public saveVotes(votes: Voting[]) {
    let points = votes.map((vote) => new Points(vote.id, vote.points));
    points.forEach((point) => {
      this.cookies.save(VOTING_COOKIE_NAME + point.id, point.points.toString());
    });
  }
}
