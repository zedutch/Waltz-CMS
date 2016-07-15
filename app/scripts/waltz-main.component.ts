import {Component}               from '@angular/core';
import {ViewContainerRef}        from '@angular/core';
import {OnInit}                  from '@angular/core';
import {CORE_DIRECTIVES}         from '@angular/common';
import {Routes}                  from '@angular/router';
import {Router}                  from '@angular/router';
import {ROUTER_DIRECTIVES}       from '@angular/router';

import {Locale}                  from 'angular2localization/angular2localization';
import {TranslatePipe}           from 'angular2localization/angular2localization';
import {LocaleService}           from 'angular2localization/angular2localization';
import {LocalizationService}     from 'angular2localization/angular2localization';

import {AlertComponent }         from 'ng2-bootstrap/ng2-bootstrap';

import {WaltzViewComponent}      from './waltz-view.component';
import {PostDetailComponent}     from './post-detail.component';
import {LoginModalComponent}     from './login-modal.component';
import {AppDataService}          from './app-data.service';

@Component({
    selector      : 'waltz-main',
    templateUrl   : '/views/main',
    providers     : [
                      LocaleService,
                      LocalizationService,
                      AppDataService
                    ],
    directives    : [
                      WaltzViewComponent,
                      ROUTER_DIRECTIVES,
                      CORE_DIRECTIVES,
                      AlertComponent,
                      LoginModalComponent
                    ],
    pipes         : [ TranslatePipe ]
})

@Routes([
    {
        path      : '/',
        component : WaltzViewComponent
    }, {
        path      : '/posts/:id',
        component : PostDetailComponent
    }
])

export class WaltzMainComponent extends Locale implements OnInit {
    data = {};
    url;
    /*
     * Setting 'alert.dismissible' to a value (no matter what), will make the alert dismissible.
     */
    alert = {};
    user : any;

    constructor(public locale           : LocaleService,
                public localization     : LocalizationService,
                private _router         : Router,
                public viewContainerRef : ViewContainerRef,
                private _appdata        : AppDataService) {
        super(null, localization);

        this.locale.addLanguage('en');
        this.locale.addLanguage('nl');
        this.locale.definePreferredLocale('nl', 'BE', 30);
        this.locale.definePreferredCurrency('EUR');
        this.localization.translationProvider('../lang/locale-');
        this.localization.updateTranslation();

        this.user = _appdata.user;
        _appdata.userChange.subscribe(user => this.user = user);

        // Hack needed for ng2-bootstrap modals
        this.viewContainerRef = viewContainerRef;
    }

    changeUserData(user) {
        this._appdata.setUser(user);
    }

    ngOnInit() {
        this._router.navigate(['/']);
    }
}