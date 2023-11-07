import React from 'react';
import BackBackWithDialog from './Account/BackWithDialog';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountProvider';

// Main Function
const App = () => {

    const clientID = "1031795808060-f9rrdgon02f713pbe5rhpibf6ldpc4gt.apps.googleusercontent.com";

    return <div>
        <GoogleOAuthProvider clientId={clientID} >
            <AccountProvider>
                <BackBackWithDialog />
            </AccountProvider>
        </GoogleOAuthProvider>

    </div>
}

export default App;