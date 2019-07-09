import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import $ from "jquery";
import { AuthProvider } from '../../providers/auth/auth';
import { UserProfilePage } from '../user-profile/user-profile';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { ShoppingTabsPage } from '../shopping-tabs/shopping-tabs';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
name="";
emailreg="";
passreg="";
userId;
fireUser = firebase.database().ref(`users`);
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db : AngularFireDatabase,
    public auth : AuthProvider,
    public storage:Storage,
    public load : LoadingController) {
  }

  register(email,pass){

    var load = this.load.create({
    content:"جاري انشاء الحساب",
    cssClass:"loaddire"
    });

    if(this.emailreg.replace(/\s/g,"") != "" && this.passreg.replace(/\s/g,"") != ""){

    load.present();

  this.auth.register(this.emailreg,this.passreg).then( (user)=> {
    let userId=firebase.auth().currentUser.uid;
    if(userId != null){
      this.storage.set('id',userId);
      this.storage.set('isloggedin',true);
    } else{
    }
    this.navCtrl.setRoot(UserProfilePage);
    this.navCtrl.goToRoot;
    load.dismiss();

  },(e)=>{
    console.log(e);
    load.dismiss();
  }).catch( ()=> {

    load.dismiss();

  });


  }   else{
    console.log(email + ' ' + pass);
  }
  console.log(this.emailreg + ' ' + this.passreg);
  }

  showLogin(){
    $(".register").slideUp();
    $(".login").slideDown();
  }

   login(email,pass){
    var load = this.load.create({
      content:"جاري تسجيل الدخول",
      cssClass:"loaddire"
      });

  if(email.length > 0 && pass.length > 0){

    load.present();

   this.auth.login(email,pass).then( (user)=> {
console.log('uid -------------------'+user.uid);
       this.storage.set('id',user.uid);
      this.storage.set('isloggedin',true);
      this.storage.get('id').then((res)=>{
        console.log(res);
        this.userId = res;
      this.fireUser.child(user.uid).on('value',(snap)=>{
       if(snap.val()){
        load.dismiss();
        this.navCtrl.setRoot(ShoppingTabsPage);
        this.navCtrl.goToRoot;
       } else{
        load.dismiss();
        this.navCtrl.setRoot(UserProfilePage);
        this.navCtrl.goToRoot;
       }
      });
  }).catch( ()=> {

    load.dismiss();

  });

  })
}
}



  showRegister(){
    $(".login").slideUp();
    $(".register").slideDown();
  }

}


