import {Injectable}     from '@angular/core';

import {Http}           from '@angular/http';
import {Response}       from '@angular/http';
import {Headers}        from '@angular/http';
import {RequestOptions} from '@angular/http';

import {Observable}     from 'rxjs/Observable';

import {LocaleService}  from 'angular2localization/angular2localization';

import {LocalStorageService} from 'angular-2-local-storage';

@Injectable()
export class CMSBackendService {
	LS_TOKEN = 'Waltz_LS_CMS_Token';
    URL   = 'http://localhost:8080/api';
    _epPosts  = '/posts';
    _epInfo   = '/info';
    _epUsers  = '/users';
    _epPages  = '/pages';
    _epLogin  = this._epUsers + '/login';
    _epLogout = this._epUsers + '/logout';
    options : RequestOptions;
	token = '';

    constructor(private http : Http,
                private locale : LocaleService,
				private localStorage : LocalStorageService) {

        this.locale.languageCodeChanged.subscribe(function(newLang) {
            console.log("Language changed: " + newLang);
            this.updateHeaders();
        });

		this.token = this.localStorage.get(this.LS_TOKEN);
        this.updateHeaders();
    }

    private updateHeaders() {
        let headers = new Headers({
            'Accept-Language' : this.locale.getCurrentLanguage() || "nl",
			'Authorization'   : 'Bearer ' + this.token
        });

        this.options = new RequestOptions({headers: headers});
    }

    private extractJSON(res : Response) {
        if (res.status === 200) {
            let body = res.json();
            return body || {};
        }
    }

    private handleError(error : any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

	setToken(token) {
		this.localStorage.set(this.LS_TOKEN, token);
		this.token = token;
		this.updateHeaders();
	}
    
    getInfo() : Observable<any> {
        return this.http.get(this.URL + this._epInfo, this.options)
                        .map(this.extractJSON)
                        .catch(this.handleError);
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

    getPost(urlString, callback) {
        var data = this.http.get(this.URL + this._epPosts + '/' + urlString);
        data.subscribe(res => {
            if (res.status === 200) {
                if (callback) {
                    var post = res.json();
                    post.datePosted = new Date(post.datePosted);
                    callback(post);
                }
            } else {
                console.error("Error retrieving post with url '" + urlString + "'!", res)
            }
        });
    }

    updatePost(post, callback = undefined) {
        var data = this.http.put(this.URL + post.url, post, this.options);
        data.subscribe(res => {
            if (res.status === 200) {
                if (callback) {
                    var post = res.json() || {};
                    post.postedOn = new Date(post.postedOn);
                    callback(post);
                }
            } else {
                console.error("Error saving post '" + post.title + "'!", res)
            }
        });
    }

    deletePost(urlString) : Observable<any> {
        return this.http.delete(this.URL + this._epPosts + '/' + urlString,
                                this.options)
                        .catch(this.handleError);
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