import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import * as Sentry from 'sentry-expo';




export default function App(props) {
    Sentry.init({
        dsn: 'https://a9611e99e2c04aa28565c81e25c9ef63@o410270.ingest.sentry.io/5284251'
    });
    console.log=()=>{}
    //Sentry.captureMessage("Hello Sentry!");
    return (
      <AppNavigator />
    );
}
