import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
   items:any = [];
   total : number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage, private db:AngularFireDatabase) {
  }

  ionViewDidLoad() {
    this.items = this.navParams.get('items');
    this.items = this.items;
    console.log(this.items);
    if(this.items != null || this.items.length > 1){
      this.items.forEach(element => {
        console.log( element.count * element.price)
        this.total = this.total + ( element.count * element.price);
        console.log('total : ' + this.total);
      });
    }


  }

  clear(){
    this.storage.get("id").then(userid => {
      this.db.list(`cart/${userid}`).remove().then(()=>{
        this.navCtrl.pop();
      })
    });
  }

}
