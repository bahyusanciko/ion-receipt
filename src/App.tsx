import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Receipt from './pages/Receipt';
import Report from './pages/Report';
import { Store } from "./data/state/Store";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import { Provider } from 'react-redux';

setupIonicReact();

const listRoute = [
  {
    path : '/receipt',
    component : Receipt
  },
  {
    path : '/report',
    component : Report
  },
]


const App: React.FC = () => {
  return (      
    <Provider store={Store}>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Switch>
                {
                  listRoute.map((val,key )=> (
                    <Route key={key} path={val.path} component={val.component} exact />
                  ))
                }
                <Redirect from="/" to="/receipt" exact />
              </Switch>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </Provider>

  );
};

export default App;
