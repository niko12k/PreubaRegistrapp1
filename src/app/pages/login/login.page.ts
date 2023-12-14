import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular'; // Importar ToastController
import { AutheticationService } from 'src/app/authetication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    public route: Router,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AutheticationService,
    public toastController: ToastController // Agregar ToastController aquí
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"),
        ],
      ],
    });
  }

  get errorControl() {
    return this.loginForm?.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm?.valid) {
      const user = await this.authService
        .loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .catch((error) => {
          console.log(error);
          loading.dismiss();
          this.presentErrorToast(); // Mostrar Toast en caso de error
        });
      if (user) {
        loading.dismiss();
        this.route.navigate(['/home']);
      }
    }
  }

  // Función para cambiar la visibilidad de la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Error al iniciar sesión, verifique su email y contraseña',
      duration: 3000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }
}