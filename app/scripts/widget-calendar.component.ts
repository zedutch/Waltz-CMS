import {Component}          from 'angular2/core';
import {OnInit}             from 'angular2/core';
import {CORE_DIRECTIVES}    from 'angular2/common';
import {FORM_DIRECTIVES}    from 'angular2/common';

import * as moment             from 'moment';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import {TranslatePipe}      from 'angular2localization/angular2localization';
import {LocaleDatePipe}     from 'angular2localization/angular2localization';

import {CMSBackendService}  from './cms-backend.service';

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

export class WidgetCalendarComponent implements OnInit {
    date : Date;
    listMode = false;
    events = [];
    filteredEvents = [];
    dayClasses = [];

    constructor(private _cmsBackendService : CMSBackendService) {}

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

    // ?Array<{date:Date, mode:string, clazz:string}>
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