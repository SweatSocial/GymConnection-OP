import { Component } from '@angular/core';


interface UserData {
  nombre: string;
  apellido: string;
  correo: string;
  departamento: string;
  distrito: string;
  direccion: string;
  celular: string;
  contrasenia: string;
  imageUrl: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
public isEditing: boolean = false;
public originalData: UserData={
  nombre: '',
  apellido:'',
  correo:'',
  departamento:'',
  distrito:'',
  direccion:'',
  celular:'',
  contrasenia:'',
  imageUrl:''
};
public userData: UserData={...this.originalData};

  public toggleEdit(): void {
    if (this.isEditing) {
      this.userData = { ...this.originalData }; // Restaura los valores originales al cancelar la edición
    } else {
      this.originalData = { ...this.userData }; // Realiza una copia de respaldo de los valores originales antes de la edición
    }
    this.isEditing = !this.isEditing;
  }
  public saveChanges(): void {
     // Aquí puedes realizar las acciones necesarias para guardar los cambios del formulario
     this.originalData = { ...this.userData }; // Actualiza los valores originales después de guardar los cambios
     this.isEditing = false; // Desactiva el modo de edición después de guardar los cambios
   
  }
  
  openFilePicker() {
        // Lógica para abrir el selector de archivos
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
          fileInput.click();
        }
  }

  handleFileChange(event: any) {
        // Lógica para manejar el cambio de archivo seleccionado
        const files = event.target.files;
        if (files && files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = () => {
            this.userData.imageUrl = reader.result as string;
          };
          reader.readAsDataURL(file);
        }
  }
}
