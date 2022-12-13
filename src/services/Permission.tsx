import { Capacitor } from '@capacitor/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions';

const CheckPermissions =
{
    //Working
    requestCameraPermission() {
        if (Capacitor.isNativePlatform()) {
            AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.CAMERA).then(
                (result:any) => {
                    if (!result.hasPermission) {
                        AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.CAMERA);
                    }else{
                        CheckPermissions.requestCameraPermission()
                    }
                }
            )
        }
        else {
            console.log('Capacitor not detected, this button will do nothing :(')
        }
    },
    //Working
    requestFineLocation() {
        if (Capacitor.isNativePlatform()) {
            AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
                (result:any) => {
                    if (!result.hasPermission) {
                        AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION);
                    }else{
                        CheckPermissions.requestFineLocation()
                    }
                }
            )
        }
        else {
            console.log('Capacitor not detected, this button will do nothing :(')
        }
    }

}

export default CheckPermissions;
