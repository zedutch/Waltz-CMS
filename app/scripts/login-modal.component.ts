import {Component}           from '@angular/core';
import {ViewChild}           from '@angular/core';
import {Output}              from '@angular/core';
import {EventEmitter}        from '@angular/core';
import {CORE_DIRECTIVES}     from '@angular/common';

import {TranslatePipe}       from 'angular2localization/angular2localization';
import {LocalizationService} from 'angular2localization/angular2localization';

import {BS_VIEW_PROVIDERS}   from 'ng2-bootstrap/ng2-bootstrap';
import {MODAL_DIRECTVES}     from 'ng2-bootstrap/ng2-bootstrap';
import {ModalDirective}     from 'ng2-bootstrap/ng2-bootstrap';
import {TAB_DIRECTIVES}      from 'ng2-bootstrap/ng2-bootstrap';
import {AlertComponent}      from 'ng2-bootstrap/ng2-bootstrap';

import {AutoFocus}           from './autofocus.component';
import {CMSBackendService}   from './cms-backend.service';

@Component({
    selector      : 'login-modal',
    templateUrl   : '/modals/login',
    viewProviders : [ BS_VIEW_PROVIDERS ],
    providers     : [ CMSBackendService ],
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
    errorMessage     = ""
    registrationData : any = {}
    loginData : any        = {}

    @ViewChild(ModalDirective)
    modal : ModalDirective;

    @Output() userDataChange : EventEmitter<any> = new EventEmitter<any>();
    
    constructor (public localization : LocalizationService,
                private _cmsBackendService : CMSBackendService) {
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

    showError(message) {
        this.errorMessage = message;
    }

    hideError () {
        this.errorMessage = "";
    }

    close () {
        this.modal.hide();
    }

    login () {
        if (!this.loginData.username || !this.loginData.password) {
            this.showError("error.invalidLoginData");
        } else {
            this._cmsBackendService.login(this.loginData, user => {
                this.userDataChange.emit(user);
                this.close();
            });
        }
    }

    register () {
        console.log("Trying to register... Data used:", this.registrationData);

        if (this.registrationData.password !== this.registrationData.passwordRepeat) {
            this.showError("error.passwordRepeat");
        } else {
            this._cmsBackendService.register(this.registrationData, accountData => {
                console.log(accountData);
            });
        }
    }
}