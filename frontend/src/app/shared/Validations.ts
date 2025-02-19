import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function passValidator(control : AbstractControl) : ValidationErrors | null {
    const value = control.value || ''
    const regex = /^(?=((.*\d){2}))(?=(.*[A-Z]))[A-Za-z\d@!?%#$^]*$/
    return regex.test(value) ? null : { passwordValidator : 'Enter a robust password'}
}

export function confirmPassword() : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null  => {
        const Password = control.get('password')?.value
        const ConfirmPassword = control.get('confirm_password')?.value
        return Password === ConfirmPassword ? null : {passError : "Passwords didn't matched"}
    }
}
