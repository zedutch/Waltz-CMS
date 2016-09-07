import {Component}          from '@angular/core';
import {OnInit}             from '@angular/core';

import {Locale}             from 'angular2localization/angular2localization';
import {LocaleService}      from 'angular2localization/angular2localization';
import {LocalizationService}from 'angular2localization/angular2localization';

import {CMSBackendService}  from './cms-backend.service';
import {AppDataService}     from './app-data.service';

@Component({
    selector    : 'waltz-view',
    templateUrl : '/views/home'
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
        _appData.userChange.subscribe(user => this.user = user);

        this.info = _appData.info;
        _appData.infoChange.subscribe(info => this.info = info);
    }

    ngOnInit () {
        this._cmsBackendService.getAllPosts(posts => this.posts = posts);
    }

    saveOptions () {
        this._appData.setInfo(this.info);
    }
    
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