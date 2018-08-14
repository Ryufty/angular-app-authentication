import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { CustomValidator } from '../custom-validator'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  signupForm: FormGroup;
  detailForm: FormGroup;
  subscriber: boolean = false;
  secret: boolean = false;

  constructor (
    private auth: AuthService, 
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    // First Step
    this.signupForm = this.fb.group ({
      'username':  ['', Validators.required, CustomValidator.username(this.afs)]
    })

    // Second Step
    this.detailForm = this.fb.group({
      'catchPhrase': ['', [Validators.required]]
    });
  }

  get username() { return this.signupForm.get('username'); }
  get catchPhrase() { return this.detailForm.get('catchPhrase'); }

  // step 1 - linked to AuthService Firestore database
  setUsername(user) {
    return this.auth.updateUser(user, { username: this.username.value });
  }

  // step 2 - linked to AuthService Firestore database
  setCatchPhrase(user) {
    return this.auth.updateUser(user, { catchPhrase: this.catchPhrase.value });
  }

  secretPost(user) {
    if (this.auth.canDelete(user)) {
      this.router.navigate(['/secret']);
    }
    else if (!this.secret) {
      this.subscriber = false;
      this.secret = true;
    }
    else {
      this.secret = false;
    }   
  }

  subscriberPost() {
    if (!this.subscriber) {  
      this.secret = false;
      this.subscriber = true; 
    }
    else {
      this.subscriber = false;
    }
  }

  setSubscriber(user) {
    if (user.roles.subscriber) {
      this.auth.updateUser(user, {"roles.subscriber" : false});
    } 
    else {
      this.auth.updateUser(user, {"roles.subscriber" : true});
    }
  }

  setAdmin(user) {
    var temp;
    this.setSubscriber(user);
    if (user.roles.admin) {
      temp = this.auth.updateUser(user, {"roles.admin" : false});
    }
    else {
      temp = this.auth.updateUser(user, {"roles.admin" : true});
    }
    this.secret = false;
    return temp;
  }

  changeStatus(user) {
    this.setAdmin(user);
  }
}
