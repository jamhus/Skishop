import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import Loading from '../../app/components/Loading';
import { useAppDispatch } from '../../app/store/configureStore';
import { setBasket } from '../basket/BasketSlice';
import CheckoutPage from './Checkout'
import { stripePK } from './stripeCreds'

const stripePromise = loadStripe(stripePK);
export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    agent.Payments.createPaymentIntent()
    .then(basket => dispatch(setBasket(basket)))
    .catch(error => console.log(error))
    .finally(()=>setLoading(false))
  },[dispatch])

  if (loading) return <Loading message='Loading checkout...'/>

  return (
    <Elements stripe={stripePromise}>
        <CheckoutPage />
    </Elements>
  )
}
