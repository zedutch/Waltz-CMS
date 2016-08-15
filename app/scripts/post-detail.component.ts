import {Component}          from '@angular/core';
import {OnInit}             from '@angular/core';
import {RouteSegment}       from '@angular/router';

import {TranslatePipe}      from 'angular2localization/angular2localization';
import {LocaleDatePipe}     from 'angular2localization/angular2localization';

import {CMSBackendService}  from './cms-backend.service';

import {EditorComponent}        from './editor.component';
import {EditableLabelComponent} from './editable-label.component';
import {PostComponent}          from './post.component';

@Component({
    selector    : 'post-detail',
    templateUrl : '/views/post-detail',
    providers   : [
                    CMSBackendService
                  ],
    directives  : [
                    PostComponent,
                    EditorComponent,
                    EditableLabelComponent
                  ],
    pipes       : [
                    TranslatePipe,
                    LocaleDatePipe
                  ]
})

export class PostDetailComponent implements OnInit {
    data = {};
    post = {};
    
    constructor(private _cmsBackendService : CMSBackendService,
                private _currSegment       : RouteSegment) {}

    ngOnInit() {
        let self = this;
        let id = this._currSegment.getParam('id');
        this._cmsBackendService.getPost(id, function(post) {
            self.post = post;
        });
    }

    updatePost () {
        this._cmsBackendService.updatePost(this.post, postUpdate => {
            this.post = postUpdate;
        });
    }
}