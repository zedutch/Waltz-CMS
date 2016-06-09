import {Component}           from '@angular/core';
import {CORE_DIRECTIVES}     from '@angular/common';

import {TranslatePipe}       from 'angular2localization/angular2localization';
import {LocalizationService} from 'angular2localization/angular2localization';

import {BS_VIEW_PROVIDERS}   from 'ng2-bootstrap/ng2-bootstrap';
import {MODAL_DIRECTVES}     from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector      : 'login-modal',
    templateUrl   : '/modals/login',
    viewProviders : [ BS_VIEW_PROVIDERS ],
    directives    : [
                      CORE_DIRECTIVES,
                      MODAL_DIRECTVES
                    ],
    pipes         : [ TranslatePipe ]
})

export class LoginModalComponent {
    
    constructor(public localization : LocalizationService) {}
    
    
    get lang(): string {
        return this.localization.languageCode;
    }
}