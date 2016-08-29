import {Component}          from '@angular/core';
import {OnInit}             from '@angular/core';

import {Locale}             from 'angular2localization/angular2localization';
import {LocaleService}      from 'angular2localization/angular2localization';
import {LocalizationService}from 'angular2localization/angular2localization';

import {CMSBackendService}  from './cms-backend.service';
import {AppDataService}     from './app-data.service';

@Component({
    selector    : 'waltz-view',
    templateUrl : '/views/home',
    providers   : [
                      CMSBackendService,
                      AppDataService,
                      LocaleService,
                      LocalizationService
                  ]
})

export class WaltzViewComponent extends Locale implements OnInit {
    posts      = [];
    info : any = {};
    user : any;
    
    constructor(private _cmsBackendService : CMSBackendService,
                private _appData           : AppDataService,
                public locale              : LocaleService,
                public localization        : LocalizationService) {
        super(locale, localization);

        this.user = _appData.user;
        _appData.userChange.subscribe(this.userChange);
    }

    ngOnInit () {
        var self = this;
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

        this._cmsBackendService.getAllPosts(function(posts) {
            self.posts = posts;
        });
    }

    userChange = (newUser) => {
        this.user = newUser;
    };

    infoChange = (newInfo) => {
        this._cmsBackendService.postInfo(newInfo);
    };
    
    toggleCalendar () {
        this.info.showCalendar = !this.info.showCalendar;
        this._appData.setInfo(this.info);
    }
    
    toggleFAQ () {
        this.info.showFAQ = !this.info.showFAQ;
        this._appData.setInfo(this.info);
    }
    
    toggleAbout () {
        this.info.showAbout = !this.info.showAbout;
        this._appData.setInfo(this.info);
    }
}