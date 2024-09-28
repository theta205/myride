// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider } from '@clerk/clerk-react';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (typeof document !== 'undefined') {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <ClerkProvider publishableKey={clerkPubKey}>
      <App />
    </ClerkProvider>
  );

  reportWebVitals();
}
