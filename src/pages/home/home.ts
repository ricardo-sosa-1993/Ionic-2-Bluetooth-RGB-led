import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import {Led} from '../led/led';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public bluetoothDevices = [];
  private ledPage = Led;

  constructor(public navCtrl: NavController, private bluetoothSerial: BluetoothSerial, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    var that = this;
    var loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.bluetoothSerial.discoverUnpaired().then(function(success){
                                                      that.bluetoothDevices = success;
                                                      loading.dismiss();
                                                  });
  }

  itemSelected(device){
    let alert = this.alertCtrl.create({
                      title: 'Connect to device',
                      message: 'Do you want to connect to ' + device.name + '?',
                      buttons: [
                                {
                                  text: 'Cancel',
                                  role: 'cancel',
                                  handler: () => {
                                    //console.log('Cancel clicked');
                                  }
                                },
                                {
                                  text: 'Connect',
                                  handler: () => {
                                    this.bluetoothSerial.connect(device.address).subscribe(success => {
                                                                                                this.navCtrl.push(this.ledPage);
                                                                                            }, 
                                                                                            error => {
                                                                                                // Log errors if any
                                                                                                console.log(error);
                                                                                            });
                                  }
                                }
                              ]
                    });
    alert.present();
  }

}
