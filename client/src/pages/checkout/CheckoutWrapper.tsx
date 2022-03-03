import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutPage from './Checkout'
import { stripePK } from './stripeCreds'

const stripePromise = loadStripe(stripePK);
export default function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
        <CheckoutPage />
    </Elements>
  )
}
