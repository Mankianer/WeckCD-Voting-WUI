import { Component, OnInit } from '@angular/core';
import {VotingService} from "../services/voting.service";

export interface Voting {
  id: number;
  name: string;
  links: string[];
  votes: number;
}

const VOTING: Voting[] = [
  {id: 1, name: 'Angular', links: ['https://angular.io/', 'https://angular-university.com/'], votes: 0},
  {id: 2, name: 'React', links: ['https://reactjs.org/', 'https://reactjs.org/'], votes: 0},
  {id: 3, name: 'Vue', links: ['https://vuejs.org/', 'https://vuejs.org/'], votes: 0},
  {id: 4, name: 'Polymer', links: ['https://polymer-project.org/', 'https://polymer-project.org/'], votes: 0},
  {id: 5, name: 'Svelte', links: ['https://svelte.dev/', 'https://svelte.dev/'], votes: 0},
  {id: 6, name: 'Angular Material', links: ['https://material.angular.io/', 'https://material.angular.io/'], votes: 0},
];


const MAX_VOTES = 5;
const MIN_VOTES = 0;

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'links', 'votes'];

  dataSource = VOTING;

  constructor(public voting: VotingService) { }

  ngOnInit(): void {
  }

  public voteUp(element: Voting) {
    if (element.votes < MAX_VOTES) {
      element.votes++;
    }
  }

  public voteDown(element: Voting) {
    if (element.votes > MIN_VOTES) {
      element.votes--;
    }
  }

  public sendVotes() {
    this.voting.sendVotes(this.dataSource);
  }
}
