import {Component}      from '@angular/core';
import {OnInit}         from '@angular/core';
import {OnDestroy}      from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {Subscription}   from 'rxjs/Subscription';

import {Locale}             from 'angular2localization/angular2localization';
import {LocaleService}      from 'angular2localization/angular2localization';
import {LocalizationService}from 'angular2localization/angular2localization';

import {CMSBackendService}  from './cms-backend.service';

@Component({
    selector    : 'post-detail',
    templateUrl : '/views/post-detail'
})

export class PostDetailComponent extends Locale implements OnInit, OnDestroy {
    data = {};
    post = {};
    private urlSubscription : Subscription;
    
    constructor(private _cmsBackendService : CMSBackendService,
                private _currRoute         : ActivatedRoute,
                public locale              : LocaleService,
                public localization        : LocalizationService) {
        super(locale, localization);
    }

    ngOnInit() {
        let self = this;
        this.urlSubscription = this._currRoute.params.subscribe(params => {
            let urlString = params['urlString']
            self._cmsBackendService.getPost(urlString,
                                            post => self.post = post);
        });
    }

    ngOnDestroy() {
        this.urlSubscription.unsubscribe();
    }

    updatePost () {
        this._cmsBackendService.updatePost(this.post,
                                        postUpdate => this.post = postUpdate);
    }
}