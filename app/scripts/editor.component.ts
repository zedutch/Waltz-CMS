import {Component}           from '@angular/core';
import {OnInit}              from '@angular/core';
import {Input}               from '@angular/core';
import {Output}              from '@angular/core';
import {EventEmitter}        from '@angular/core';
import {ElementRef}          from '@angular/core';
import {CORE_DIRECTIVES}     from '@angular/common';

import {Locale}              from 'angular2localization/angular2localization';
import {LocaleService}       from 'angular2localization/angular2localization';
import {LocalizationService} from 'angular2localization/angular2localization';
import {TranslatePipe}       from 'angular2localization/angular2localization';

import {BS_VIEW_PROVIDERS}   from 'ng2-bootstrap/ng2-bootstrap';
import {TOOLTIP_DIRECTIVES}  from 'ng2-bootstrap/ng2-bootstrap';

import {Link}                from './link.component';
import {AppDataService}      from './app-data.service';

@Component({
    selector      : 'editor',
    templateUrl   : '/components/editor',
    viewProviders : [ BS_VIEW_PROVIDERS ],
    providers     : [
                      TranslatePipe
                    ],
    directives    : [
                      CORE_DIRECTIVES,
                      TOOLTIP_DIRECTIVES,
                      Link
                    ],
    pipes         : [ TranslatePipe ]
})

export class EditorComponent extends Locale implements OnInit {
    _content : any = {}
    @Input() adminonly = false

    @Output() contentChange : EventEmitter<any> = new EventEmitter<any> ();

    document : any
    value : string
    initialValue : string
    isEnabled : boolean
    isEditing = false
    savingDisabled = true

    constructor (public localization : LocalizationService,
                 public locale       : LocaleService,
                private _appData     : AppDataService,
                private _element     : ElementRef,
                private _translate   : TranslatePipe) {
        super(locale, localization);
        this.document = _element.nativeElement.ownerDocument;
    }

    ngOnInit () {
        this._appData.userChange.subscribe(this.userChange);
        this.userChange(this._appData.user);
    }

    @Input()
    set content(content: string) {
        this._content = content;
    }

    get content() {
        return this._content;
    }

    startEditMode () {
        if (this.isEnabled && !this.isEditing) {
            this.isEditing = true;
            this.value = this._content;
            this.initialValue = this.value;
            this.updateSaveButton();
        }
    }

    contentUpdated () {
        this.updateSaveButton();
    }

    updateSaveButton () {
        this.savingDisabled = this.initialValue == this.value;
    }

    save () {
        if (!this.savingDisabled) {
            this.value = this.sanitizeHTML(this.value);
            this._content = this.value;
            this.isEditing = false;
            this.contentChange.emit(this._content);
        }
    }

    close (inputArea) {
        inputArea.elementRef.nativeElement.innerHTML = this._content;
        this.value = this.initialValue;
        this._content = this.initialValue;
        this.isEditing = false;
    }

    userChange = (user) => {
        this.isEnabled = user.isAdmin || ((user.isStaff || false) && !this.adminonly) || false;
    };

    sanitizeHTML (dirtyCode) {
        var regex = /(class="[^\"]*)align-[^\" ]*( [^\"]*)?" style="text-align: ([^;\"]*)[; ]*"/g;
        dirtyCode = dirtyCode.replace(regex, "$1align-$3$2\"");
        regex = /(class=".*)" style="text-align: ([^;\"]*);?"/g;
        dirtyCode = dirtyCode.replace(regex, "$1 align-$2\"");
        regex = /style="text-align: ([^;\"]*);?"/g;
        dirtyCode = dirtyCode.replace(regex, "class=\"align-$1\"");
        return dirtyCode
    };

    linkSelected () {
        if (this.document.queryCommandEnabled("unlink")) {
            var selected = document.getSelection();
            return selected.anchorNode.parentNode.nodeName == 'A';
        }

        return false;
    }

    handleLinking (el, queryStr) {
        if (!this.linkSelected()) {
            var q = this._translate.transform(queryStr, this.lang);
            var url = prompt(q, 'http://');
            el.elementRef.nativeElement.focus();

            if (url) {
                var linkText = this.document.getSelection();
                this.document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + linkText + '</a>');
            }
        } else {
            this.command('unlink', el);
        }
    }

    command (type, el) {
        el.elementRef.nativeElement.focus();
        this.document.execCommand(type);
    }
}