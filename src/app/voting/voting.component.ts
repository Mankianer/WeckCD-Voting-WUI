import { Component, OnInit } from '@angular/core';
import {Voting, VotingService} from "../services/voting.service";
import {CookiesService} from "../services/cookies.service";




const MAX_POINTS_EACH = 5;
const MIN_POINTS_EACH = 0;
const MAX_POINTS = 30;
const MIN_POINTS = 0;

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title','interpret', 'links', 'votes'];

  dataSource: Voting[] = [];
  summe: Voting | undefined = undefined;

  constructor(public voting: VotingService) {
     this.voting.votings.subscribe(value => this.dataSource = value);
     this.voting.summe.subscribe(value => this.summe = value);
  }

  ngOnInit(): void {
  }

  public voteUp(element: Voting) {
    if(this.summe !== undefined){
      if (element.points < MAX_POINTS_EACH && this.summe.points < MAX_POINTS) {
        element.points++;
        this.summe.points++;
        this.voting.saveVotes(this.dataSource);
      }
    }
  }

  public voteDown(element: Voting) {
    if(this.summe !== undefined) {
      if (element.points > MIN_POINTS_EACH && this.summe.points > MIN_POINTS) {
        element.points--;
        this.summe.points--;
        this.voting.saveVotes(this.dataSource);
      }
    }
  }

  public sendVotes() {
    this.voting.saveVotes(this.dataSource);
    this.voting.sendVotes(this.dataSource);
  }
}
