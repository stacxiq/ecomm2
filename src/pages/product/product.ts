import { Component } from '@angular/core';
import { NavParams, App } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { SelectedproductPage } from '../selectedproduct/selectedproduct';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  list : Observable<any>;
  constructor(public navParams: NavParams,
    public db : AngularFireDatabase,
    private app:App
    ){}

  ionViewDidLoad() {
    this.list = this.db.list(`products/${this.navParams.data}`).snapshotChanges();

  }
  buy(item:any){
    this.app.getRootNav().push(SelectedproductPage,item);
  }

}
