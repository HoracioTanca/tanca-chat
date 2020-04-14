import { Component } from '@angular/core';
// Imports agregados en el curso
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firechat';

  constructor(public chatService: ChatService) {
  }
}
