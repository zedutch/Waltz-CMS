import {Component}          from 'angular2/core';
import {OnInit}             from 'angular2/core';
import {HTTP_PROVIDERS}     from 'angular2/http';
import {TranslatePipe}      from 'angular2localization/angular2localization';
import {LocaleService, LocalizationService} from 'angular2localization/angular2localization';

import {CMSBackendService}  from './cms-backend.service';

import {PostComponent}      from './post.component';

@Component({
    selector    : 'waltz-main',
    templateUrl : 'views/view1',
    providers   : [
                    HTTP_PROVIDERS,
                    CMSBackendService,
                    LocaleService,
                    LocalizationService
                  ],
    directives  : [PostComponent],
    pipes       : [TranslatePipe]
})

export class AppComponent implements OnInit {
    data = {};
    url;
    posts = [];
    
    constructor(private _cmsBackendService: CMSBackendService,
                public locale: LocaleService,
                public localization: LocalizationService) {
        this.url = this._cmsBackendService.URL;
        this.locale.addLanguage('en');
        this.locale.addLanguage('nl');
        this.locale.definePreferredLocale('nl', 'BE', 30);
        this.locale.definePreferredCurrency('EUR');
        this.localization.translationProvider('../lang/locale-');
    }

    ngOnInit() {
        var self = this;
        this._cmsBackendService.getAllPosts(function(posts) {
            self.posts = posts;
        });
    }
}