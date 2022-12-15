import { IonButton, IonIcon, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonToolbar, useIonLoading } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Receipt } from '../../models/Modal';
// import { useSelector,useDispatch } from "react-redux";
// import { ReceiptAction } from "../../data/state/ReceiptReducer";
import './Create.scss';

const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
}

const Create: React.FC<Receipt> = (props:any) =>{
  // const dispatch = useDispatch();
  // const receipt = useSelector((state:any) => state.receipt.value);
  const [presentLoading, dismissLoading] = useIonLoading();
  const [code, setCode] = useState<string>('');
  const [date, setDate] = useState<string>('');
  // const [name, setName] = useState<string>('');
  
  const massageAlert = async (status:string,body:string) => {
     alert({
      header: status,
      message: body,
      cssClass: `header-alert-${status.toLocaleLowerCase()}`,
      buttons: [{cssClass: 'alert-button-confirm', text: 'Ok', handler: (d:any) => console.log('ok pressed') }],
    })
  }

  const createReceipt = async (e:any) => {
    e.preventDefault()
    await presentLoading({message:'Harap Tunggu'})
    massageAlert('Berhasil','Hore')
    dismissLoading()
  }


  useConstructor(async () => {
      
  });
  return (
    <IonPage>
    <IonContent fullscreen>
      <IonHeader>
        <IonToolbar class="toolbar-create-receipt ion-no-padding">
          <IonButton color="light"slot="start" fill="clear" onClick={() => props.onDismissCreate()}>
            <IonIcon color="light" slot='start' src={arrowBackOutline}/>
          </IonButton>
          <IonItem className='ion-no-padding' >
              Buat Kuitansi
          </IonItem>
        </IonToolbar>
      </IonHeader>
        <IonCard >
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              <IonCol class="ion-align-self-center" size-md="6" size-lg="6" size-xs="6">
                <IonItem>
                  <IonLabel position="floating">Nomor</IonLabel>
                  <IonInput type="text" placeholder="Your Name" name="name" value={code} required onIonChange={(e:any) => setCode(e.detail.code!)}/>
                </IonItem>
              </IonCol>
              <IonCol class="ion-align-self-center" size-md="6" size-lg="6" size-xs="6">
                <IonItem>
                  <IonLabel position="floating">Tanggal</IonLabel>
                  <IonInput type="text" placeholder="Your UserName" name="email" value={date} required onIonChange={(e:any) => setDate(e.detail.date!)}/>
                </IonItem>
              </IonCol>
              <IonCol class="ion-align-self-center" size-md="12" size-lg="12" size-xs="12">
                <IonButton expand="block" onClick={createReceipt}>
                  Submit
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Create;
