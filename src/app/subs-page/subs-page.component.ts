import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-subs-page',
  templateUrl: './subs-page.component.html',
  styleUrls: ['./subs-page.component.scss']
})
export class SubsPageComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
