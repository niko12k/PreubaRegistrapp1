import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  fechaHoraInicioSesion: string;

  constructor() {
    this.fechaHoraInicioSesion = new Date().toLocaleString(); // Obtiene la fecha y hora actual
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    return date.toLocaleDateString('es-ES', options);
  }



  ngOnInit() {
  }

}
