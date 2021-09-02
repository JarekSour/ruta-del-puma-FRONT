import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { navItems } from '../../_nav';

@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
    public sidebarMinimized = false;
    public navItems = navItems;

    user = {
        name: '',
        photoUrl: ''
    }

    constructor(
        private authService: SocialAuthService,
        private router: Router) { }

    ngOnInit(): void {
        let json = JSON.parse(atob(localStorage.getItem('auth')))
        this.user.name = json.name
        this.user.photoUrl = json.photoUrl
    }

    toggleMinimize(e) {
        this.sidebarMinimized = e;
    }

    signOut(): void {
        localStorage.clear();
        this.authService.signOut();
        this.router.navigate(['login']);
    }
}
