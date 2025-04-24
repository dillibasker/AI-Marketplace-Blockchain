import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { WalletProvider } from './contexts/WalletContext';
import { MarketplaceProvider } from './contexts/MarketplaceContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <MarketplaceProvider>
          <App />
        </MarketplaceProvider>
      </WalletProvider>
    </BrowserRouter>
  </StrictMode>
);