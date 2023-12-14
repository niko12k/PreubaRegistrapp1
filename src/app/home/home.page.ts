import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  qrCodeString = 'Asistencia Duoc UC';
  scannedResult: any;
  content_visibility = '';
  email: any;
  code: any;

  constructor(

    private router: Router,
    private alertController: AlertController,
    public authService: AutheticationService,

    
  ) {}


  async logout() {
    this.authService
      .signOut()
      .then(() => {
        this.router.navigate(['/landing']);
      })
      .catch((error) => {
        console.log(error);
      });
  }





  async checkPermission() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
  
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      const alert = await this.alertController.create({
            header: 'Registro Exitoso',
            message: '¡Registro de asistencia exitoso!',
            buttons: ['OK']
          });
          await alert.present();
      if (result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
        

        // Realiza la navegación a asistencia.page.html al escanear el código QR
        this.navigateToAsistenciaPage();
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
    
  }
  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }
  ngOnDestroy(): void {
    this.stopScan();
  }
  // Método para navegar a asistencia.page.html
  private navigateToAsistenciaPage() {
    this.router.navigate(['/asistencia']);
  }




 
}