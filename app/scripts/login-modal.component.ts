import {Component}           from '@angular/core';
import {CORE_DIRECTIVES}     from '@angular/common';

import {TranslatePipe}       from 'angular2localization/angular2localization';
import {LocalizationService} from 'angular2localization/angular2localization';

import {BS_VIEW_PROVIDERS}   from 'ng2-bootstrap/ng2-bootstrap';
import {MODAL_DIRECTVES}     from 'ng2-bootstrap/ng2-bootstrap';
import {TAB_DIRECTIVES}      from 'ng2-bootstrap/ng2-bootstrap';
import {AlertComponent}      from 'ng2-bootstrap/ng2-bootstrap';

import {AutoFocus}           from './autofocus.component';

@Component({
    selector      : 'login-modal',
    templateUrl   : '/modals/login',
    viewProviders : [ BS_VIEW_PROVIDERS ],
    directives    : [
                      CORE_DIRECTIVES,
                      MODAL_DIRECTVES,
                      TAB_DIRECTIVES,
                      AutoFocus,
                      AlertComponent
                    ],
    pipes         : [ TranslatePipe ]
})

export class LoginModalComponent {
    renderContent    = false
    showError        = false
    registrationData : any = {}
    loginData : any        = {}
    
    constructor (public localization : LocalizationService) {
        // TODO: check localSettings for the previous username and remember settings. If remembered, try to automatically login.
    }
    
    
    get lang (): string {
        return this.localization.languageCode;
    }
    
    onShow ($event) {
        this.renderContent = true;

        this.registrationData = {};
        this.loginData = {
            rememberMe : true
        };
    }
    
    onHide ($event) {
        this.renderContent = false;
    }

    hideError () {
        this.showError = false;
    }
    
    login () {
        console.log("Trying to log in... Data used:", this.loginData);
    }
    
    register () {
        console.log("Trying to register... Data used:", this.registrationData);

        if (this.registrationData.password !== this.registrationData.passwordRepeat) {
            this.showError = true;
        }
    }
}