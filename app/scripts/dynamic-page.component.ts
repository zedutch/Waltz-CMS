import {Component}          from '@angular/core';
import {OnInit}             from '@angular/core';
import {OnDestroy}          from '@angular/core';

import {ActivatedRoute}     from  '@angular/router';

import {Subscription}       from 'rxjs/Subscription';

import {Locale}             from 'angular2localization/angular2localization';
import {LocaleService}      from 'angular2localization/angular2localization';
import {LocalizationService}from 'angular2localization/angular2localization';

import {CMSBackendService}  from './cms-backend.service';
import {AppDataService}     from './app-data.service';

@Component({
    selector    : 'dynamic-page',
    templateUrl : '/views/dynamic-page'
})

export class DynamicPageComponent extends Locale implements OnInit, OnDestroy {
    page : any = {};
    urlSubscription : Subscription;

    originalTitle : string;

    constructor(private _cmsBackendService : CMSBackendService,
                private _currRoute         : ActivatedRoute,
                private _appData           : AppDataService,
                public locale              : LocaleService,
                public localization        : LocalizationService) {
        super(locale, localization);
    }

    ngOnInit () {
        let self = this;
        this.urlSubscription = this._currRoute.params.subscribe(params => {
            let urlString = params['urlString']
            self._cmsBackendService.getPage(urlString, function(page) {
                self.page = page;
                self.originalTitle = page.title;
            });
        });
    }

    ngOnDestroy() {
        this.urlSubscription.unsubscribe();
    }

    updatePage () {
        let self = this
        this._cmsBackendService.updatePage(this.page, pageUpdate => {
            self.page = pageUpdate;
            if (self.page.title != self.originalTitle) {
                var info = self._appData.info;
                info.pages.forEach(page => {
                    if (page.title == self.originalTitle) {
                        self.originalTitle = self.page.title;
                        page.title = self.page.title;
                        self._appData.setInfo(info);
                    }
                });
            }
        });
    }
}