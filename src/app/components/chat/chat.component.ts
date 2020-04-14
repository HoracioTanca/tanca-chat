import { Component, OnInit } from '@angular/core';
// Imports agregados en el curso:
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  nombre: string;
  mensaje = '';
  elemento: any;

  colorClaseNombre = '';

  cambiarNombre = true;
  mensajeError = '';

  constructor(public chatService: ChatService) {
    this.chatService.cargarMensajes().subscribe(() => {

      /* Creamos un setTimeout para que cuando estén cargados los mensajes (Luego de unos segundos,
      por eso el setTimeout) recién ahí la barra baje y nos muestre el nuevo mensaje recibido. */
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);

    });
    if (chatService.usuario.uid) {
      this.nombre = chatService.usuario.nombre;
    }

  }
  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  comprobarUser(nuevoNombre: string) {
    if (this.chatService.chats.find(chat => chat.nombre === nuevoNombre)) {
      nuevoNombre = '';
      this.mensajeError = 'Ya existe un usuario con ese nombre';
    } else {
      this.nombre = nuevoNombre;
      this.cambiarNombre = false;
    }
  }



  enviarMensaje() {
    if (this.chatService.usuario.uid === 'anon') {
      if (this.mensaje.length === 0 || !this.nombre || this.nombre.length === 0) {
        this.mensajeError = 'No has ingresado un mensaje o no tienes nombre';
        return;
      } else {
        this.enviar(this.mensaje, this.nombre);
      }
    } else {
      this.enviar(this.mensaje);
    }
  }

  enviar(mens: string, nombre?: string) {
    this.chatService.agregarMensaje(mens, nombre).then(() => {
      console.log('Mensaje enviado');
      this.mensaje = '';
    }).catch((err) => {
      console.error('Error al enviar', err);
    });
  }
}
