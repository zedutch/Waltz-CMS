import {Component}           from '@angular/core';

import {Locale}              from 'angular2localization/angular2localization';
import {LocaleService}       from 'angular2localization/angular2localization';
import {LocalizationService} from 'angular2localization/angular2localization';

@Component({
    selector      : 'not-found',
    templateUrl   : '/errors/404'
})

export class NotFoundComponent extends Locale {
    constructor (public localization : LocalizationService,
                 public locale       : LocaleService) {
        super(locale, localization);
    }
}