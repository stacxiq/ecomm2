import { Component } from '@angular/core';
import {NavController, AlertController, App, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { request } from '../../model/request';
import { RequestProvider } from '../../providers/request/request';
import { ChatPage } from '../chat/chat';
import { ChatProvider } from '../../providers/chat/chat';

/**
 * Generated class for the AdminconnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-adminconnect',
  templateUrl: 'adminconnect.html',
})
export class AdminconnectPage {
  chat = false;
  filteredusers:any;
  newrequest = {} as request;
  constructor(public navCtrl: NavController,
     public auth: AuthProvider,
     public requestservice:RequestProvider,
     public app:App,
      public alertCtrl:AlertController,
      public chatS:ChatProvider,
      public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    this.auth.getAdmin().then((data)=>{
      this.filteredusers = data;
    });
    this.auth.ableToChat().then((data:any)=>{
      for ( var i in data){
        console.log(data[i].chat);
        if(data[i].chat == true){
          this.chat= true;
        } else{
         this.chat = false;
        }
      }
    });
  }
  sendreq(user){

  }
  chatme(filteredusers){
    console.log(this.chat);
     if(!this.chat){
             const actionSheet = this.actionSheetCtrl.create({
        title: 'ارسال طلب للمحادثة',
        buttons: [
          {
            text: 'ارسال الطلب',
            handler: () => {
              this.newrequest.sender = firebase.auth().currentUser.uid;
              this.newrequest.recipient = 'ZSeg05j2Mjh2lbL14YhzROc9FSJ2';
                let successalert = this.alertCtrl.create({
                  title: 'Request sent',
                  subTitle: 'Your request was sent to ' + filteredusers.name,
                  buttons: ['ok']
                });

                this.requestservice.sendrequest(this.newrequest).then((res: any) => {
                  if (res.success) {
                    successalert.present();
                  }
                }).catch((err) => {
                  alert(err);
                })
            }
          }
        ]
      });
      actionSheet.present();
     } else{
                   const actionSheet = this.actionSheetCtrl.create({
              title: 'مراسلة الادمن',
              buttons: [
                {
                  text: 'مراسلة',
                  handler: () => {
                    this.chatS.initializefriend(filteredusers);
                    this.app.getRootNav().push(ChatPage);
                  }
                }

              ]
            });
            actionSheet.present();
     }
    // console.log(this.auth.ableToChat());
    // if(this.auth.ableToChat() == null){

    // } else{
    //   this.auth.ableToChat().then((data:any)=>{
    //     for ( var i in data){
    //       console.log(data[i].chat);
    //       if(data[i].chat == true){

    //       } else{
    //         this.dosomething();
    //       }
    //     }
    //   });
    // }

  }
  dosomething(){
    console.log('hhhhhhhhhhhh');
  }
}
