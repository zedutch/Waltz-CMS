import {Component}          from 'angular2/core';
import {OnInit}             from 'angular2/core';
import {HTTP_PROVIDERS}     from 'angular2/http';

import {CMSBackendService}  from './cms-backend.service';

import {PostComponent}      from './post.component';

@Component({
    selector    : 'waltz-main',
    templateUrl : 'views/view1',
    providers   : [HTTP_PROVIDERS, CMSBackendService],
    directives  : [PostComponent]
})

export class AppComponent implements OnInit {
    data = {};
    url;
    posts = [];
    
    constructor(private _cmsBackendService: CMSBackendService) {
        this.url = this._cmsBackendService.URL;
    }

    ngOnInit() {
        var self = this;
        this._cmsBackendService.getAllPosts(function(posts) {
            self.posts = posts;
        });
    }
}