import {Injectable}   from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Output}       from '@angular/core';

@Injectable()
export class AppDataService {
    user : any = {
        isAdmin : false
    };

    info : any = {}

    @Output() userChange : EventEmitter<any> = new EventEmitter<any> ();
    @Output() infoChange : EventEmitter<any> = new EventEmitter<any> ();

    setUser(newUser) {
        this.user = newUser;
        this.userChange.emit(this.user);
    }

    setInfo(newInfo) {
        this.info = newInfo;
        this.infoChange.emit(this.info);
    }
}