import { Component, Inject, NgModule } from '@angular/core';
import { CoachService } from 'src/app/service/coach/coach.service';
import { Coach } from 'src/app/models/coach.model';

export interface Group {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent {
  public coachs: Coach[] = [];
  public coachsMatch: Coach[] = [];
  viewMatch: boolean = true;
  viewChat: boolean = false;
  newMsg!: string;
  addressee!: string;
  coachLogged: string = "id";
  messages: any[] = [{
    transmitter: "Other",
    text: "Hola, ¿cómo estás?",
  }];

  constructor(public coachService: CoachService) { 
  }

  ngOnInit(): void {
    this.getcoachs();
  }

  chargeViewMatch(person: string) {
    console.log(person);
    this.viewMatch = !this.viewMatch;
    this.viewChat = !this.viewChat;
    this.addressee = person;
  }

  getcoachs() {
    this.coachService.getAllCoachs().subscribe( (response: any) => {
      console.log(response);
      this.coachsMatch = response;
      this.coachs.push(this.coachsMatch[0]);
    });
  }

  sendMsg() {
    if(this.newMsg == "") return;

    let message = {
      transmitter: this.coachLogged,
      text: this.newMsg,
    }
    this.messages.push(message);
    this.newMsg="";
    setTimeout(() => {
      this.scrollToTheLastElementByClassName();
    }, 20);
  }

  scrollToTheLastElementByClassName() {
    let elements = document.getElementsByClassName("msj");
    let last: any = elements[elements.length - 1];
    let topPos = last.offsetTop;

    //@ts-ignore
    const containerMsj = document.getElementById('containerMsj');
    if (containerMsj) {
    containerMsj.scrollTop = topPos;
    }
  }

  groups: Group[] = [{
    id: 1,
    name: 'Grupo 1',
    description: 'Grupo de prueba 1'
  }];
}
