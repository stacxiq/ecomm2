import { Component, ViewChild } from '@angular/core';
import {  NavController, Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MyproductsPage } from '../myproducts/myproducts';
import { BuyPage } from '../buy/buy';
import { ProfilePage } from '../profile/profile';
import {Storage} from '@ionic/storage'
import { AdminconnectPage } from '../adminconnect/adminconnect';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ShoppingTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shopping-tabs',
  templateUrl: 'shopping-tabs.html'
})
export class ShoppingTabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  m=false;
  allproductsRoot = HomePage;
  buyRoot = BuyPage
  myproductsRoot = MyproductsPage;
  myProfile = ProfilePage;
  admin = AdminconnectPage;

  constructor(public navCtrl: NavController, public af:Storage,private Auth:AngularFireAuth) {
    af.get('isloggedin').then((val)=>{
      console.log(val);
      if(val){
        this.m=true;
      }
    });
  }

  async ionViewDidLoad() {
  const user = await this.isLoggedIn()
  if (user) {
    this.m = true;
  } else {
    // do something else
    this.m =false;
 }
}
isLoggedIn() {
  return this.Auth.authState.pipe(first()).toPromise();
}
}
