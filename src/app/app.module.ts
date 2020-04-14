import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Agregadas en el curso
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { VerConectadosComponent } from './components/ver-conectados/ver-conectados.component';
import { ColorBadgePipe } from './pipes/color-badge.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    VerConectadosComponent,
    ColorBadgePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // IMPORTADAS en el curso
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
