import {Injectable} from '@angular/core';
import {Http}       from '@angular/http';

@Injectable()
export class CMSBackendService {
    URL = 'http://localhost:8080/api';
    _epPosts = '/posts';

    constructor(private http : Http) { }

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