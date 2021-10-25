import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { IPlan } from '../../interface/plan.interface';
import { HttpService } from '../../services/http/http.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { emailValidator } from '../../validators/email.validator';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-empresas-edit',
    templateUrl: './empresas-edit.component.html',
    styleUrls: ['./empresas-edit.component.scss']
})
export class EmpresasEditComponent implements OnInit {

    textLoader: string = 'Guardando...'
    formEmpresa: FormGroup
    maxlengthDescription: number = 0
    slideEditor: boolean = false
    images: Array<{ base64: string, id: string, name: string, status: boolean | undefined }> = []

    imagesSuccess: number = 0
    maxImageToUpload: number = 0
    albumHash: string = ''
    avatar: any = false

    @ViewChild('inputAvatar') inputAvatar: ElementRef
    @ViewChild('inputFile') inputFile: ElementRef

    @ViewChild('chipList') chipList: MatChipList;
    categoriasList: string[] = environment.categorias
    tags: string[] = [];
    separatorKeysCodes: number[] = [ENTER, COMMA];


    displayedColumns: string[] = ['FECHA_INICIO', 'FECHA_TERMINO', 'ESTADO', 'ACTIVAR'];
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public http: HttpService,
        private fb: FormBuilder,
        private _snackBar: SnackbarService,
        private route: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        this.spinner.show('loader')

        this.formEmpresa = this.fb.group({
            NAME: ['', [Validators.required]],
            ADRESS: ['', [Validators.required]],
            TELEPHONE: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
            EMAIL: ['', [Validators.required, emailValidator.valid]],
            DESCRIPTION: ['', [Validators.required]],
            LATLON: ['', [Validators.required]],
            METHOD: ['', [Validators.required]],
            CATEGORIA: ['', [Validators.required]],
            ETIQUETA: [[], [Validators.required]],
            ID_EMPRESA: ['']
        })
        this.formEmpresa.disable()

        this.route.queryParams.subscribe(params => {
            if (params['data']) {
                try {
                    let json = JSON.parse(atob(params['data']))

                    this.http.post(environment.empresa.getEmpresa, { ID_EMPRESA: json.ID_EMPRESA }).then((response1: any) => {
                        if (response1.status) {

                            this.http.post(environment.planes.getPlanes, {}).then((response: any) => {
                                if (response.status) {
                                    let planes: Array<IPlan> = response.data;

                                    let selectedPlan = planes.filter(e => e.ID_PLAN == response1.data.SUSCRIPCION[0].ID_PLAN)[0]
                                    this.maxlengthDescription = selectedPlan.LIMIT_CHAR
                                    this.maxImageToUpload = selectedPlan.LIMIT_IMAGE
                                    this.albumHash = response1.data.ALBUM[0].IMGUR_DELETEHASH

                                    let selectedSubscription = response1.data.SUSCRIPCION[0]

                                    this.formEmpresa.controls.NAME.setValue(response1.data.NAME)
                                    this.formEmpresa.controls.ADRESS.setValue(response1.data.ADRESS)
                                    this.formEmpresa.controls.TELEPHONE.setValue(response1.data.TELEPHONE)
                                    this.formEmpresa.controls.EMAIL.setValue(response1.data.EMAIL)
                                    this.formEmpresa.controls.DESCRIPTION.setValue(response1.data.DESCRIPTION)
                                    this.formEmpresa.controls.LATLON.setValue(response1.data.LATLON)
                                    this.formEmpresa.controls.METHOD.setValue(selectedSubscription.METHOD)
                                    this.formEmpresa.controls.ID_EMPRESA.setValue(response1.data.ID_EMPRESA)
                                    this.formEmpresa.controls['CATEGORIA'].setValue(response1.data.CATEGORIA.map(e => e.NAME))
                                    this.formEmpresa.controls['ETIQUETA'].setValue(response1.data.ETIQUETA.map(e => e.NAME))
                                    this.tags = response1.data.ETIQUETA.map(e => e.NAME)

                                    this.dataSource.data = response1.data.SUSCRIPCION

                                    console.log(response1.data.SUSCRIPCION)
                                }

                                this.spinner.hide('loader')
                            })

                            this.http.post(environment.imagenes.getAlbum, { hash: response1.data.ALBUM[0].IMGUR_DELETEHASH }).then((response: any) => {
                                if (response.status) {
                                    response.data.forEach((el: any) => {
                                        if (el.IS_AVATAR) {
                                            this.avatar = el.URL_IMAGEN
                                        } else {
                                            this.images.push({ base64: el.URL_IMAGEN, id: el.HASH, name: el.HASH, status: true })
                                        }
                                        this.imagesSuccess++
                                    });
                                }
                            })
                        }
                    }).catch(() => {
                        this.router.navigate(['/empresas'])
                    })
                } catch (e) {
                    this.router.navigate(['/empresas'])
                }
            } else {
                this.router.navigate(['/empresas'])
            }

        });

        this.formEmpresa.controls.ETIQUETA.statusChanges.subscribe(
            status => this.chipList.errorState = status === 'INVALID'
        );
    }

    onSubmint() {
        if (this.formEmpresa.valid) {
            this.http.post(environment.empresa.updateEmpresa, this.formEmpresa.value).then(response => {

            })
        }
    }

    onChangeSlideEditor() {
        this.slideEditor = !this.slideEditor

        if (this.slideEditor)
            this.formEmpresa.enable()
        else
            this.formEmpresa.disable()
    }

    clickFileAvatar() {
        this.inputAvatar.nativeElement.value = ''
    }

    clickFile() {
        this.inputFile.nativeElement.value = ''
    }

    changeFileAvatar(event) {
        this.spinner.show('loader')
        let file = event.target.files[0];
        let reader: FileReader = new FileReader();


        reader.onloadend = (loadEvent: any) => {
            let base64 = reader.result.toString()
            this.http.post(environment.imagenes.uploadImage, { album: this.albumHash, image: base64.split(',')[1], avatar: true }).then((response: any) => {
                if (response.status) {
                    this.avatar = response.data.data.link
                    this._snackBar.open('La imagen fue agregada exitosamente');
                }
                this.spinner.hide('loader')
            }).catch(() => {
                this.spinner.hide('loader')
            })
        }
        reader.readAsDataURL(file)
    }

    changeFile(event) {
        this.spinner.show('loader')
        let file = event.target.files[0];
        let reader: FileReader = new FileReader();
        let obj = { base64: '', id: '', name: `${file.name}${this.images.length + 1}`, status: undefined }

        reader.onloadend = (loadEvent: any) => {
            obj.base64 = reader.result.toString()
            this.images.push(obj)
            this.spinner.show(obj.name);
            this.http.post(environment.imagenes.uploadImage, { album: this.albumHash, image: obj.base64.split(',')[1], avatar: false }).then((response: any) => {
                if (response.status) {
                    this.imagesSuccess++
                    this.images.map(e => {
                        if (e.name == obj.name) {
                            e.status = true
                            e.id = response.data.data.id
                            this._snackBar.open('La imagen fue agregada exitosamente');
                        }
                    })
                } else {
                    this.images.map(e => { if (e.name == obj.name) e.status = false })
                }
                this.spinner.hide(obj.name);
                this.spinner.hide('loader')
            }).catch(() => {
                this.spinner.hide(obj.name);
                this.images.map(e => { if (e.name == obj.name) e.status = false })
                this.spinner.hide('loader')
            })
        }
        reader.readAsDataURL(file)
    }

    onDeleteImage(image) {
        this.http.post(environment.imagenes.deleteImage, { album_hash: this.albumHash, image_hash: image.id }).then(response => {
            this.images = this.images.filter(e => e.id != image.id)
            this.imagesSuccess--
        })
    }

    addChipTag(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            if (this.tags.filter(e => e == value).length == 0) {
                this.tags.push(value);
                this.formEmpresa.controls.ETIQUETA.setValue(this.tags)
            }
        }

        event.input.value = '';
    }

    removeChipTag(chip: string): void {
        const index = this.tags.indexOf(chip);

        if (index >= 0) {
            this.tags.splice(index, 1);
            this.formEmpresa.controls.ETIQUETA.setValue(this.tags)
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
        this.paginator._intl.itemsPerPageLabel = 'Suscripciones por página';
        this.paginator._intl.nextPageLabel = 'siguiente';
        this.paginator._intl.previousPageLabel = 'anterior';
    }

    validarSuscripcion(row) {
        this.http.post(environment.suscripcion.updateSuscripcion, { ID_SUSCRIPCION: row.ID_SUSCRIPCION }).then((response: any) => {
            if(response.status){
                this.dataSource.data.map(e=>{
                    if(e.ID_SUSCRIPCION == row.ID_SUSCRIPCION){
                        e.STATUS = 'pagado'
                    }
                })
            }
        })
    }


}
