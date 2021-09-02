import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    constructor(private _snackBar: MatSnackBar) { }

    open(msg: string = '', horizontalPosition: MatSnackBarHorizontalPosition = 'end', verticalPosition: MatSnackBarVerticalPosition = 'bottom') {
        this._snackBar.open(msg, '', {
            horizontalPosition: horizontalPosition,
            verticalPosition: verticalPosition,
            duration: 3000
        });
    }
}
