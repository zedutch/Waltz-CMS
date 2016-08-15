import {Component}           from '@angular/core';
import {OnInit}              from '@angular/core';
import {Input}               from '@angular/core';
import {Output}               from '@angular/core';
import {EventEmitter}        from '@angular/core';
import {CORE_DIRECTIVES}     from '@angular/common';

import {Locale}              from 'angular2localization/angular2localization';
import {LocaleService}       from 'angular2localization/angular2localization';
import {LocalizationService} from 'angular2localization/angular2localization';
import {TranslatePipe}       from 'angular2localization/angular2localization';

import {BS_VIEW_PROVIDERS}   from 'ng2-bootstrap/ng2-bootstrap';

import {AutoFocus}           from './autofocus.component';
import {AppDataService}      from './app-data.service';

@Component({
    selector      : 'editable-label',
    templateUrl   : '/components/editable-label',
    viewProviders : [ BS_VIEW_PROVIDERS ],
    directives    : [
                      CORE_DIRECTIVES,
                      AutoFocus
                    ],
    pipes         : [ TranslatePipe ]
})

export class EditableLabelComponent extends Locale implements OnInit {
    @Input() label : string
    @Input() adminonly = false

    @Output() contentChange : EventEmitter<any> = new EventEmitter<any> ();

    value : string
    initialValue : string
    isEnabled : boolean
    isEditing = false
    savingDisabled = true
    
    constructor (public localization : LocalizationService,
                 public locale       : LocaleService,
                private _appData     : AppDataService) {
        super(locale, localization);
    }

    ngOnInit () {
        this._appData.userChange.subscribe(this.userChange);
        this.userChange(this._appData.user);addEventListener
    }

    startEditMode () {
        if (this.isEnabled && !this.isEditing) {
            this.isEditing = true;
            this.value = this.label;
            this.initialValue = this.value;
            this.updateSaveButton();
        }
    }

    updateSaveButton () {
        this.savingDisabled = this.initialValue == this.value
    }

    save () {
        if (!this.savingDisabled) {
            this.label = this.value;
            this.isEditing = false;
            this.contentChange.emit(this.label);
        }
    }

    close () {
        this.value = this.initialValue;
        this.isEditing = false;
    }

    userChange = (user) => {
        this.isEnabled = user.isAdmin || ((user.isStaff || false) && !this.adminonly) || false
    };
}