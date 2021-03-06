import {AbstractControl, ValidatorFn} from '@angular/forms';

export class CustomValidators {

    private static INVALID_NAME_CHARS: { [char: string]: boolean } = {
        '$': true,
        '&': true,
        '|': true,
        ':': true,
        ';': true,
        '#': true,
        '/': true,
        '\\': true,
        '<': true,
        '>': true,
        '\"': true,
        '*': true,
        '+': true,
        ',': true,
        '=': true,
        // '@': true,
        '%': true,
        '{': true,
        '}': true,
        '[': true,
        ']': true,
        '`': true,
        '~': true,
        '^': true,
        // '_': true,
        '\'': true,
        '?': true,
    };

    static minLength(length: number): ValidatorFn {
        return (control: AbstractControl) => {
            return (control.value || '').trim().length < length ? {'minlength': true} : null;
        };
    }

    static maxLength(length: number): ValidatorFn {
        return (control: AbstractControl) => {
            return (control.value || '').trim().length > length ? {'maxlength': true} : null;
        };
    }

    static validName(): ValidatorFn {
        return (control: AbstractControl) => {
            const value: string = (control.value || '');
            let invalid = CustomValidators.INVALID_NAME_CHARS;
            for (let i = 0; i < value.length; i++) {
                let chr = value[i];
                if ((value.charCodeAt(i) < 32) || invalid[chr]) {
                    return {'invalidname': true};
                }
            }
            return null;
        };
    }

    static validNoWhitespace(): ValidatorFn {
        return (control: AbstractControl) => {
            const value: string = (control.value || '');
            const hasWhitespace = /\s/.test(value);
            if (hasWhitespace) {
                return {'invalidwhitespace': true};
            }
            return null;
        };
    }

    static integer(min: number, max: number): ValidatorFn {
        return (control: AbstractControl) => {
            if (control.value === '') {
                return null;
            }

            let value = parseInt(control.value, 10);
            if (isNaN(control.value) || isNaN(value)) {
                return {'integer': true}
            }

            if (value < min) {
                return {'integerlow': true};
            } else if (value > max) {
                return {'integerhigh': true};
            } else {
                return null;
            }
        };
    }
}