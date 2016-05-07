import {Component, Input} from '@angular/core';
import {Router}           from '@angular/router';
import {TranslatePipe}    from 'angular2localization/angular2localization';
import {LocaleDatePipe}   from 'angular2localization/angular2localization';

@Component({
    selector    : 'post',
    templateUrl : 'components/post',
    pipes       : [TranslatePipe, LocaleDatePipe]
})

export class PostComponent {
    @Input() post;

    constructor(private _router : Router) {}

    openPost() {
        this._router.navigate( ['/posts', this.post._id] );
    }
}