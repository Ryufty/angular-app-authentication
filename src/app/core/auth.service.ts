import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { User } from './data/User';
import { NotifyService } from './notify.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

@Injectable({
  providedIn: 'root'
})


@Injectable()
export class AuthService {
  user: Observable<User>;
  /* The constructor will set the Observable. 
     First it receives the current Firebase auth state. 
     If present, it will hit up Firestore for the user’s saved custom data. 
     If null, it will return an Observable.of(null) */
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService,
    private idle: Idle,
  ) {   

    //// Get auth data, then get firestore user document || null. 
    //// authState return user or null if not find
    this.user = this.afAuth.authState.pipe(
      switchMap(auth => {
        if (auth) {
          // logged in, get custom user from Firestore
          this.autoLogOut();
          return this.afs.doc<User>(`users/${auth.uid}`).valueChanges();
        } else {
          // logged out, null
          return of(null);
        }
      })
    )
  }

  /* This private method runs after the user authenticates and 
     sets their information to the Firestore database. 
     We pass the { merge: true } option to make this a non-destructive set. */
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
    //  username: user.username,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        subscriber: true,
        admin: false
      }
    }
    return userRef.set(data, { merge: true });
  }

  //Is useful if you have multiple OAuth options because it can be reused with different providers.
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
        this.router.navigate(['/content']);
      })
  }

  // This method triggers the popup window that authenticates the user with their Google account. 
  // It returns a Promise that resolves with the auth credential. 
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  ///// Role-based Authorization //////
  canRead(user: User): boolean {
    const allowed  = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;

    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
  
  signOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/']);
      })
  }

  // Auto Log-out inactivity IDLE
  autoLogOut() {
    // sets an idle timeout of 1800 seconds(3 mins),
    this.idle.setIdle(1800);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this. idle.onTimeout.subscribe(() => {
      this.signOut();
    });
    
    this.idle.watch();

  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(credential => {
        return this.setUserDoc(credential.user) // create initial user document
      })
      .catch(error => this.handleError(error) );
  }

// Update properties on the user document
  updateUser(user: User, data: any) {
    return this.afs.doc(`users/${user.uid}`).update(data);
  }

  // If error, console log and notify user
  private handleError(error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private setUserDoc(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
     // username: user.username,
      photoURL: 'https://goo.gl/Fz9nrQ',
      roles: {
        subscriber: true
      }
    }
    this.router.navigate(['/content']);

    return userRef.set(data);
  }  
}
