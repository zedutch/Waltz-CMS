import {Component}          from 'angular2/core';
import {OnInit}             from 'angular2/core';
import {RouteParams}        from 'angular2/router';
import {TranslatePipe}      from 'angular2localization/angular2localization';

import {CMSBackendService}  from './cms-backend.service';

import {PostComponent}      from './post.component';

@Component({
    selector    : 'post-detail',
    templateUrl : '/views/post-detail',
    providers   : [
                    CMSBackendService
                  ],
    directives  : [PostComponent],
    pipes       : [TranslatePipe]
})

export class PostDetailComponent implements OnInit {
    data = {};
    post = {};
    
    constructor(private _cmsBackendService : CMSBackendService,
                private _routeParams       : RouteParams) {}

    ngOnInit() {
        let self = this;
        let id = this._routeParams.get('id');
        this._cmsBackendService.getPost(id, function(post) {
            self.post = post;
        });
    }
}