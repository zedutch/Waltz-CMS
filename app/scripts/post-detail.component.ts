import {Component}      from '@angular/core';
import {OnInit}         from '@angular/core';
import {OnDestroy}      from '@angular/core';

import {ActivatedRoute} from  '@angular/router';

import {Subscription}   from 'rxjs/Subscription';

import {CMSBackendService}  from './cms-backend.service';

@Component({
    selector    : 'post-detail',
    templateUrl : '/views/post-detail'
})

export class PostDetailComponent implements OnInit, OnDestroy {
    data = {};
    post = {};
    private urlSubscription : Subscription;
    
    constructor(private _cmsBackendService : CMSBackendService,
                private _currRoute         : ActivatedRoute) {}

    ngOnInit() {
        let self = this;
        this.urlSubscription = this._currRoute.params.subscribe(params => {
            let urlString = params['urlString']
            self._cmsBackendService.getPost(urlString, function(post) {
                self.post = post;
            });
        });
    }

    ngOnDestroy() {
        this.urlSubscription.unsubscribe();
    }

    updatePost () {
        this._cmsBackendService.updatePost(this.post, postUpdate => {
            this.post = postUpdate;
        });
    }
}