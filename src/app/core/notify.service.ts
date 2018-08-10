import { Injectable } from '@angular/core';
import { Msg } from './data/msg';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



@Injectable()
export class NotifyService {

  private msgSource = new Subject<Msg>();

  msg = this.msgSource.asObservable();

  constructor() { }

  update(content: string, style: string) {
    const msg: Msg = { content, style};
    this.msgSource.next(msg);
  }

  clear() {
    this.msgSource.next(null);
  }
}
