import {Component}          from '@angular/core';
import {ViewContainerRef}   from '@angular/core';
import {OnInit}             from '@angular/core';

import {Locale}             from 'angular2localization/angular2localization';
import {LocaleService}      from 'angular2localization/angular2localization';
import {LocalizationService}from 'angular2localization/angular2localization';

import {CMSBackendService}  from './cms-backend.service';
import {AppDataService}     from './app-data.service';

// Add the RxJS operators
import './rxjs-operators';

@Component({
    selector      : 'waltz-main',
    templateUrl   : '/views/main'
})

export class WaltzMainComponent extends Locale implements OnInit {
    data = {};
    url;
    /*
     * Setting 'alert.dismissible' to a value (no matter what), will make the alert dismissible.
     */
    alert = {
        dismissible : true
    };
    info  = {
        message : "Test-Page"
    };
    user : any;

    constructor(public locale               : LocaleService,
                public localization         : LocalizationService,
                public viewContainerRef     : ViewContainerRef,
                private _cmsBackendService  : CMSBackendService,
                private _appData            : AppDataService) {
        super(null, localization);

        this.locale.useLocalStorage();
        this.locale.addLanguage('en');
        this.locale.addLanguage('nl');
        this.locale.definePreferredLocale('nl', 'BE', 30);
        this.locale.definePreferredCurrency('EUR');
        this.localization.translationProvider('../lang/locale-');
        this.localization.updateTranslation();

        this.user = _appData.user;
        _appData.userChange.subscribe(user => this.user = user);

        this.info = _appData.info;
        _appData.infoChange.subscribe(info => this.info = info);

        // Hack needed for ng2-bootstrap modals
        this.viewContainerRef = viewContainerRef;
    }

    changeUserData(user) {
        this._appData.setUser(user);
    }

    changeInfoData(info) {
        this._appData.setInfo(info);
    }

    ngOnInit() {
		if (this._cmsBackendService.hasSession()) {
			this.user = this._cmsBackendService.getPrevSessionUser();
			this.changeUserData(this.user);

			this._cmsBackendService.getUser(this.user.url)
               .subscribe(
                    user => {
                        console.debug("[DEBUGGING] The user object:", user);
                        this.user = user;
                        this.changeUserData(user);
                    },
                    error => console
                                .error("Could not retrieve the logged in user object!"));
		}
		
        this._cmsBackendService.getInfo()
               .subscribe(
                    info => {
                        console.debug("[DEBUGGING] The info object:", info);
                        this.info = info;
                        this._appData.setInfo(info);
                        this._appData.infoChange
                                     .subscribe(this.infoChange);
                    },
                    error => console
                                .error("Could not retrieve the info object!"));
    }

    infoChange = (newInfo) => {
        this._cmsBackendService.postInfo(newInfo);
    };
}