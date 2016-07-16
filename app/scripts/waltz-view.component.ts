import {Component}          from '@angular/core';
import {OnInit}             from '@angular/core';

import {Locale}                  from 'angular2localization/angular2localization';
import {LocaleService}           from 'angular2localization/angular2localization';
import {LocalizationService}     from 'angular2localization/angular2localization';
import {TranslatePipe}           from 'angular2localization/angular2localization';

import {CMSBackendService}       from './cms-backend.service';
import {AppDataService}          from './app-data.service';

import {PostComponent}           from './post.component';
import {WidgetCalendarComponent} from './widget-calendar.component';

@Component({
    selector    : 'waltz-view',
    templateUrl : '/views/home',
    providers   : [
                    CMSBackendService
                  ],
    directives  : [
                    PostComponent,
                    WidgetCalendarComponent
                  ],
    pipes       : [TranslatePipe]
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
        this._cmsBackendService.getInfo(function(info) {
            self.info = info;
            self._appData.setInfo(info);
            self._appData.infoChange.subscribe(self.infoChange);
        });
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