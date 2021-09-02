import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import { IResponsable } from '../../interface/responsable.interface';
import { HttpService } from '../../services/http/http.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
    selector: 'app-responsables',
    templateUrl: './responsables.component.html',
    styleUrls: ['./responsables.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class ResponsablesComponent implements OnInit {

    displayedColumns: string[] = ['NAME', 'EMAIL', 'GENERAR'];
    dataSource: MatTableDataSource<IResponsable> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    form: FormGroup

    constructor(
        public http: HttpService,
        private fb: FormBuilder,
        private _snackBar: SnackbarService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            NAME: ['', [Validators.required]],
            EMAIL: ['', [Validators.required]]
        })

        this.http.post(environment.responsables.getResponsables, {}).then((response: any) => {
            if (response.status) {
                this.dataSource.data = response.data;
            }
        })
    }

    onSubmit() {
        if (this.form.valid) {
            this.http.post(environment.responsables.addResponsable, this.form.value).then((response: any) => {
                if (response.status) {
                    let newObj = { ID_RESPONSABLE: response.data, ...this.form.value }
                    this.dataSource.data = [...this.dataSource.data, newObj]

                    this.form.reset()
                    this._snackBar.open('El responsable fue CREADO exitosamente');
                } else {
                    this._snackBar.open('Ups! ocurrio un error al crear el responsable');
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
        this.paginator._intl.itemsPerPageLabel = 'Responsables por página';
        this.paginator._intl.nextPageLabel = 'siguiente';
        this.paginator._intl.previousPageLabel = 'anterior';
    }

    addEmpresa(row) {
        let json = {
            ID_RESPONSABLE: row.ID_RESPONSABLE,
            NAME: row.NAME,
            EMAIL: row.EMAIL
        }

        this.router.navigate(['/empresas'], {
            queryParams: { data: btoa(JSON.stringify(json)) }
        })
    }

}
