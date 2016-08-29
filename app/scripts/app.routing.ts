import {Routes}       from '@angular/router';
import {RouterModule} from '@angular/router';

import {WaltzViewComponent}     from './waltz-view.component';
import {PostDetailComponent}    from './post-detail.component';
import {DynamicPageComponent}   from './dynamic-page.component';
import {NotFoundComponent}      from './not-found.component';

const appRoutes: Routes = [
    {
        path      : '',
        component : WaltzViewComponent
    }, {
        path      : 'posts/:urlString',
        component : PostDetailComponent
    }, {
        path      : 'pages/:urlString',
        component : DynamicPageComponent
    }, {
        path      : '**',
        component : NotFoundComponent
    }
];

export const AppRoutingProviders: any[] = [

];

export const Routing = RouterModule.forRoot(appRoutes);