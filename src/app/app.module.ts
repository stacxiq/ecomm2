import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Camera } from '@ionic-native/camera';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from './app.firebase';
import { AuthProvider } from '../providers/auth/auth';
import { ProductManagementProvider } from '../providers/product-management/product-management';
import { ShoppingTabsPage } from '../pages/shopping-tabs/shopping-tabs';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { IonicStorageModule } from '@ionic/storage'
import { MyproductsPage } from '../pages/myproducts/myproducts'
import { BuyProductsPage } from '../pages/buy-products/buy-products';
import { ProductPage } from '../pages/product/product';
import { SelectedproductPage } from '../pages/selectedproduct/selectedproduct';
import { AuthPage } from '../pages/auth/auth';
import { BuyPage } from '../pages/buy/buy';
import { ProfilePage } from '../pages/profile/profile';
import { AdminconnectPage } from '../pages/adminconnect/adminconnect';
import { RequestProvider } from '../providers/request/request';
import { ChatPage } from '../pages/chat/chat';
import { ChatProvider } from '../providers/chat/chat';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CartPage } from '../pages/cart/cart';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShoppingTabsPage,
    UserProfilePage,
    MyproductsPage,
    BuyProductsPage,
    ProductPage,
    SelectedproductPage,
    AuthPage,
    BuyPage,
    ProfilePage,
    AdminconnectPage,
    ChatPage,
    CartPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShoppingTabsPage,
    UserProfilePage,
    MyproductsPage,
    BuyProductsPage,
    ProductPage,
    SelectedproductPage,
    AuthPage,
    BuyPage,
    ProfilePage,
    AdminconnectPage,
    ChatPage,
    CartPage
  ],
  providers: [
    StatusBar,
    Camera,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplashScreen,
    AuthProvider,
    AngularFireDatabase,
    ProductManagementProvider,
    RequestProvider,
    ChatProvider,
    ImghandlerProvider,

  ]
})
export class AppModule {}
