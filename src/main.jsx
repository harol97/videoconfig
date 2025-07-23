import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from '@/store';
// 
import React from "react";
import ReactDOM from "react-dom/client";
import Context from "@/context/Context";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ToastContainer } from 'react-toastify';
// 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB);
// 
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Elements stripe={stripePromise}>
                <Context>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Context>
            </Elements>
            <ToastContainer />
        </PersistGate>
    </Provider>
);