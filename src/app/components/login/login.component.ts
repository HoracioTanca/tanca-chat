import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensajeError = '';
  usuario = {
    nombre: '',
    color: 'badge-dark'
  };

  constructor(public chatService: ChatService, private afs: AngularFirestore) {
    this.chatService.cargarUsuarios().subscribe();
  }

  ngOnInit(): void {
  }

  ingresar(metodo: string = 'anon') {
    if (this.chatService.users.find(user => user.nombre === this.usuario.nombre) || this.usuario.nombre === '') {
      this.usuario.nombre = '';
      this.mensajeError = 'No has ingresado un nombre o ya existe un usuario con ese nombre';
    } else {
      this.chatService.login(metodo, this.usuario);
    }
  }

}
