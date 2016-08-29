import {Routes}       from '@angular/router';
import {RouterModule} from '@angular/router';

import {WaltzViewComponent}  from './waltz-view.component';

const appRoutes: Routes = [
    {
        path      : '**',
//        path      : '/',
        component : WaltzViewComponent
//    }, {
//        path      : 'posts/:urlString',
//        component : PostDetailComponent
//    }, {
//        path      : 'pages/:urlString',
//        component : DynamicPageComponent
//    }, {
//        path      : '**',
//        component : NotFoundComponent
    }
];

export const AppRoutingProviders: any[] = [

];

export const Routing = RouterModule.forRoot(appRoutes);