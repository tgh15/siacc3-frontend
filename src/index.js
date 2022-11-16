import React              from 'react';
import { Suspense, lazy } from 'react'
import ReactDOM           from 'react-dom';
import reportWebVitals    from './reportWebVitals';
import { Provider }       from 'react-redux';
import { store }          from './redux/storeConfig/store';
import axios              from 'axios';

import moment             from 'moment';   
import 'moment/locale/id';

import './index.css';

// ** Toast & ThemeColors Context
import { ToastContainer } from 'react-toastify'
import { ThemeContext } from './components/utility/context/ThemeColors'

// ** Spinner (Splash Screen)
import Spinner from './components/widgets/spinner/Fallback-spinner'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Ripple Button
import '@src/components/widgets/ripple-button'

// ** Core styles
import './assets/feather/iconfont.css';
import './components/scss/core.scss';
import './assets/scss/style.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const LazyApp = lazy(() => import('./App'));

axios.defaults.withCredentials = true;
moment.locale('id');

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <ThemeContext>
        <LazyApp />
        <ToastContainer newestOnTop />
      </ThemeContext>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
