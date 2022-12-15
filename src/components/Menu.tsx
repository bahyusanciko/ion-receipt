import {
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonText,
  IonToolbar,
} from '@ionic/react';

import { Link, useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, heartOutline, paperPlaneOutline, paperPlaneSharp } from 'ionicons/icons';
import './Menu.scss';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Kuitansi',
    url: '/receipt',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Report',
    url: '/report',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay" className="ion-no-padding">
      <IonContent className="ion-no-padding">
        <IonToolbar>
          <IonText slot='start' className='ion-text-center ion-padding-start'>
            <span><strong>Apps Kuitansi</strong></span>
          </IonText>
        </IonToolbar>
        <IonListHeader>Menu</IonListHeader>
        <IonList id="archive-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
      <IonFooter>
          <IonToolbar>
              <IonText slot='end' className='ion-padding-end'>
                Crafted with <IonIcon ios={heartOutline} md={heartOutline} /> by <Link target={"_blank"} rel={"noopener noreferrer"} to={{  pathname: "https://cariteknisi.com" }} >Cari Teknisi</Link> ©
              </IonText>
          </IonToolbar>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
