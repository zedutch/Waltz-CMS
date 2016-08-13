import {Component}           from '@angular/core';
import {OnInit}              from '@angular/core';
import {Input}               from '@angular/core';
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
    selector      : 'editable-info',
    templateUrl   : '/components/editable-info',
    viewProviders : [ BS_VIEW_PROVIDERS ],
    directives    : [
                      CORE_DIRECTIVES,
                      AutoFocus
                    ],
    pipes         : [ TranslatePipe ]
})

export class EditableInfoComponent extends Locale implements OnInit {
    @Input() attribute
    @Input() adminonly = false

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
        this._appData.infoChange.subscribe(this.infoChange);
        this.userChange(this._appData.user);
        this.infoChange(this._appData.info);
    }

    startEditMode () {
        if (this.isEnabled) {
            this.isEditing = true
            this.initialValue = this.value
            this.updateSaveButton()
            setTimeout(() => {
                // Resize the textarea to exactly fit its input
                var area = document.getElementById('inputArea')
                area.style.height = area.scrollHeight + 'px'
            }, 1);
        }
    }

    updateSaveButton () {
        this.savingDisabled = this.initialValue == this.value
    }

    save () {
        if (!this.savingDisabled) {
            var info = this._appData.info
            info[this.attribute] = this.value
            // We mainly need to use setInfo to notify other listeners, since the AppData info object itself will already be correct.
            this._appData.setInfo(info)
            this.isEditing = false
        }
    }

    close () {
        this.value = this._appData.info[this.attribute]
        this.isEditing = false
    }

    infoChange = (info) => {
        this.value = info[this.attribute]
    };

    userChange = (user) => {
        this.isEnabled = user.isAdmin || ((user.isStaff || false) && !this.adminonly) || false
    };
}