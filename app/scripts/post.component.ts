import {Component, Input} from '@angular/core';
import {OnInit}           from '@angular/core';
import {Router}           from '@angular/router';

import {AppDataService}   from './app-data.service';

@Component({
    selector    : 'post',
    templateUrl : 'components/post'
})

export class PostComponent implements OnInit {
    @Input() post;
    info : any = {};
    user : any = {};

    constructor(private _router  : Router,
                private _appData : AppDataService) {}

    openPost(forceOpen = false) {
        if (this.info.usePostDetails || forceOpen) {
            // TODO: if forceOpen, start the posts page in edit mode (if the user has sufficient rights)
            this._router.navigate( ['/posts', this.post.urlString] );
        }
    }

    ngOnInit() {
        this.info = this._appData.info;
        this._appData.infoChange.subscribe(info => this.info = info);
        this.user = this._appData.user;
        this._appData.userChange.subscribe(user => this.user = user);
    }
}