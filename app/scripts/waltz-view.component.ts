import {Component}          from '@angular/core';
import {OnInit}             from '@angular/core';

import {Locale}                  from 'angular2localization/angular2localization';
import {LocaleService}           from 'angular2localization/angular2localization';
import {LocalizationService}     from 'angular2localization/angular2localization';
import {TranslatePipe}           from 'angular2localization/angular2localization';

import {CMSBackendService}       from './cms-backend.service';

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
    posts = [];
    info : any  = {};
    user : any  = {};
    
    constructor(private _cmsBackendService : CMSBackendService,
                public locale              : LocaleService,
                public localization        : LocalizationService) {
        super(locale, localization);
    }

    ngOnInit () {
        var self = this;
        this._cmsBackendService.getInfo(function(info) {
            self.info = info;
            // For debugging purposes:
            self.info.showFAQ = false;
        });
        this._cmsBackendService.getAllPosts(function(posts) {
            self.posts = posts;
        });

        // For debugging purposes:
         this.user.isAdmin = true;
    }
    
    toggleCalendar () {
        this.info.showCalendar = !this.info.showCalendar;
    }
    
    toggleFAQ () {
        this.info.showFAQ = !this.info.showFAQ;
    }
    
    toggleAbout () {
        this.info.showAbout = !this.info.showAbout;
    }
}