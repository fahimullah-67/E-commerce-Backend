
import React, { createContext, useState } from 'react';

const INITIAL_STATE = {
    shippingAddress: null,
    paymentMethod: null,
};

export const CheckoutContext = createContext(INITIAL_STATE);

export const CheckoutContextProvider = ({ children }) => {
    const [checkoutData, setCheckoutData] = useState(INITIAL_STATE);

    const updateCheckoutData = (data) => {
        setCheckoutData(prev => ({ ...prev, ...data }));
    };

    const clearCheckoutData = () => {
        setCheckoutData(INITIAL_STATE);
    };

    return (
        <CheckoutContext.Provider 
            value={{
                checkoutData,
                updateCheckoutData,
                clearCheckoutData,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};