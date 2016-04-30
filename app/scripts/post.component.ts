import {Component, Input}              from 'angular2/core';
import {TranslatePipe, LocaleDatePipe} from 'angular2localization/angular2localization';

@Component({
    selector    : 'post',
    templateUrl : 'components/post',
    pipes       : [TranslatePipe, LocaleDatePipe]
})

export class PostComponent {
    @Input() post : Object;

    constructor() {}
}