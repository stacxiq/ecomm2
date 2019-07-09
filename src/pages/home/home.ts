import { Component, OnInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { ProductPage } from '../product/product';
import { AuthProvider } from '../../providers/auth/auth';
import { AuthPage } from '../auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from "@ionic/storage";
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
 items:any = [];
 i =0;
  constructor(public navCtrl: NavController,private db : AngularFireDatabase,private app:App, private _AuthProvider:AuthProvider , private storage:Storage ,) {

  }

  ngOnInit(): void {
    this.storage.get("id").then(userid => {
      this.db
        .list(`cart/${userid}`)
        .valueChanges()
        .subscribe(data => {
          console.log(data);
          this.items = data;
          this.i =  data.length;
        });
      });
      console.log(this.items);
  }
  buy(item:string){
    if(this._AuthProvider.isLoggedIn()){
      this.app.getRootNav().push(ProductPage,item);
    }  else{
      this.app.getRootNav().push(AuthPage);
      this.navCtrl.goToRoot;
    }

  }
  gotocart(){
    console.log(this.items);
    this.app.getRootNav().push(CartPage,{'items':this.items});
  }

}
