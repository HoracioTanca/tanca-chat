import { Component, OnInit, OnDestroy } from '@angular/core';
// Imports agregados en el curso:
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  mensaje = '';
  elemento: any;

  noPuedeEnviar = false;
  mensajeError = '';

  constructor(public chatService: ChatService) {
    this.chatService.cargarMensajes().subscribe(() => {

      /* Creamos un setTimeout para que cuando estén cargados los mensajes (Luego de unos segundos,
      por eso el setTimeout) recién ahí la barra baje y nos muestre el nuevo mensaje recibido. */
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);

    });

    // if (chatService.usuario.uid) {
    //   this.nombre = chatService.usuario.nombre;
    // }

  }
  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    // if (this.chatService.usuario.uid === 'anon') {
    if (this.mensaje.length === 0) {
      this.mensajeError = 'No has ingresado un mensaje';
      return;
    } else {
      this.enviar(this.mensaje);
    }
    // } else {
    //   this.enviar(this.mensaje);
    // }
  }

  enviar(mens: string) {
    if (this.noPuedeEnviar) { return; }
    this.chatService.agregarMensaje(mens).then(() => {
      console.log('Mensaje enviado');
      this.mensaje = '';

      this.noPuedeEnviar = true;
      setTimeout(() => {
        this.noPuedeEnviar = false;
      }, 2000);

    }).catch((err) => {
      console.error('Error al enviar', err);
    });
  }

  ngOnDestroy() {
    this.chatService.logout();
  }

  estaConectado(nombreUser: string) {
    return this.chatService.users.find(u => u.nombre === nombreUser);
  }

  // getColorDelUserDelChat(nombreUser: string) {
  //   this.chatService.users.forEach(user => {
  //     console.log(user);

  //     if (user.nombre === nombreUser) {
  //       console.log(user.color);

  //       return user.color;
  //     }
  //   });
  // }
}
