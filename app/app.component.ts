import { Component } from '@angular/core';
import { Http,Headers, Response, RequestOptions } from '@angular/http';
// import {HTTP_PROVIDERS} from '@angular/http';
// import { WikipediaService } from './wikipedia.service';



@Component({
    selector: 'my-app',
    template: `
                <div class="col-md-12">
                    <h1 class="text-center"> Team Project Choices</h1>
                    <div class="text-center center-block form-group">
                        <label>Team letter</label>
                        <input #team class="form-control"
                            placeholder="e.g. A" (keyup)="teamLetter(team.value)">
                    </div>
                    <div class="text-center center-block form-group">
                        <label>Student ID</label>
                        <input class="form-control"
                            placeholder="e.g. 2112345a" #student (keyup)="studentID(student.value)">
                    </div>

                    <div class="center-block" *ngFor="let choice of choices; let i=index">
                        <label >Choice {{i+1}}</label>
                        <div class="dropdown">
                          <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu{{i}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            {{choices[i]}}
                            <span class="caret"></span>
                          </button>
                          <ul class="dropdown-menu">
                            <li class="choice" *ngFor="let client of clients; let j=index">
                              <a href="#!" (click)="select(i,j)">{{client}}</a>
                            </li>
                          </ul>
                        </div>
                    </div>
                </div>
                <div class="btn btn-primary" (click)="submit()">
                    Submit
                </div>
                `,
                // <div *ngFor="let choice of choices; let i = index" class="form-group">
                // <label>Choice {{i+1}}</label>
                // <input class="form-control" [(ngModel)]="choices[i]"
                // placeholder="Choice {{i+1}}">
                // </div>
    styles:[`
            li.choice{
                padding: 3px 10px;
            }
            li.choice > a{
                padding: 0 10px;
                border-bottom-width: 1px;
                border-bottom-color: #d4cfcf;
                border-bottom-style: solid;
                word-wrap: break-word;
                white-space: pre-line;
            }
            div.dropdown{
                margin-bottom: 20px;
            }
            div.center-block > *{
                display: block;
                margin-right: auto;
                margin-left: auto;
            }
            .form-control, ul.dropdown-menu{
                max-width: 50vw;
            }
            `],
    providers: []
})
export class AppComponent {
    team_letter:string;
    student_id:string;
    num_of_choices:number = 8;
    choices:string[] = [];
    clients:string[] = [
        "ResDiary",
        "Metix Medical",
        "Jillian Law, YMCA - Mentor Link",
        "The Princes Trust, Jason Moor",
        "Avaloq, Oliver Howell",
        "George Noakes, NHS Dumfries and Galloway",
        "Carolyn Watson and Dave Groves (NHS Dumfries & Galloway)",
        "Global Rugby Network, Stefan Raue",
        "Opinew, Tomasz Sadowski",
        "IT Services UofG, Anna Phelan, Matt Cowan",
        "Cairn Solutions, John Breslin",
        "Adam Smith Business School, Rob Dekkers",
        "Cosneta, Ross Maclean",
    ];
    constructor (private http: Http) {}

    ngOnInit(){
        for(let i=0;i<this.num_of_choices;i++)
        {
            this.choices.push("choose");
        }
    }

    select(choice_number:number, client_index:number){
        if(this.choices[choice_number]!="choose")
            this.clients.push(this.choices[choice_number]);
        this.choices[choice_number]=this.clients[client_index];
        this.clients.splice(client_index,1);
        // console.log(this.clients);
    }
    submit(){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let choices = {};
        for(let i=0;i<this.num_of_choices;i++)
            choices[""+i]=this.choices[i];
        let student_id=this.student_id;
        let team_letter=this.team_letter;
        // console.log(options);
        return this.http.post("http://127.0.0.1:5000/hello", {student_id,team_letter, choices }, options).subscribe(data=>{});
    }

    studentID(num:string){
        this.student_id=num;
    }
    teamLetter(l:string){
        this.team_letter=l;
    }
}
