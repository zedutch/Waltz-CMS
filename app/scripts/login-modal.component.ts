import {Component}           from '@angular/core';
import {ViewChild}           from '@angular/core';
import {Output}              from '@angular/core';
import {EventEmitter}        from '@angular/core';

import {LocalizationService} from 'angular2localization/angular2localization';

import {CMSBackendService}   from './cms-backend.service';
import {AppDataService}      from './app-data.service';

import {ModalDirective}      from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector      : 'login-modal',
    templateUrl   : '/modals/login'
})

export class LoginModalComponent {
    renderContent    = false
    errorMessage     = ""
    registrationData : any = {}
    loginData : any        = {}
    user : any = {}

    @ViewChild(ModalDirective)
    modal : ModalDirective;
    
    constructor (public localization : LocalizationService,
                private _cmsBackendService : CMSBackendService,
				private _appData           : AppDataService) {
		this.user = _appData.user;
        _appData.userChange.subscribe(user => this.user = user);
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

	handleAccountData = response => {
		this._cmsBackendService.setToken(response.token);
		this.user = response.user;
		this._appData.setUser(this.user);
		this.close();
	}

    login () {
        if (!this.loginData.username || !this.loginData.password) {
            this.showError("error.invalidLoginData");
        } else {
            this._cmsBackendService.login(this.loginData, this.handleAccountData);
        }
    }

    register () {
        console.log("Trying to register... Data used:", this.registrationData);

        if (this.registrationData.password !== this.registrationData.passwordRepeat) {
            this.showError("error.passwordRepeat");
        } else {
            this._cmsBackendService.register(this.registrationData, this.handleAccountData);
        }
    }
}