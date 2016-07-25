import {Component}           from '@angular/core';
import {OnInit}              from '@angular/core';
import {CORE_DIRECTIVES}     from '@angular/common';
import {FORM_DIRECTIVES}     from '@angular/common';

import {DATEPICKER_DIRECTIVES} 
                             from 'ng2-bootstrap/ng2-bootstrap';

import {Locale}              from 'angular2localization/angular2localization';
import {LocaleService}       from 'angular2localization/angular2localization';
import {LocalizationService} from 'angular2localization/angular2localization';
import {TranslatePipe}       from 'angular2localization/angular2localization';
import {LocaleDatePipe}      from 'angular2localization/angular2localization';

import {CMSBackendService}   from './cms-backend.service';

@Component({
    selector    : 'calendar-widget',
    templateUrl : '/widgets/calendar',
    providers   : [
        CMSBackendService
    ],
    directives  : [
        DATEPICKER_DIRECTIVES,
        CORE_DIRECTIVES,
        FORM_DIRECTIVES
    ],
    pipes       : [
        TranslatePipe,
        LocaleDatePipe
    ]
})

export class WidgetCalendarComponent extends Locale implements OnInit {
    date : Date;
    listMode = false;
    events = [];
    filteredEvents = [];
    dayClasses = [];

    constructor(private _cmsBackendService : CMSBackendService,
                public locale              : LocaleService,
                public localization        : LocalizationService) {
        super(locale, localization);
    }

    reset() {
        this.date = new Date(new Date().setHours(0,0,0,0));
        this.filteredEvents = this.getEventsForSelected();
    }

    showList() {
        this.listMode = true;
    }

    showCalendar() {
        this.listMode = false;
    }

    dateChanged($event) {
        this.filteredEvents = this.getEventsForSelected();
    }

    getEventsForSelected() {
    var date = this.date.setHours(0,0,0,0);
        var filteredEvents = this.events.filter(function(event) {
            var eDate = new Date(event.date).setHours(0,0,0,0);
            return eDate === date
        });
        return filteredEvents;
    }

    parseCustomClasses() {
        var eventDict = {};
        for (var event of this.events) {
            var date = event.date.setHours(0,0,0,0);
            if (!eventDict[date]) {
                eventDict[date] = 0;
            }
            eventDict[date]++;
        }

        this.dayClasses = new Array();
        for (var eventDate in eventDict) {
            var nEvents = eventDict[eventDate];
            var eClass = "events-sparse";
            if (nEvents > 2) {
                eClass = "events-medium";
            }
            if (nEvents > 5) {
                eClass = "events-lots";
            }
            this.dayClasses.push({
                date : new Date(parseInt(eventDate)),
                mode : "day",
                clazz : eClass
            });
        }
    }

    ngOnInit() {
        var self = this;
        this._cmsBackendService.getEvents(function(events) {
            self.events = events;
            self.reset();
            self.parseCustomClasses();
        });
    }
}