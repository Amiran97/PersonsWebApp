import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ConfirmValidator {
    static sameValues(first: string, second: string): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            var firstValue = group.get(first);
            var secondValue = group.get(second);
            if(firstValue?.value != secondValue?.value)
                return { sameValue: `${first} and ${second} not match!` };
            return null;
        }
    }
}