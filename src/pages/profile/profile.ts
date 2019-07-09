import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {  LoadingController } from 'ionic-angular';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
user ={
  'email':'',
  'image':'',
  'name':'',
  'phone':'',
  'address':''
}
loading;
list;
  constructor(private storage:Storage,
      private db:AngularFireDatabase , private af:AngularFireAuth
      , public load : LoadingController
      ) {
        this.list = db.list("fods").snapshotChanges();
  }

  ionViewDidLoad() {
    this.storage.get('id').then((userid)=>{
      this.db.list(`users/${userid}`).valueChanges().subscribe((data)=>{
        if(data[0]){
        this.user.address = data[0].toString();
        this.user.email =data[1].toString();
        this.user.name = data[3].toString();
        this.user.image = data[2].toString();
        this.user.phone = data[4].toString();
        }
      },(err)=>{
      });

    })

  }
  logout(){
  this.af.auth.signOut().then(()=>{
    this.storage.set('id',null);
    this.storage.set('isloggedin',false);
    this.loading = this.load.create({
      content: "جاري تسجيل خروج ",
      cssClass:"dirion"
       });
      this.loading.present();

  }).then(() =>{
    window.location.reload();
    this.loading.dismiss();
  });
  }


}
