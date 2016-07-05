import {bootstrap}            from '@angular/platform-browser-dynamic';
import {enableProdMode}       from '@angular/core';
import {HTTP_PROVIDERS}       from '@angular/http';
import {ROUTER_PROVIDERS}     from '@angular/router';
import {WaltzMainComponent}   from './waltz-main.component';

//enableProdMode();

bootstrap(WaltzMainComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);