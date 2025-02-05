import { useState, useEffect } from 'react';
import { initWasm, WalletCore as WalletCoreType } from '@trustwallet/wallet-core';
import './App.css';

function App() {
  // State variables for wallet information
  const [walletCore, setWalletCore] = useState<WalletCoreType | null>(null);
  const [mnemonic, setMnemonic] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');
  const [signedTx, setSignedTx] = useState('');

  // Initialize WalletCore when component mounts
  useEffect(() => {
    const initWalletCore = async () => {
      const core = await initWasm();
      setWalletCore(core);  // Initialize WalletCore instance
    };
    initWalletCore();
  }, []);

  // Function to generate wallet and related keys
  const generateWallet = () => {
    if (!walletCore) return;

    const wallet = walletCore.HDWallet.create(128, "");  // Create HD Wallet
    const coinType = walletCore.CoinType.solana;  // Solana coin type

    // Generate private key in hexadecimal format
    const privateKeyHex = Array.from(wallet.getKeyForCoin(coinType).data())
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');

    // Generate public key in hexadecimal format
    const publicKeyHex = Array.from(wallet.getKeyForCoin(coinType).getPublicKey(coinType).data())
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');

    const address = wallet.getAddressForCoin(coinType);  // Get wallet address

    // Set state with generated wallet information
    setMnemonic(wallet.mnemonic());
    setPrivateKey(privateKeyHex);
    setPublicKey(publicKeyHex);
    setAddress(address);

    // Log generated wallet details for debugging purposes
    console.log('Mnemonic:', wallet.mnemonic());
    console.log('Private Key:', privateKeyHex);
    console.log('Public Key:', publicKeyHex);
    console.log('Address:', address);
  };

  // Function to sign a transaction using private key
  const signTransaction = () => {
    if (!walletCore || !privateKey || !address) return;

    const coinType = walletCore.CoinType.solana;

    // Dummy data for unsigned transaction (replace with actual data)
    const encodedTx = "yourTransactionDataHere";  // Replace with actual transaction data
    const recentBlockhash = "yourRecentBlockhash"; // Replace with recent blockhash

    // Prepare private key for signing
    const privateKeys = walletCore.DataVector.create();
    privateKeys.add(walletCore.HDWallet.createWithMnemonic(mnemonic, '').getKeyForCoin(coinType).data());
    console.log('Mnemonic:', walletCore.HDWallet.createWithMnemonic(mnemonic, '').mnemonic());

    // Update blockhash and sign the transaction
    const signedTxBuffer = walletCore.SolanaTransaction.updateBlockhashAndSign(encodedTx, recentBlockhash, privateKeys);

    // Convert signed transaction to hexadecimal string
    const signedTxHex = Array.from(signedTxBuffer)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');

    setSignedTx(signedTxHex);  // Set state with signed transaction

    // Log signed transaction for debugging purposes
    console.log("Signed Transaction:", signedTxHex);
  };

  return (
    <div className="App">
      <h1>Trust Wallet Core Demo</h1>
      <button onClick={generateWallet}>Generate Wallet</button>
      <button onClick={signTransaction}>Sign Transaction</button>
      <p>Mnemonic: {mnemonic}</p>
      <p>Private Key: {privateKey}</p>
      <p>Public Key: {publicKey}</p>
      <p>Address: {address}</p>
      <p>Signed Transaction: {signedTx}</p>
    </div>
  );
}

export default App;
