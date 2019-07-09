import { Component } from '@angular/core';
import {  NavController, App } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { BuyProductsPage } from '../buy-products/buy-products';
import { AuthPage } from '../auth/auth';


@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {

  constructor(public navCtrl: NavController,
     private app:App,
     private _AuthProvider:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyPage');
  }
  buy(name:string){
    if(this._AuthProvider.isLoggedIn()){
      console.log(this._AuthProvider.isLoggedIn());
      console.log(name);
      this.app.getRootNav().push(BuyProductsPage,name);
    }  else{
      this.app.getRootNav().setRoot(AuthPage);
      this.navCtrl.goToRoot;
      console.log(this._AuthProvider.isLoggedIn());
    }

  }
}
