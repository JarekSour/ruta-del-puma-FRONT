import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import { IPlan } from '../../interface/plan.interface';
import { HttpService } from '../../services/http/http.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
    selector: 'app-planes',
    templateUrl: './planes.component.html',
    styleUrls: ['./planes.component.scss']
})
export class PlanesComponent implements OnInit {

    displayedColumns: string[] = ['NAME', 'MEMBERSHIP', 'MONTHLY', 'LIMIT_IMAGE', 'LIMIT_CHAR', 'STATUS'];
    dataSource: MatTableDataSource<IPlan> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    form: FormGroup

    constructor(
        public http: HttpService,
        private fb: FormBuilder,
        private _snackBar: SnackbarService) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            NAME: ['', [Validators.required]],
            MEMBERSHIP: ['', [Validators.required]],
            MONTHLY: ['', [Validators.required]],
            LIMIT_IMAGE: ['', [Validators.required, Validators.max(100)]],
            LIMIT_CHAR: ['', [Validators.required]]
        })

        this.http.post(environment.planes.getPlanes, {}).then((response: any) => {
            if (response.status) {
                this.dataSource.data = response.data;
            }
        })
    }

    onChangeStatusPlan(row: IPlan) {
        row.STATUS = !row.STATUS

        this.http.post(environment.planes.updatePlan, { id_plan: row.ID_PLAN, status: row.STATUS }).then((response: any) => {
            if (response.status) {
                this._snackBar.open('El plan fue ACTUALIZADO exitosamente');
            }else{
                this._snackBar.open('Ups! ocurrio un error al actualizar el plan');
            }
        })
    }

    onSubmit() {
        if (this.form.valid) {
            this.http.post(environment.planes.addPlan, this.form.value).then((response: any) => {
                if (response.status) {
                    let newObj = { ID_PLAN: response.data, ...this.form.value }
                    this.dataSource.data = [...this.dataSource.data, newObj]

                    this.form.reset()
                    this._snackBar.open('El plan fue CREADO exitosamente');
                }else{
                    this._snackBar.open('Ups! ocurrio un error al crear el plan');
                }

            })
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Planes por página';
        this.paginator._intl.nextPageLabel = 'siguiente';
        this.paginator._intl.previousPageLabel = 'anterior';
    }
}
