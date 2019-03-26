import { Injectable, EventEmitter } from "@angular/core";
const CLIENT_ID = "17144613635-h3pafkd55u55dubvv4jf8c40ots5c75n.apps.googleusercontent.com";
const API_KEY = "AIzaSyALmRY2nCuCXzDnwWOwDi-sov6KdLvkg_U";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';

@Injectable()
export class DriveSession {
    googleAuth: gapi.auth2.GoogleAuth;

    constructor(
        //private appRepository: AppRepository

    ) {
    }

    initClient() {
        return new Promise((resolve,reject)=>{
            gapi.load('client:auth2', () => {
                return gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                }).then(() => {                   
                    this.googleAuth = gapi.auth2.getAuthInstance();
                    resolve();
                });
            });
        });
        
    }
    get isSignedIn(): boolean {
        return this.googleAuth.isSignedIn.get();
    }

    signIn() {
        return this.googleAuth.signIn({
            prompt: 'consent'
        }).then((googleUser: gapi.auth2.GoogleUser) => {
            //this.appRepository.User.add(googleUser.getBasicProfile());
        });
    }

    signOut(): void {
        this.googleAuth.signOut();
    }

    getFiles() {
        return gapi.client.drive.files.list({
            pageSize: 100,
            fields: "nextPageToken, files(id)",
            q: `trashed = false`
        }).then((res) => {
            return res.result.files;
        });
    }

    getFile(fileId: string){
        return gapi.client.drive.files.get({
            fileId: fileId,
            alt: 'media'
        }).then((res) => {
            return res.body;
        });
    }
}
