// import React, { useState } from 'react';
// import Flutterwave from 'flutterwave-node-v3';
// import axios from 'axios';

// const API_PUBLIC_KEY = 'YOUR_API_PUBLIC_KEY';
// const API_SECRET_KEY = 'YOUR_API_SECRET_KEY';

// const flutterwave = new Flutterwave(API_PUBLIC_KEY, API_SECRET_KEY);

// const VirtualAccount = () => {
//   const [accountNumber, setAccountNumber] = useState('');
//   const [paymentReference, setPaymentReference] = useState('');

//   const generateVirtualAccount = async () => {
//     try {
//       const virtualAccountParams = {
//         email: 'customer@example.com',
//         type: 'nuban',
//         name: 'Customer Name',
//       };

//       const response = await flutterwave.VirtualAccount.create(virtualAccountParams);
//       setAccountNumber(response.data.account_number);
//     } catch (error) {
//       console.error('Error generating virtual account:', error);
//     }
//   };

//   const initiatePayment = async () => {
//     try {
//       const paymentParams = {
//         tx_ref: 'payment-12345',
//         amount: 1000,
//         currency: 'USD',
//         account_number: accountNumber,
//         redirect_url: 'http://your-website.com/payment/success',
//         customer: {
//           email: 'customer@example.com',
//           name: 'Customer Name',
//         },
//       };

//       const response = await flutterwave.PaymentPlan.create(paymentParams);
//       setPaymentReference(response.data.reference);
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={generateVirtualAccount}>Generate Virtual Account</button>
//       {accountNumber && (
//         <>
//           <p>Virtual Account Number: {accountNumber}</p>
//           <button onClick={initiatePayment}>Pay Now</button>
//           {paymentReference && (
//             <p>Payment Reference: {paymentReference}</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default VirtualAccount;
