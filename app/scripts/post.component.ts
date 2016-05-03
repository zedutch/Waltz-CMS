import {Component, Input} from 'angular2/core';
import {Router}           from 'angular2/router';
import {TranslatePipe}    from 'angular2localization/angular2localization';
import {LocaleDatePipe}   from 'angular2localization/angular2localization';

@Component({
    selector    : 'post',
    templateUrl : 'components/post',
    pipes       : [TranslatePipe, LocaleDatePipe]
})

export class PostComponent {
    @Input() post : Object;

    constructor(private _router : Router) {}

    openPost() {
        this._router.navigate( ['PostDetail', { id : this.post._id }] );
    }
}