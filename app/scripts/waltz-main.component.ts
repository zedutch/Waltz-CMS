import {Component}               from 'angular2/core';
import {HTTP_PROVIDERS}          from 'angular2/http';
import {RouteConfig}             from 'angular2/router';
import {Router}                  from 'angular2/router';
import {ROUTER_DIRECTIVES}       from 'angular2/router';

import {TranslatePipe}           from 'angular2localization/angular2localization';
import {LocaleService}           from 'angular2localization/angular2localization';
import {LocalizationService}     from 'angular2localization/angular2localization';

import {AlertComponent }         from 'ng2-bootstrap/ng2-bootstrap';

import {WaltzViewComponent}      from './waltz-view.component';
import {PostDetailComponent}     from './post-detail.component';

@Component({
    selector    : 'waltz-main',
    templateUrl : '/views/main',
    providers   : [
                    HTTP_PROVIDERS,
                    LocaleService,
                    LocalizationService
                  ],
    directives  : [
                    WaltzViewComponent,
                    ROUTER_DIRECTIVES,
                    AlertComponent
                  ],
    pipes       : [TranslatePipe]
})

@RouteConfig([{
        path         : '/',
        name         : 'Home',
        component    : WaltzViewComponent,
        useAsDefault : true
    },
    
    { path : '/posts/:id',  name : 'PostDetail',  component: PostDetailComponent }
])

export class WaltzMainComponent {
    data = {};
    url;
    posts = [];
    /*
     * Setting 'alert.dismissible' to a value (no matter what), will make the alert dismissible.
     */
    alert = {};
    
    constructor(public locale       : LocaleService,
                public localization : LocalizationService,
                private _router     : Router) {
        this.locale.addLanguage('en');
        this.locale.addLanguage('nl');
        this.locale.definePreferredLocale('nl', 'BE', 30);
        this.locale.definePreferredCurrency('EUR');
        this.localization.translationProvider('../lang/locale-');
    }

    goHome() {
        this._router.navigate(['Home']);
    }

    login() {
        alert('We\'re waiting on ng2-bootstrap to update before we can support logging in...');
    }
}