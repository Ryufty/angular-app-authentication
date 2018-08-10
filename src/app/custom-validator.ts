import { AbstractControl } from '@angular/forms';
import { map, take, debounceTime } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CustomValidator {
  static username(afs: AngularFirestore) {
    return (control: AbstractControl) => {

      const username = control.value.toLowerCase();
      return afs.collection('users', ref => ref.where('username', '==', username))
        .valueChanges()
        .pipe(
          debounceTime(500),
          take(1),
          map(arr => arr.length ? { usernameAvailable: false } : null)
        );
    }
  }
}