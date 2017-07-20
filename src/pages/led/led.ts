import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ColorPicker } from '../../components/color-picker';


/**
 * Generated class for the Led page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-led',
  templateUrl: 'led.html',
})


export class Led {

  color;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public bluetoothSerial: BluetoothSerial, public colorPicker: ColorPicker){


  }

  setColor(ev: any){ 
    var rgbColor = this.hexToRgb(ev);
    this.color = ev; 
    // Array of int or bytes
    console.log(rgbColor);
    console.log(this.formatNum(rgbColor.r )+ "," + this.formatNum(rgbColor.g) + "," + this.formatNum(rgbColor.b));
    this.bluetoothSerial.write( this.formatNum(rgbColor.r )+ "," + this.formatNum(rgbColor.g) + "," + this.formatNum(rgbColor.b)).then(function(success){
                                                                              console.log(success);
                                                                           },
                                                                           function(error){
                                                                              console.log(error);
                                                                            });
    }

  hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
  }

  formatNum(num){
    var returnVal;
    if(num < 100 && num > 9){
       returnVal = "0" + num;
    }else if(num < 10){
       returnVal = "00" + num;
     }else{
       returnVal = num;
     }

     return returnVal;
  }

}
