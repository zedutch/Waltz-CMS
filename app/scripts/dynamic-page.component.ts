import {Component}          from '@angular/core';
import {OnInit}             from '@angular/core';
import {RouteSegment}       from '@angular/router';

import {TranslatePipe}      from 'angular2localization/angular2localization';
import {LocaleDatePipe}     from 'angular2localization/angular2localization';

import {CMSBackendService}  from './cms-backend.service';
import {AppDataService}     from './app-data.service';

import {EditorComponent}        from './editor.component';
import {EditableLabelComponent} from './editable-label.component';

@Component({
    selector    : 'dynamic-page',
    templateUrl : '/views/dynamic-page',
    providers   : [
                    CMSBackendService
                  ],
    directives  : [
                    EditorComponent,
                    EditableLabelComponent
                  ],
    pipes       : [
                    TranslatePipe,
                    LocaleDatePipe
                  ]
})

export class DynamicPageComponent implements OnInit {
    page : any = {};

    originalTitle : string;

    constructor(private _cmsBackendService : CMSBackendService,
                private _currSegment       : RouteSegment,
                private _appData           : AppDataService) {}

    ngOnInit () {
        let self = this;
        let urlString = this._currSegment.getParam('urlString');
        this._cmsBackendService.getPage(urlString, function(page) {
            self.page = page;
            self.originalTitle = page.title;
        });
    }

    updatePage () {
        let self = this
        this._cmsBackendService.updatePage(this.page, pageUpdate => {
            self.page = pageUpdate;
            if (self.page.title != self.originalTitle) {
                var info = self._appData.info;
                info.pages.forEach(page => {
                    if (page.title == self.originalTitle) {
                        self.originalTitle = self.page.title;
                        page.title = self.page.title;
                        self._appData.setInfo(info);
                    }
                });
            }
        });
    }
}