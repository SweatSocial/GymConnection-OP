import { Component } from '@angular/core';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.scss']
})
export class CreditcardComponent {
  selectedOption: string;

  constructor() {
    this.selectedOption = 'Mastercard'; // Inicializar la opción seleccionada
  }
  
  selectOption(option: string) {
    this.selectedOption = option;
  }

  savePayment() {
    // Lógica para guardar el método de pago
    // Obtener los datos del formulario y realizar las acciones necesarias
  }
}
