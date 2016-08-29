import {NgModule}        from '@angular/core';

import {BrowserModule}   from '@angular/platform-browser';
import {HttpModule}      from '@angular/http';
import {JsonpModule}     from '@angular/http';
//import {FormsModule}    from '@angular/forms';
import {DeprecatedFormsModule} from '@angular/common';

import {Routing}                from './app.routing';
import {AppRoutingProviders}    from './app.routing';

// Waltz Components //
import {WaltzMainComponent}      from './waltz-main.component';
import {WaltzViewComponent}      from './waltz-view.component';
import {PostDetailComponent}     from './post-detail.component';
import {PostComponent}           from './post.component';
import {DynamicPageComponent}    from './dynamic-page.component';
import {LoginModalComponent}     from './login-modal.component';
import {NotFoundComponent}       from './not-found.component';

import {EditorComponent}         from './editor.component';
import {EditableLabelComponent}  from './editable-label.component';
import {EditableInfoComponent}   from './editable-info.component';

import {AutoFocus}               from './auto-focus.component';
import {Link}                    from './link.component';

// Waltz Services //
import {CMSBackendService}       from './cms-backend.service';
import {AppDataService}          from './app-data.service';

// Temp. disabled until ng2-bootstrap is fixed
//import {WidgetCalendarComponent} from './widget-calendar.component';
//import {DATEPICKER_DIRECTIVES}   from 'ng2-bootstrap/ng2-bootstrap';

import {BS_VIEW_PROVIDERS}   from 'ng2-bootstrap/ng2-bootstrap';
import {MODAL_DIRECTVES}     from 'ng2-bootstrap/ng2-bootstrap';
import {TAB_DIRECTIVES}      from 'ng2-bootstrap/ng2-bootstrap';
import {AlertComponent}      from 'ng2-bootstrap/ng2-bootstrap';

// Angular2 Localization //
import {TranslatePipe}      from 'angular2localization/angular2localization';
import {LocaleDatePipe}     from 'angular2localization/angular2localization';
import {LocaleService}      from 'angular2localization/angular2localization';
import {LocalizationService}from 'angular2localization/angular2localization';


@NgModule({
    imports: [
        BrowserModule,
//        FormsModule,
        HttpModule,
        JsonpModule,
        DeprecatedFormsModule,
        Routing
    ],
    declarations: [
        TranslatePipe,
        LocaleDatePipe,

        MODAL_DIRECTVES,
        TAB_DIRECTIVES,
        AlertComponent,

        WaltzMainComponent,
        WaltzViewComponent,
        PostDetailComponent,
        PostComponent,
        EditorComponent,
        EditableLabelComponent,
        EditableInfoComponent
//        WidgetCalendarComponent,

//        DATEPICKER_DIRECTIVES
    ],
    providers: [
        CMSBackendService,
        AppDataService,

        AppRoutingProviders,

        LocaleService,
        LocalizationService,

        BS_VIEW_PROVIDERS
    ],
    bootstrap: [
        WaltzMainComponent
    ]
})

export class AppModule { }