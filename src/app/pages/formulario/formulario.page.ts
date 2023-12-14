import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  registroForm: FormGroup;
  correoUsuario: string;
  fechaHoraInicioSesion: string;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.correoUsuario = 'correo@example.com'; // Reemplaza con el correo real
    this.fechaHoraInicioSesion = new Date().toLocaleString();

    this.registroForm = this.formBuilder.group({
      codigoClase: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: [this.correoUsuario],
      fechaHoraInicioSesion: [this.fechaHoraInicioSesion],
    });
  }
  

  async guardarRegistro() {
    // Lógica para guardar el registro, si es necesario
  
    // Mostrar la alerta
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: '¡Registro de asistencia exitoso!',
      buttons: ['OK']
    });
  
    await alert.present();
  }
  

  async presentRegistroExitosoToast() {
    const toast = await this.toastController.create({
      message: 'Registro de asistencia exitoso',
      duration: 2000,
      position: 'middle',
      color: 'primary',
    });
    toast.present();
  }

  ngOnInit() {
    // Puedes agregar lógica de inicialización aquí si es necesario
  }
  
  }
  

