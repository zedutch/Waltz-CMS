import {Component}          from 'angular2/core';
import {OnInit}             from 'angular2/core';

import {CMSBackendService}  from './cms-backend.service';

@Component({
    selector: 'waltz-main',
    templateUrl: 'views/view1',
    providers: [CMSBackendService]
})

export class AppComponent implements OnInit {
    data = {};
    url;
    
    constructor(private _cmsBackendService: CMSBackendService) {
        this.url = this._cmsBackendService.URL;
    }

    ngOnInit() {
        var self = this;
        this._cmsBackendService.api(function(data) {
            console.log("Data: ", data);
            self.data = data;
        });
    }
}