// SaveCardForm.jsx
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { SEND } from '@/store';
import { useDispatch, useSelector } from "react-redux";
// 
const SaveCardForm = ({activeTab}) => {
  const { userClientSecret, cardLoading, cardSaved } = useSelector((state) => state.models);
  // 
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleSaveCard = async (e) => {
    e.preventDefault();
    try {
      if (!userClientSecret) return;
      // 
      dispatch.models.SET({
        cardLoading: true
      })
      // 
      const result = await stripe.confirmCardSetup(userClientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      const paymentMethodId = result.setupIntent.payment_method;
      if (paymentMethodId) {
        SEND('stripe/card', {
          paymentMethodId
        })
      }
    } catch (error) {
      console.log(error)
    }
  };
  // 
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };
  // 
  useEffect(()=>{
    if(!cardSaved) return;
    const card = elements.getElement(CardElement);
    card.clear();
  },[cardSaved])
  // 
  if (!stripe || !elements) return <></>;
  // 
  return (
    <form className={`border rounded bg-light ${activeTab == 2 ? "is-active" : ""}`}>
      <div className="mb-3" style={{maxWidth:500}}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      <button
        className="button -sm -purple-1 text-white mt-4"
        onClick={handleSaveCard}
        disabled={cardLoading}
      >
        Save Card
      </button>
    </form>
  );
};

export default SaveCardForm;
