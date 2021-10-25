import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasEditComponent } from './empresas-edit.component';

const routes: Routes = [
    {
        path: '',
        component: EmpresasEditComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasEditRoutingModule { }
