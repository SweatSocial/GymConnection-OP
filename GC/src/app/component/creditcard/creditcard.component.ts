import { Component } from '@angular/core';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.scss']
})
export class CreditcardComponent {
  nombrePropietario: string='';
  numeroTarjeta: string='';
  fechaVencimiento: string='';
  codigoSeguridad: string='';
  selectedOption: string='';

  constructor() {
    this.selectedOption = 'Mastercard'; // Inicializar la opción seleccionada
  }
  
  selectOption(option: string) {
    this.selectedOption = option;
  }

  savePayment() {
   console.log(this.nombrePropietario);
   console.log(this.numeroTarjeta);
   console.log(this.fechaVencimiento);
   console.log(this.selectedOption);
  }
}
