import {Component, OnInit} from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  currentUser: User = null;

  constructor(
    public globals: ThemeOptions,
    private authenticationService: AuthenticationService
    ) {
  }

  ngOnInit() {
    if(this.authenticationService.currentUserValue){
      this.currentUser = this.authenticationService.currentUserValue;
    }
  }

}
