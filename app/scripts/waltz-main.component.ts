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
    templateUrl   : '/views/main',
    providers     : [
                        CMSBackendService,
                        AppDataService,
                        LocaleService,
                        LocalizationService
                    ]
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

    constructor(public locale           : LocaleService,
                public localization     : LocalizationService,
                public viewContainerRef : ViewContainerRef,
                private _appdata        : AppDataService) {
        super(null, localization);

        this.locale.useLocalStorage();
        this.locale.addLanguage('en');
        this.locale.addLanguage('nl');
        this.locale.definePreferredLocale('nl', 'BE', 30);
        this.locale.definePreferredCurrency('EUR');
        this.localization.translationProvider('../lang/locale-');
        this.localization.updateTranslation();

        this.user = _appdata.user;
        _appdata.userChange.subscribe(user => this.user = user);

        this.info = _appdata.info;
        _appdata.infoChange.subscribe(info => {this.info = info;
            console.debug("Info changed in main!", info)
        });

        // Hack needed for ng2-bootstrap modals
        this.viewContainerRef = viewContainerRef;
    }

    changeUserData(user) {
        this._appdata.setUser(user);
    }

    changeInfoData(info) {
        this._appdata.setInfo(info);
    }

    ngOnInit() {
//        this._router.navigate(['/']);
    }
}