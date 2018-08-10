import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../core/data/user';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-secret-page',
  templateUrl: './secret-page.component.html',
  styleUrls: ['./secret-page.component.scss']
})
export class SecretPageComponent implements OnInit {

  postRef: AngularFirestoreDocument<any>;
  post$: Observable<any>;

  user: User;

  constructor(private afs: AngularFirestore, public auth: AuthService) { }

  ngOnInit() {
    this.postRef = this.afs.doc('posts/myTestPost');
    this.post$ = this.postRef.valueChanges();
    this.auth.user.subscribe(data => this.user = data);
  }

  editPost() {
    if (this.auth.canEdit(this.user)) {
      this.postRef.update({ title: 'Edited Title!'});
    }
    else {
      console.error('you are not allowed to do that!');
    }
  }

  deletePost() {
    this.postRef.update({ content: 'changed!'});
  }
}
