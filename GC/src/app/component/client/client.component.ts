import { Component, Inject, NgModule } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import { NgForm, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';

export interface Group {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  public clients: any[] = [];
  public clientsMatch: any[] = [];
  public coachsMatch: any[] = [];
  private count: number = 1;
  viewMatchClient: boolean = true;
  viewMatch: boolean = true;
  viewChat: boolean = false;
  newMsg!: string;
  addressee!: string;
  userLogged: string = "id";
  messages: any[] = [{
    transmitter: "Other",
    text: "Hola, ¿cómo estás?",
  }, {
    transmitter: "Other",
    text: "Hicimos Match, espero nos llevemos bien!",
  }];

  constructor(public clientService: ClientService, public dialog: MatDialog) { 
  }

  ngOnInit(): void {
    this.getClients();
  }

  chargeViewMatch(person: string) {
    this.viewMatch = !this.viewMatch;
    this.viewChat = !this.viewChat;
    this.addressee = person;
  }

  getClients() {
    let clientData;
    this.clientService.getClients(this.count).subscribe( (response: any) => {
      clientData = {
        id: this.count,
        name: response.name,
        age: response.age,
        description: response.description,
        image: response.image,
        department: response.department,
        district: response.district,
        phone: response.phone,
        email: response.email,
        password: response.password
      }
      this.clients.push(clientData);
      this.count +=1;
      this.verifyMax();
    });
  }
  
  verifyMax() {
    this.clientService.getAllClients().subscribe(data => {
      let max = data.length;
      if(this.count >= (max + 1)) this.count = 1;
    })
  }

  dislike() {
    this.clients.pop();
    this.getClients();
  }

  like() {
    if(this.viewMatchClient == true) {
      this.clientsMatch.push(this.clients.pop());
    } else {
      this.coachsMatch.push(this.clients.pop());
    }
    this.getClients();
  }

  changePersonMatch(event: MatTabChangeEvent) {
    const selectedIndex = event.index;
    if(selectedIndex == 0 || selectedIndex == 2) {
      this.viewMatchClient = !this.viewMatchClient;
    }
  }

  sendMsg() {
    if(this.newMsg == "") return;

    let message = {
      transmitter: this.userLogged,
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateGroup, {});

    dialogRef.afterClosed().subscribe((groupData: Group) => {
      if(groupData) this.saveGroup(groupData);
    });
  }

  saveGroup(groupData: Group) {
    const nuevoGrupo: Group = {
      id: this.groups.length + 1,
      name: groupData.name,
      description: groupData.description
    };

    this.groups.push(nuevoGrupo);
  }


  groups: Group[] = [];
}


@Component({
  selector: 'app-client',
  templateUrl: './client.dialog-create-group.html',
  standalone: true,
  styleUrls: ['./client.dialog-create-group.scss'],
  imports: [MatDialogModule, NgIf, FormsModule],
})
export class DialogCreateGroup {
  groupData: Group = { id: 0, name: '', description: '' };

  constructor(
    public dialogRef: MatDialogRef<DialogCreateGroup>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  addGroup() {
    if(this.groupData.name == "" || this.groupData.description == "") return;
    this.dialogRef.close(this.groupData);
  }
}