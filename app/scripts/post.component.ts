import {Component, Input} from 'angular2/core';

@Component({
    selector    : 'post',
    templateUrl : 'components/post'
})

export class PostComponent {
    @Input() post : Object;

    constructor() {}
}