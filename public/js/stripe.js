/* eslint-disable */
import { showAlert } from './alert.js';
const stripe = new Stripe(
  'pk_test_51QiVAbSGktur023mO2yT5PYdGE3dA0k9txJro8CnQZ9Fx2ESRQbFXoAmmuGvYylMNpRMxF6OSQuE9fbBTnOQNVUf00Tr6DIIf6'
);

export async function bookTour(tourId) {
  try {
    const res = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(res);

    if (res.data.session) {
      await stripe.redirectToCheckout({
        sessionId: res.data.session.id
      });
    } else {
      showAlert('error', 'Checkout session not found');
    }
  } catch (err) {
    console.error(err); // Use console.error for error logging
    if (err.response) {
      showAlert('error', err.response.data.message);
    } else {
      showAlert('error', 'An error occurred');
    }
  }
}
