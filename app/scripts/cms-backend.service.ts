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
                callback(res.json());
            } else {
                console.error("Error retrieving all posts!", res)
            }
        });
    }
}