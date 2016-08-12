import {Injectable}     from '@angular/core';
import {Http}           from '@angular/http';
import {Headers}        from '@angular/http';
import {RequestOptions} from '@angular/http';

import {LocaleService}  from 'angular2localization/angular2localization';

@Injectable()
export class CMSBackendService {
    URL = 'http://localhost:8080/api';
    _epPosts  = '/posts';
    _epInfo   = '/info';
    _epUsers  = '/users';
    _epPages  = '/pages';
    _epLogin  = this._epUsers + '/login';
    _epLogout = this._epUsers + '/logout';
    options : RequestOptions;

    constructor(private http : Http,
                private locale : LocaleService) {

        this.locale.languageCodeChanged.subscribe(function(newLang) {
            console.log("Language changed: " + newLang);
            this.updateHeaders();
        });

        this.updateHeaders();
    }

    private updateHeaders() {
        let headers = new Headers({
            'Content-Type'    : 'application/json',
            'Accept-Language' : this.locale.getCurrentLanguage()
        });

        this.options = new RequestOptions({headers: headers});
    }
    
    getInfo(callback) {
        var data = this.http.get(this.URL + this._epInfo, this.options);
        data.subscribe(res => {
            if (res.status === 200) {
                var info = res.json();
                console.log("[DEBUGGING] The info object:", info);
                callback(info || {});
            } else {
                console.error("Error retrieving website info!", res)
            }
        });
    }

    postInfo(info, callback = undefined) {
        var data = this.http.post(this.URL + this._epInfo, info, this.options);
        data.subscribe(res => {
            if (res.status === 200) {
                if (callback) {
                    callback(res.json() || {});
                }
            } else {
                console.error("Error saving the website info!", res)
            }
        });
    }

    getAllPosts(callback) {
        var data = this.http.get(this.URL + this._epPosts);
        data.subscribe(res => {
            if (res.status === 200) {
                var posts = res.json();
                posts.map(p => p.datePosted = new Date(p.datePosted));
                callback(posts);
            } else {
                console.error("Error retrieving all posts!", res)
            }
        });
    }

    getPost(id, callback) {
        var data = this.http.get(this.URL + this._epPosts + "/" + id);
        data.subscribe(res => {
            if (res.status === 200) {
                var post = res.json();
                post.datePosted = new Date(post.datePosted);
                callback(post);
            } else {
                console.error("Error retrieving post with id '" + id + "'!", res)
            }
        });
    }

    register(userData, callback) {
        var data = this.http.post(this.URL + this._epUsers, userData, this.options);
        data.subscribe(res => {
            if (res.status === 200) {
                callback(res.json());
            } else {
                console.error("Error registering user with user data", data, "Error message:", res);
            }
        })
    }

    login(userData, callback) {
        var data = this.http.post(this.URL + this._epLogin, userData, this.options);
        data.subscribe(res => {
            if (res.status === 200) {
                callback(res.json());
            } else {
                console.error("Error during login in for user with user data", data, "Error message:", res);
            }
        })
    }

     getPage(urlString, callback) {
        var data = this.http.get(this.URL + this._epPages +'/' + urlString);
        data.subscribe(res => {
            if (res.status === 200) {
                callback(res.json());
            } else {
                console.error("Error retrieving page with url string '" + urlString + "'!", res)
            }
        });
    }

    updatePage(page, callback = undefined) {
        var data = this.http.put(this.URL + page.url, page, this.options);
        data.subscribe(res => {
            if (res.status === 200) {
                if (callback) {
                    callback(res.json() || {});
                }
            } else {
                console.error("Error saving page '" + page.title + "'!", res)
            }
        });
    }

    getEvents(callback) {
        var data = [];
        data.push({
            title : "Workshop HTML",
            date : new Date('2016-05-06T19:00+02:00'),
            endDate : new Date('2016-05-06T21:30+02:00'),
            info : "Come join us for this exciting workshop on learning HTML!",
            price : "Free"
        });
        data.push({
            title : "Cocktail party",
            date : new Date('2016-05-09T21:00+02:00'),
            endDate : new Date('2016-05-10T03:00+02:00'),
            info : "Cocktails and music!",
            price : "5"
        });
        data.push({
            title : "Cocktail party",
            date : new Date('2016-05-11T21:00+02:00'),
            endDate : new Date('2016-05-12T03:00+02:00'),
            info : "Cocktails and music!",
            price : "5"
        });
        data.push({
            title : "Cocktail party",
            date : new Date('2016-05-11T19:00+02:00'),
            endDate : new Date('2016-05-11T21:00+02:00'),
            info : "Cocktails and music!",
            price : "5"
        });
        data.push({
            title : "Cocktail party",
            date : new Date('2016-05-11T14:00+02:00'),
            endDate : new Date('2016-05-11T16:00+02:00'),
            info : "Cocktails and music!",
            price : "5"
        });
        data.push({
            title : "Cocktail party",
            date : new Date('2016-05-12T14:00+02:00'),
            endDate : new Date('2016-05-12T16:00+02:00'),
            info : "Cocktails and music!",
            price : "5"
        });
        data.push({
            title : "Cocktail party",
            date : new Date('2016-05-12T14:00+02:00'),
            endDate : new Date('2016-05-12T16:00+02:00'),
            info : "Cocktails and music!",
            price : "5"
        });
        data.push({
            title : "Cocktail party",
            date : new Date('2016-05-12T14:00+02:00'),
            endDate : new Date('2016-05-12T16:00+02:00'),
            info : "Cocktails and music!",
            price : "5"
        });
        data.push({
            title : "Cocktail party",
            date : new Date('2016-05-12T14:00+02:00'),
            endDate : new Date('2016-05-12T16:00+02:00'),
            info : "Cocktails and music!",
            price : "5"
        });
        data.push({
            title : "Cocktail party",
            date : new Date('2016-05-12T14:00+02:00'),
            endDate : new Date('2016-05-12T16:00+02:00'),
            info : "Cocktails and music!",
            price : "5"
        });
        data.push({
            title : "Cocktail party",
            date : new Date('2016-05-12T14:00+02:00'),
            endDate : new Date('2016-05-12T16:00+02:00'),
            info : "Cocktails and music!",
            price : "5"
        });
        callback(data)
    }
}