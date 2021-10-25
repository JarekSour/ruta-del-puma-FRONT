import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '404',
        component: P404Component,
        data: {
            title: 'Page 404'
        }
    },
    {
        path: '500',
        component: P500Component,
        data: {
            title: 'Page 500'
        }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login Page'
        }, canActivate:[LoginGuard]
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'planes',
                loadChildren: () => import('./views/planes/planes.module').then(m => m.PlanesModule)
            },
            {
                path: 'responsables',
                loadChildren: () => import('./views/responsables/responsables.module').then(m => m.ResponsablesModule)
            },
            {
                path: 'empresas',
                loadChildren: () => import('./views/empresas/empresas.module').then(m => m.EmpresasModule)
            },
            {
                path: 'new-empresa',
                loadChildren: () => import('./views/empresas-new/empresas-new.module').then(m => m.EmpresasNewModule)
            },
            {
                path: 'edit-empresa',
                loadChildren: () => import('./views/empresas-edit/empresas-edit.module').then(m => m.EmpresasEditModule)
            },






            {
                path: 'base',
                loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
            },
            {
                path: 'buttons',
                loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
            },
            {
                path: 'charts',
                loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
                canActivate:[AuthGuard]
            },
            {
                path: 'icons',
                loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
            },
            {
                path: 'notifications',
                loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
            },
            {
                path: 'theme',
                loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
            },
            {
                path: 'widgets',
                loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
            }
        ]
    },
    { path: '**', component: P404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
