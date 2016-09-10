import {Component}       from '@angular/core';
import {Output}          from '@angular/core';
import {EventEmitter}    from '@angular/core';

@Component({
    selector    : 'waltz-confirm',
    templateUrl : 'components/confirmation-dialog'
})

export class ConfirmationDialog {
    @Output() onConfirm : EventEmitter<Boolean> = new EventEmitter<Boolean>();

    tooltipEnabled = false;

    toggleTooltip() {
        // We need to wait for ng2-bootstrap to update to be able to use this properly... (again)
        this.tooltipEnabled = !this.tooltipEnabled;
    }

    confirmDialog(confirmed) {
        if (this.onConfirm) {
            this.onConfirm.emit(confirmed);
        }
    }
}