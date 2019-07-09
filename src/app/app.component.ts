import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ShoppingTabsPage } from '../pages/shopping-tabs/shopping-tabs';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { AuthProvider } from '../providers/auth/auth';
import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ShoppingTabsPage;

  constructor(platform: Platform,
     statusBar: StatusBar,
      public storage:Storage,
      public af:AuthProvider,
      private splashScreen: SplashScreen
      ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.hide();
      console.log(af.isLoggedIn());
      this.storage.get('id').then((id)=>{
        if(id == null){
          firebase.auth().onAuthStateChanged(function(user) {
            if(user){
              console.log(user.uid);
              storage.set('id',user.uid);
              storage.set('isloggedin',true);
            } else{
              console.log('please sign in')
            }

          });
        } else{
          console.log(id);
          storage.set('isloggedin',true);

        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    });
  }
  hide(){
    this.splashScreen.hide();

  }
}

