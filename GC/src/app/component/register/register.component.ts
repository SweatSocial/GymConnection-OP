import { Component } from '@angular/core';
import { RegisterService } from 'src/app/service/registro/register.service';
import { Client } from 'src/app/models/client.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  cliente: Client = {
    id: null,
    name: '',
    age: null,
    description: '',
    image: '',
    department: 'Lima',
    district: '',
    phone: '',
    email: '',
    password: ''
  };

  constructor(public registerService: RegisterService) { }

  guardarDatos() {
    this.registerService.guardarDatos(this.cliente)
      .subscribe(
        response => {
          console.log('Datos guardados correctamente', response);
          // Aquí puedes redirigir a otra página o realizar otras acciones después de guardar los datos
        },
        error => {
          console.error('Error al guardar los datos', error);
        }
      );
  }
}
