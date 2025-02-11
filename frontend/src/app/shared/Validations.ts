import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function passValidator(control : AbstractControl) : ValidationErrors | null {
    const value = control.value || ''
    return /^(?=(.*[!@?%#$^]))(?=(.*\d.*.\d.))(?=(.*[A-Z]))[A-Za-z\d@!?%#$^]*$/.test(value) ? null : { passwordValidator : 'Please enter a strong '}
}

export function passMatch() : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null  => {
        const Password = control.get('password')?.value
        const ConfirmPassword = control.get('confirmPassword')?.value
        return Password === ConfirmPassword ? null : {passError : 'Password and Confirm Password didnt matched'}
    }
}
