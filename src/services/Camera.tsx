import { useState, useEffect } from "react";
import { isPlatform } from '@ionic/react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Preferences } from '@capacitor/preferences'
import { Capacitor } from '@capacitor/core';

const PHOTO_STORAGE = 'photos';
export function usePhotoGallery() {

  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({key: PHOTO_STORAGE });
      const photosInStorage = (value ? JSON.parse(value) : []) as UserPhoto[];
      // If running on the web...
      if (!isPlatform('hybrid')) {
        for (let photo of photosInStorage) {
          const file = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data
          });
          // Web platform only: Load the photo as base64 data
          photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }
      setPhotos(photosInStorage);
    };
    loadSaved();
  }, []);

  const takePhoto = async (source: CameraSource) => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      allowEditing: false,
      quality: 100,
      source
    });
    if (photo) {
      const fileName = new Date().getTime() + '.jpeg';
      const savedFileImage = await savePicture(photo, fileName);
      const newPhotos = [savedFileImage, ...photos];
      setPhotos(newPhotos);
      Preferences.set({key: PHOTO_STORAGE,value: JSON.stringify(newPhotos)});
    }
  };

  const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    let base64Data: string;
    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!
      });
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(photo.webPath!);
    }
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (isPlatform('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        blobData : base64ToBlob(base64Data)
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
        blobData : base64ToBlob(base64Data)
      };
    }
  };

  const deletePhoto = async (photo: UserPhoto) => {
    // Remove this photo from the Photos reference data array
    const newPhotos = photos.filter(p => p.filepath !== photo.filepath);

    // Update photos array cache by overwriting the existing photo array
    Preferences.set({key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data
    });
    setPhotos(newPhotos);
  };

  return {
    deletePhoto,
    photos,
    takePhoto
  };
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  blobData:any;
}

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string')
      }
    };
    reader.readAsDataURL(blob);
  });
}

const base64ToBlob = (base64:any, contentType='image/jpeg', chunkLength=512) => {
    const byteCharsArray = Array.from(atob(base64.substr(base64.indexOf(',') + 1)));
    const chunksIterator = new Array(Math.ceil(byteCharsArray.length / chunkLength));
    const bytesArrays = [];

    for (let c = 0; c < chunksIterator.length; c++) {
        bytesArrays.push(new Uint8Array(byteCharsArray.slice(c * chunkLength, chunkLength * (c + 1)).map(s => s.charCodeAt(0))));
    }

    const blob = new Blob(bytesArrays, {type: contentType});
    
    return blob;
}
