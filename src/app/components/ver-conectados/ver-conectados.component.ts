import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-ver-conectados',
  templateUrl: './ver-conectados.component.html',
  styleUrls: ['./ver-conectados.component.css']
})
export class VerConectadosComponent implements OnInit {

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
  }


  estaConectado(user: Usuario) {
    return this.chatService.users.find(u => u.nombre === user.nombre);
  }

}
