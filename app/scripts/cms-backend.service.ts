import {Injectable} from 'angular2/core';

@Injectable()
export class CMSBackendService {
    URL = 'http://localhost:8080/api';
    constructor() { }

    api(callback) {
    }
}