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
//import {WidgetCalendarComponent} from './widget-calendar.component';

import {EditorComponent}         from './editor.component';
import {EditableLabelComponent}  from './editable-label.component';
import {EditableInfoComponent}   from './editable-info.component';

import {AutoFocus}               from './auto-focus.component';
import {Link}                    from './link.component';
import {ConfirmationDialog}      from './confirmation-dialog.component';

// Waltz Services //
import {CMSBackendService}       from './cms-backend.service';
import {AppDataService}          from './app-data.service';

// Ng2-Bootstrap //
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';

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
        Routing,
        Ng2BootstrapModule
    ],
    declarations: [
        TranslatePipe,
        LocaleDatePipe,

        WaltzMainComponent,
        WaltzViewComponent,
        PostDetailComponent,
        PostComponent,
        DynamicPageComponent,
        LoginModalComponent,
        NotFoundComponent,
//        WidgetCalendarComponent,

        EditorComponent,
        EditableLabelComponent,
        EditableInfoComponent,

        AutoFocus,
        Link,
        ConfirmationDialog
    ],
    providers: [
        CMSBackendService,
        AppDataService,

        AppRoutingProviders,

        LocaleService,
        LocalizationService
    ],
    bootstrap: [
        WaltzMainComponent
    ]
})

export class AppModule { }