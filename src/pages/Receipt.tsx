import { IonBadge, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSkeletonText, IonText, IonThumbnail,  IonToolbar, useIonModal } from '@ionic/react';
import { createOutline, searchOutline } from 'ionicons/icons';
import React, { useState } from 'react';
// import { useSelector } from "react-redux";
import Create from './../components/receipt/Create';
import './Receipt.scss';

const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
}

const Receipt: React.FC = () => {
  let loadList : any = [{}];
  // const receipt = useSelector((state:any) => state.receipt.value);

  const handleDismissCreate = (e:any) => {
    dismissCreate()
  };
  
  const [presentCreate, dismissCreate] = useIonModal(Create, {
      onDismissCreate: handleDismissCreate
  });

  for (var i = 0; i < 6; i++) {
    loadList.push({i});
  }
  
  useConstructor(async () => {
      
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='toolbar-receipt'>
          <div className="search" slot="start">
              <IonItem lines="none" className='item-receipt' >
                  <IonInput placeholder='Cari Kuitansi' className="input-receipt"
                      
                  ></IonInput>
                  <IonIcon src={searchOutline} slot="start"/>
                  <IonBadge color="medium" >10</IonBadge>
              </IonItem>
          </div>
          <IonButton fill="clear" slot="end" color="success" onClick={() =>presentCreate()}>
            <IonText color="light" >Buat Kuitansi</IonText>
            <IonIcon src={createOutline}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className='receipt-content'>
        <IonList>
          <IonListHeader>
              <IonSkeletonText animated={true} style={{ 'width': '80px' }}></IonSkeletonText>
          </IonListHeader>
          {loadList.map((value:any, key:any) => (
              <IonItem key={key}>
                  <IonThumbnail slot="start">
                  <IonSkeletonText animated={true}></IonSkeletonText>
                  </IonThumbnail>
                  <IonLabel>
                  <h3>
                      <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
                  </h3>
                  <p>
                      <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
                  </p>
                  <p>
                      <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
                  </p>
                  </IonLabel>
              </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Receipt;
