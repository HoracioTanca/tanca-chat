import { Injectable } from '@angular/core';
// Agregado en el curso
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public userAnonimo = false;
  chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.imgPerfil = user.photoURL;
      this.usuario.uid = user.uid;
    });
  }

  login(metodo: string) {
    if (metodo === 'google') {
      this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } else if (metodo === 'twitter') {
      this.afAuth.signInWithPopup(new auth.TwitterAuthProvider());
    } else {
      this.userAnonimo = true;
      this.usuario.uid = 'anon';
    }
  }

  logout() {
    this.usuario = {};
    this.userAnonimo = false;
    this.afAuth.signOut();
  }

  cargarMensajes() {
    // CON ESTA LINEA: Ordeno por fecha, de forma ascendente y además limito los mensajes a mostrar a 15.
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(15));

    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[]) => {
      console.log(mensajes);

      this.chats = [];
      for (let mensaje of mensajes) {
        // El unshift inserta (como un push) PERO al principio del array SIEMPRE:
        this.chats.unshift(mensaje);
      }
      return this.chats;
    }));
  }

  agregarMensaje(texto: string, nombre?: string) {
    if (this.usuario.uid !== 'anon') {
      let mensaje1: Mensaje = {
        nombre: this.usuario.nombre,
        imgPerfil: this.usuario.imgPerfil,
        mensaje: texto,
        fecha: new Date().getTime(),
        uid: this.usuario.uid
      };
      return this.itemsCollection.add(mensaje1);
    } else {
      let mensaje: Mensaje = {
        nombre,
        mensaje: texto,
        fecha: new Date().getTime()
      };
      return this.itemsCollection.add(mensaje);
    }

  }

}

