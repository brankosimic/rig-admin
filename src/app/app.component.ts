import { Component } from '@angular/core';
import { DriveSession } from 'src/infrastructure/drive.session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rig-admin';
  constructor(
    private driveSession: DriveSession
) {
  this.getFiles();
}
  async getFiles(){
    if(!this.driveSession.isSignedIn)
      await this.driveSession.signIn();

    var files = await this.driveSession.getFiles();
    var file = await this.driveSession.getFile(files[0].id);
    console.log(file);
  }
}
