import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { addNotification } from '../components/common/GlobalNotification';

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  balance: string | null;
  provider: any | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  connecting: false,
  address: null,
  balance: null,
  provider: null,
  connect: async () => {},
  disconnect: () => {},
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [provider, setProvider] = useState<any | null>(null);

  // Initialize provider
  useEffect(() => {
    const checkConnection = async () => {
      // Simulate connected state for demo purposes
      if (window.localStorage.getItem('wallet-connected') === 'true') {
        const mockedAddress = '0x1234567890123456789012345678901234567890';
        setAddress(mockedAddress);
        setBalance('1.234');
        setConnected(true);
        
        // Mock provider here...
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // setProvider(provider);
      }
    };

    checkConnection();
  }, []);

  // Connect wallet
  const connect = async () => {
    try {
      setConnecting(true);
      
      // For demo, we'll simulate a connection
      // In a real app, you'd use:
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // await provider.send("eth_requestAccounts", []);
      // const signer = provider.getSigner();
      // const address = await signer.getAddress();
      // const balanceWei = await provider.getBalance(address);
      // const balance = ethers.utils.formatEther(balanceWei);
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockedAddress = '0x1234567890123456789012345678901234567890';
      setAddress(mockedAddress);
      setBalance('1.234');
      setConnected(true);
      setProvider({} as any); // Mock provider
      
      window.localStorage.setItem('wallet-connected', 'true');
      
      addNotification('success', 'Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      addNotification('error', 'Failed to connect wallet. Please try again.');
    } finally {
      setConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    setConnected(false);
    setAddress(null);
    setBalance(null);
    setProvider(null);
    window.localStorage.removeItem('wallet-connected');
    addNotification('info', 'Wallet disconnected.');
  };

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        address,
        balance,
        provider,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};