import { Injectable, OnDestroy } from '@angular/core';
// Agregado en el curso
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Usuario } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  chats: Mensaje[] = [];

  private usersCollection: AngularFirestoreCollection<Usuario>;
  users: Usuario[] = [];
  itemUser: AngularFirestoreDocument<Usuario>;

  tiempoRestante = 3000;
  public userAnonimo = false;
  public usuario: Usuario;

  viendoConectados = false;
  public darkMode = true;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      // this.usuario.imgPerfil = user.photoURL;
      // this.usuario.uid = user.uid;
    });
  }

  login(metodo: string, user: Usuario) {
    if (metodo === 'google') {
      this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } else if (metodo === 'twitter') {
      this.afAuth.signInWithPopup(new auth.TwitterAuthProvider());
    } else {
      this.userAnonimo = true;
      // this.usuario.uid = 'anon';
      this.usuario = user;
      if (localStorage.getItem('tokenUser')) {
        this.itemUser = this.afs.doc<Usuario>(`usuarios/${this.usuario.id}`);
        return;
      }
      return this.usersCollection.add(this.usuario).then((res: any) => {
        this.usuario.id = res.yv.path.segments[1];
        localStorage.setItem('tokenUser', JSON.stringify(this.usuario));
        this.itemUser = this.afs.doc<Usuario>(`usuarios/${this.usuario.id}`);
      });
    }
  }

  logout() {
    localStorage.removeItem('tokenUser');
    this.itemUser.delete();
    this.usuario = null;
    this.userAnonimo = false;
    this.afAuth.signOut();
  }

  ngOnDestroy() {
    this.itemUser.delete();
    this.usuario = null;
    this.userAnonimo = false;
    this.afAuth.signOut();
  }

  cargarUsuarios() {
    this.usersCollection = this.afs.collection<Usuario>('usuarios');

    if (localStorage.getItem('tokenUser')) {
      let u = JSON.parse(localStorage.getItem('tokenUser'));
      this.login('anon', u);
    }

    return this.usersCollection.valueChanges().pipe(map((usuarios: Usuario[]) => {
      console.log(usuarios);

      this.users = [];
      for (let u of usuarios) {
        // El unshift inserta (como un push) PERO al principio del array SIEMPRE:
        this.users.unshift(u);
      }
      return this.users;

    }));
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

  agregarMensaje(texto: string) {
    // if (this.usuario.uid !== 'anon') {
    //   let mensaje1: Mensaje = {
    //     nombre: this.usuario.nombre,
    //     imgPerfil: this.usuario.imgPerfil,
    //     mensaje: texto,
    //     fecha: new Date().getTime(),
    //     uid: this.usuario.uid
    //   };
    //   return this.itemsCollection.add(mensaje1);
    // } else {
    this.tiempoRestante += 3000;
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      color: this.usuario.color
    };
    return this.itemsCollection.add(mensaje);
    // }

  }

}

