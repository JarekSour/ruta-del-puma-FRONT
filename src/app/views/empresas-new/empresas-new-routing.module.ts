import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasNewComponent } from './empresas-new.component';

const routes: Routes = [
    {
        path: '',
        component: EmpresasNewComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasNewRoutingModule { }
