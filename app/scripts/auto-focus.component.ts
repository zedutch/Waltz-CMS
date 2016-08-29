import {Directive}  from '@angular/core'
import {Renderer}   from '@angular/core'
import {ElementRef} from '@angular/core'

@Directive({
    selector : '[autofocus]',
    exportAs : 'autofocus'
})

export class AutoFocus {
    
    constructor(public renderer: Renderer, public elementRef: ElementRef) {}

    ngAfterViewInit () {
        setTimeout(() => {
            this.renderer
                .invokeElementMethod(this.elementRef.nativeElement, 'focus', []);
        }, 300);
    }
}