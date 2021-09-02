import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../services/http/http.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    user: SocialUser;

    constructor(
        private authService: SocialAuthService,
        public http: HttpService,
        private router: Router) { }

    ngOnInit(): void {

    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

        this.authService.authState.subscribe(user => {
            console.log(user)
            if (user) {
                this.http.post(environment.admin.login, user).then(response => {
                    if (response['status']) {
                        localStorage.setItem('auth', btoa(JSON.stringify(user)))
                        this.router.navigate(['dashboard']);
                    }
                })
            }
        });
    }

}
