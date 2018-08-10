import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take, debounceTime } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

  signupForm: FormGroup;
  detailForm: FormGroup;

  constructor (
    public fb: FormBuilder, 
    public auth: AuthService,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                        Validators.minLength(6),
                        Validators.maxLength(25),
                        Validators.required]]
    });
  }

  // Getters will make the code look prettier & cleaner
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  signup() {
    return this.auth.emailSignUp(this.email.value, this.password.value);
  }
}
