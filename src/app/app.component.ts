import { Component, Renderer2, HostListener } from '@angular/core';
// Imports agregados en el curso
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firechat';

  constructor(public chatService: ChatService, private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'bodyDark');
  }


  cambiarModo() {
    this.chatService.darkMode = !this.chatService.darkMode;
    if (this.chatService.darkMode) {
      this.renderer.addClass(document.body, 'bodyDark');
      this.renderer.removeClass(document.body, 'body');
    } else {
      this.renderer.addClass(document.body, 'body');
      this.renderer.removeClass(document.body, 'bodyDark');
    }
  }


  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event) {
    this.chatService.logout();
  }
}
