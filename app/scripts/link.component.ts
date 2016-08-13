import {Directive}  from '@angular/core'
import {ElementRef} from '@angular/core'

@Directive({
    selector : '[link]',
    exportAs : 'link'
})

export class Link {
    
    constructor(public elementRef: ElementRef) {}
}