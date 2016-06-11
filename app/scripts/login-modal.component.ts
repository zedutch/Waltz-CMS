import {Component}           from '@angular/core';
import {CORE_DIRECTIVES}     from '@angular/common';

import {TranslatePipe}       from 'angular2localization/angular2localization';
import {LocalizationService} from 'angular2localization/angular2localization';

import {BS_VIEW_PROVIDERS}   from 'ng2-bootstrap/ng2-bootstrap';
import {MODAL_DIRECTVES}     from 'ng2-bootstrap/ng2-bootstrap';

import {AutoFocus}           from './autofocus.component';

@Component({
    selector      : 'login-modal',
    templateUrl   : '/modals/login',
    viewProviders : [ BS_VIEW_PROVIDERS ],
    directives    : [
                      CORE_DIRECTIVES,
                      MODAL_DIRECTVES,
                      AutoFocus
                    ],
    pipes         : [ TranslatePipe ]
})

export class LoginModalComponent {
    renderContent = false
    loginData     = {
        rememberMe : true
    }
    
    constructor (public localization : LocalizationService) {
        // TODO: check localSettings for the previous username and remember settings. If remembered, try to automatically login.
    }
    
    
    get lang (): string {
        return this.localization.languageCode;
    }
    
    onShow ($event) {
        this.renderContent = true
    }
    
    onHide ($event) {
        this.renderContent = false
    }
    
    login () {
        console.log("Trying to log in... Data used:", this.loginData);
    }
}