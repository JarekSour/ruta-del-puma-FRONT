import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appNumber]'
})
export class NumberDirective {

    @Input() allowDecimals: boolean = false;
    @Input() allowSign: boolean = false;
    @Input() decimalSeparator: string = '.';
    @Input() canPaste: boolean = true;

    readonly minusSign: string = '-';

    previousValue: string = '';

    integerUnsigned: string = '^[0-9]*$';
    integerSigned: string = '^-?[0-9]+$';
    decimalUnsigned: string = '^[0-9]+(.[0-9]+)?$';
    decimalSigned: string = '^-?[0-9]+(.[0-9]+)?$';

    constructor(private hostElement: ElementRef, public ctrl: NgControl) { }

    @HostListener('change', ['$event']) onChange(e: any) {
        this.validateValue(this.hostElement.nativeElement.value);
    }

    @HostListener('blur', ['$event'])
    focused(event: any) {
        this.validateValue(this.hostElement.nativeElement.value);
    }

    @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
        let cursorPosition: number = (e.target as HTMLInputElement)['selectionStart'] ?? 0;
        let originalValue: string = (e.target as HTMLInputElement)['value'];
        let key: string = this.getName(e);
        let controlOrCommand = (e.ctrlKey === true || e.metaKey === true);
        let signExists = originalValue.includes('-');
        let separatorExists = originalValue.includes(this.decimalSeparator);

        let allowedKeys = [
            'Backspace', 'ArrowLeft', 'ArrowRight', 'Escape', 'Tab'
        ];

        let separatorIsCloseToSign = (signExists && cursorPosition <= 1);
        if (this.allowDecimals && !separatorIsCloseToSign && !separatorExists) {

            if (this.decimalSeparator == '.')
                allowedKeys.push('.');
            else
                allowedKeys.push(',');
        }

        let firstCharacterIsSeparator = (originalValue.charAt(0) != this.decimalSeparator);
        if (this.allowSign && !signExists &&
            firstCharacterIsSeparator && cursorPosition == 0) {

            allowedKeys.push('-');
        }

        if (allowedKeys.indexOf(key) != -1 ||
            (key == 'a' && controlOrCommand) ||
            (key == 'c' && controlOrCommand) ||
            (key == 'v' && controlOrCommand) ||
            (key == 'x' && controlOrCommand)) {
            return;
        }

        this.previousValue = originalValue;

        let isNumber = (new RegExp(this.integerUnsigned)).test(key);
        if (isNumber) return; else e.preventDefault();
    }

    validateValue(value: string): void {
        this.hostElement.nativeElement['value'] = this.isNumber(value, this.allowDecimals, this.allowSign)
    }

    getName(e: any): string {

        if (e.key) {
            return e.key;
        } else {

            if (e.keyCode && String.fromCharCode) {
                switch (e.keyCode) {
                    case 8: return 'Backspace';
                    case 9: return 'Tab';
                    case 27: return 'Escape';
                    case 37: return 'ArrowLeft';
                    case 39: return 'ArrowRight';
                    case 188: return ',';
                    case 190: return '.';
                    case 109: return '-';
                    case 173: return '-';
                    case 189: return '-';
                    default: return String.fromCharCode(e.keyCode);
                }
            }
            return String.fromCharCode(e.keyCode);
        }
    }

    isNumber(value: any, isDecimal: boolean = false, allowSign: boolean = false) {
        if (value != null) {
            let regex: string = this.integerUnsigned;
            if (!isDecimal && !allowSign) regex = this.integerUnsigned;
            if (!isDecimal && allowSign) regex = this.integerSigned;
            if (isDecimal && !allowSign) regex = this.decimalUnsigned;
            if (isDecimal && allowSign) regex = this.decimalSigned;

            let firstCharacter = value.charAt(0);
            if (firstCharacter == this.decimalSeparator)
                value = 0 + value;

            let lastCharacter = value.charAt(value.length - 1);
            if (lastCharacter == this.decimalSeparator)
                value = value + 0;

            let signedValue = false;
            if (firstCharacter == this.minusSign) {
                signedValue = true;
                value = value.substring(1);
                firstCharacter = value.charAt(0);
            }
            let secondChar = value.charAt(1);
            while (firstCharacter == '0' && (secondChar != '' && secondChar != this.decimalSeparator)) {
                value = value.substring(1);
                firstCharacter = value.charAt(0);
                secondChar = value.charAt(1);
            }
            if (signedValue == true) {
                value = this.minusSign + value;
            }

            let valueParts = value.split(this.decimalSeparator);
            let naturalPart = valueParts?.[0];
            let decimalPart = valueParts?.[1];

            if (decimalPart != null && /^0+$/.test(decimalPart)) {
                decimalPart = '0';
                value = naturalPart + '.' + decimalPart;
            }

            if (value == '-0') {
                value = '0';
            }
            if (value == '-0.0') {
                value = '0.0';
            }

            let valid: boolean = (new RegExp(regex)).test(value);

            return valid ? value : '';
        } else {
            return value
        }
    }

}
