import {Component}          from '@angular/core';
import {OnInit}             from '@angular/core';
import {RouteSegment}       from '@angular/router';
import {TranslatePipe}      from 'angular2localization/angular2localization';

import {CMSBackendService}  from './cms-backend.service';
import {EditorComponent}    from './editor.component';

@Component({
    selector    : 'dynamic-page',
    templateUrl : '/views/dynamic-page',
    providers   : [
                    CMSBackendService
                  ],
    directives  : [
                    EditorComponent
                  ],
    pipes       : [TranslatePipe]
})

export class DynamicPageComponent implements OnInit {
    page = {};

    constructor(private _cmsBackendService : CMSBackendService,
                private _currSegment       : RouteSegment) {}

    ngOnInit () {
        let self = this;
        let urlString = this._currSegment.getParam('urlString');
        this._cmsBackendService.getPage(urlString, function(page) {
            self.page = page;
        });
    }

    updatePage () {
        this._cmsBackendService.updatePage(this.page, pageUpdate => {
            this.page = pageUpdate;
        });
    }
}