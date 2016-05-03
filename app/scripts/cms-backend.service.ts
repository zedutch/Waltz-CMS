import {Injectable} from 'angular2/core';
import {Http}       from 'angular2/http';

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
}