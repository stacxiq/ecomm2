
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import  $ from 'jquery';
import { AngularFireDatabase } from 'angularfire2/database';
import { CameraOptions, Camera } from '@ionic-native/camera';
import firebase from 'firebase/app';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../model/user';
import { ShoppingTabsPage } from '../shopping-tabs/shopping-tabs';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  address:string;
  name:string;
  phone:string;
  user:User;
  constructor(public navCtrl: NavController,
    public db : AngularFireDatabase,public toast : ToastController,
     private camera:Camera,public load : LoadingController, public af:AuthProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddfodPage');
    var navh = $(".header").innerHeight();
    console.log(navh);
  }
  imageurl = "";
  imagecheck= false;

  mySelectedPhoto;
  loading;
  currentPhoto ;
  imgSource;

  addfod(name:any,address:any,phone:any){
  this.af.addUser(name,address,phone,this.imageurl).then((userProfile)=>{
    this.user={
    name:name,
    address:address,
    email:firebase.auth().currentUser.email,
    image:this.imageurl,
    phone:phone
    }
    this.toast.create({
      message:"تم انشاء حسابك بنجاح ",
      duration:3000,
      cssClass:"setdire"
    }).present();
    this.navCtrl.popToRoot();
  }).then(()=>{
    this.navCtrl.setRoot(ShoppingTabsPage);
  });
  }
  takePhoto(){
    const options: CameraOptions = {
      targetHeight:720 ,
      targetWidth:720,
      quality:100,
      destinationType : this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) =>{
      this.loading = this.load.create({
        content: "جاري اضافة الصورة ",
        cssClass:"setdire"
         });
  this.loading.present();
    this.mySelectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,'+imageData);
        this.upload();

            },(err)=>{
        alert(JSON.stringify(err));
            });


    }



    dataURLtoBlob(myURL){
        let binary = atob(myURL.split(',')[1]);
    let array = [];
    for (let i = 0 ; i < binary.length;i++){
        array.push(binary.charCodeAt(i));
    }
        return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
    }


    upload(){


    var char = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v"];
    var rand1 = Math.floor(Math.random() * char.length);
    var rand2 = Math.floor(Math.random() * char.length);
    var rand3 = Math.floor(Math.random() * char.length);
    var rand4 = Math.floor(Math.random() * char.length);
    var rand = char[rand1] + char[rand2] + char[rand3] + char[rand4];

    if(this.mySelectedPhoto){
        var uploadTask = firebase.storage().ref().child('images/'+rand+".jpg");
        var put = uploadTask.put(this.mySelectedPhoto);
        put.then( ()=> {
          this.loading.dismiss();

          uploadTask.getDownloadURL().then(url =>{

            this.imagecheck = true;
            this.imageurl = url;

          });

        });

        put.catch(err =>{
          this.loading.dismiss();

          alert(JSON.stringify(err));
        })


    }
    }


}
