import {Component, Input} from '@angular/core';
import {OnInit}           from '@angular/core';
import {Router}           from '@angular/router';

import {CMSBackendService}  from './cms-backend.service';
import {AppDataService}     from './app-data.service';

@Component({
    selector    : 'post',
    templateUrl : 'components/post'
})

export class PostComponent implements OnInit {
    @Input() post;
    info : any = {};
    user : any = {};
    destroyed = false;

    constructor(private _router  : Router,
                private _cmsBackendService : CMSBackendService,
                private _appData : AppDataService) {}

    openPost(forceOpen = false) {
        if (this.info.usePostDetails || forceOpen) {
            // TODO: if forceOpen, start the posts page in edit mode (if the user has sufficient rights)
            this._router.navigate( ['/posts', this.post.urlString] );
        }
    }

    deletePost(shouldDelete = true) {
        console.log("Delete post?", shouldDelete);
        if (shouldDelete && (this.user.isStaff || this.user.isAdmin)) {
            console.log("BAM! Post deleted!")
            /*
            this._cmsBackendService.deletePost(this.post.urlString)
                .subscribe(
                    status => {
                        if (status.ok) {
                            this.destroyed = true;
                        } else {
                            console.error("Error while deleting post:", status)
                        }
                    },
                    error => console
                                .error("Could not delete the post!"));
            */
        } else if(shouldDelete) {
            console.error("User not authorized to delete posts");
        }
    }

    ngOnInit() {
        this.info = this._appData.info;
        this._appData.infoChange.subscribe(info => this.info = info);
        this.user = this._appData.user;
        this._appData.userChange.subscribe(user => this.user = user);
    }
}