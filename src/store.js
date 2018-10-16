import {createStore, combineReducers, compose} from 'redux';
import keys from './config/keys';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

import notifyReducer from './reducers/notifyReducer';

const firebaseConfig = {
  apiKey: keys.apiKey,
  authDomain: keys.authDomain,
  databaseURL: keys.databaseURL,
  projectId: keys.projectId,
  storageBucket: keys.storageBucket,
  messagingSenderId: keys.messagingSenderId
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// intialize firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
});

// create initial state
const initialState = {};

// set composed value for reduxDevTool according to environment
const hostname = window && window.location && window.location.hostname;
let composed;
if(hostname === 'localhost') {
  console.log('its dev environment, if you cant run app please install chrome "Redux DevTools" extension!');
  composed = compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
} else {
  composed = reactReduxFirebase(firebase);
}

//create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  composed
);

export default store;
