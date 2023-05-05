import { Component } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  public clients: any[] = [];
  public clientsMatch: any[] = [];
  private count: number = 1;

  constructor(public clientService: ClientService) { 
  }

  ngOnInit(): void {
    this.getClients();
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
    this.clientsMatch.push(this.clients.pop());
    this.getClients();
  }
}