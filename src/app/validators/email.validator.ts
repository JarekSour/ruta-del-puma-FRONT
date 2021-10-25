import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[emailValidatorDirective]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: emailValidatorDirective,
        multi: true
    }]
})

export class emailValidatorDirective implements Validator {
    validate(control: AbstractControl): { [key: string]: any } | null {
        return emailValidator.valid(control);
    }
}

export class emailValidator {
    static valid(control: AbstractControl): any | null {
        if (control.value == null)
            return null

        if (control.value.length > 0) {
            const pattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
            if (!pattern.test(control.value.toLowerCase()))
                return { invalid: true }
        }

        return null
    }
}


