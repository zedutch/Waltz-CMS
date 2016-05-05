import {Component}          from 'angular2/core';
import {OnInit}             from 'angular2/core';
import {TranslatePipe}      from 'angular2localization/angular2localization';

import {CMSBackendService}  from './cms-backend.service';

import {PostComponent}      from './post.component';

@Component({
    selector    : 'waltz-view',
    templateUrl : '/views/home',
    providers   : [
                    CMSBackendService
                  ],
    directives  : [PostComponent],
    pipes       : [TranslatePipe]
})

export class WaltzViewComponent implements OnInit {
    posts = [];
    
    constructor(private _cmsBackendService : CMSBackendService) {}

    ngOnInit() {
        var self = this;
        this._cmsBackendService.getAllPosts(function(posts) {
            self.posts = posts;
        });
    }
}