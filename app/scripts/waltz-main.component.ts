import {Component}          from 'angular2/core';
import {HTTP_PROVIDERS}     from 'angular2/http';

import {TranslatePipe}      from 'angular2localization/angular2localization';
import {LocaleService, LocalizationService} from 'angular2localization/angular2localization';

import {WaltzViewComponent} from './waltz-view.component';

@Component({
    selector    : 'waltz-main',
    templateUrl : '/views/main',
    providers   : [
                    HTTP_PROVIDERS,
                    LocaleService,
                    LocalizationService
                  ],
    directives  : [WaltzViewComponent],
    pipes       : [TranslatePipe]
})

export class WaltzMainComponent {
    data = {};
    url;
    posts = [];
    
    constructor(public locale: LocaleService,
                public localization: LocalizationService) {
        this.locale.addLanguage('en');
        this.locale.addLanguage('nl');
        this.locale.definePreferredLocale('nl', 'BE', 30);
        this.locale.definePreferredCurrency('EUR');
        this.localization.translationProvider('../lang/locale-');
    }
}