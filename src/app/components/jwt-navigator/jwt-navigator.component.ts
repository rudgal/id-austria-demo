import { Component, Input } from '@angular/core';
import { decodeJwt } from '../../util/jwt-util';

@Component({
  selector: 'app-jwt-navigator',
  templateUrl: './jwt-navigator.component.html',
  styleUrls: ['./jwt-navigator.component.scss']
})
export class JwtNavigatorComponent {
  @Input() idTokenAsString: string;

  get decodedToken() {
    return decodeJwt(this.idTokenAsString);
  }
} 