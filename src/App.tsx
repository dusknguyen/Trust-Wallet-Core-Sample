import { useState, useEffect } from 'react';
import { initWasm, WalletCore as WalletCoreType, KeyStore, TW } from '@trustwallet/wallet-core';
import './App.css';

function App() {
  const [walletCore, setWalletCore] = useState<WalletCoreType | null>(null);
  const [mnemonic, setMnemonic] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');
  const [signedTx, setSignedTx] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const initWalletCore = async () => {
      const core = await initWasm();
      setWalletCore(core);
    };
    initWalletCore();
  }, []);

  const generateWallet = async () => {
    if (!walletCore) return;

    try {
      const { CoinType, HDWallet, AnyAddress, HexCoding, StoredKeyEncryption } = walletCore;
      const wallet = HDWallet.create(256, "");
      const mnemonic = wallet.mnemonic();

      const key = wallet.getKeyForCoin(CoinType.ethereum);
      const pubKey = key.getPublicKeySecp256k1(false);
      const address = AnyAddress.createWithPublicKey(pubKey, CoinType.ethereum);

      const privateKeyHex = HexCoding.encode(key.data());
      const publicKeyHex = HexCoding.encode(pubKey.data());

      setMnemonic(mnemonic);
      setPrivateKey(privateKeyHex);
      setPublicKey(publicKeyHex);
      setAddress(address.description());

      // const storage = new KeyStore.FileSystemStorage("/tmp");
      // const keystore = new KeyStore.Default(walletCore, storage);
      // const storedWallet = await keystore.import(mnemonic, "Coolw", "password", [CoinType.ethereum], StoredKeyEncryption.aes128Ctr);

      // console.log("Keystore JSON:", JSON.stringify(storedWallet, null, 2));
      // await keystore.delete(storedWallet.id, "password");

      wallet.delete();
      key.delete();
      pubKey.delete();
      address.delete();

      setStatusMessage('Wallet generated successfully.');
    } catch (error) {
      console.error("Error generating wallet:", error);
      setStatusMessage('Error generating wallet.');
    }
  };

  const signTransaction = () => {
    if (!walletCore || !privateKey || !address) return;

    try {
      const { HexCoding, AnySigner, CoinType } = walletCore;
      const input = TW.Ethereum.Proto.SigningInput.create({
        toAddress: "0x3535353535353535353535353535353535353535",
        chainId: Buffer.from("01", "hex"),
        nonce: Buffer.from("09", "hex"),
        gasPrice: Buffer.from("04a817c800", "hex"),
        gasLimit: Buffer.from("5208", "hex"),
        transaction: TW.Ethereum.Proto.Transaction.create({
          transfer: TW.Ethereum.Proto.Transaction.Transfer.create({
            amount: Buffer.from("0de0b6b3a7640000", "hex"),
          }),
        }),
        privateKey: HexCoding.decode(privateKey),
      });

      const encoded = TW.Ethereum.Proto.SigningInput.encode(input).finish();
      HexCoding.encode(encoded);

      const outputData = AnySigner.sign(encoded, CoinType.ethereum);
      const output = TW.Ethereum.Proto.SigningOutput.decode(outputData);

      const signedTxHex = HexCoding.encode(output.encoded);

      setSignedTx(signedTxHex);
      setStatusMessage('Transaction signed successfully.');

      console.log("Signed Transaction:", signedTxHex);
    } catch (error) {
      console.error("Error signing transaction:", error);
      setStatusMessage('Error signing transaction.');
    }
  };

  const signMessage = () => {
    if (!walletCore || !privateKey || !address) return;

    try {
      const { CoinType, EthereumAbi, HexCoding, Hash, PrivateKey, Curve } = walletCore;

      const key = PrivateKey.createWithData(Hash.keccak256(Buffer.from("cow")));
      const message = {
        types: {
          EIP712Domain: [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            { name: "chainId", type: "uint256" },
            { name: "verifyingContract", type: "address" },
          ],
          Person: [
            { name: "name", type: "string" },
            { name: "wallet", type: "address" },
          ],
          Mail: [
            { name: "from", type: "Person" },
            { name: "to", type: "Person" },
            { name: "contents", type: "string" },
          ],
        },
        primaryType: "Mail",
        domain: {
          name: "Ether Mail",
          version: "1",
          chainId: "0x01",
          verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
        },
        message: {
          from: {
            name: "Cow",
            wallet: "CD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
          },
          to: {
            name: "Bob",
            wallet: "bBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
          },
          contents: `"Hello, Bob!${Date.now()}`,
        },
      };

      const hash = EthereumAbi.encodeTyped(JSON.stringify(message));
      const signature = key.sign(hash, Curve.secp256k1);

      HexCoding.encode(hash);
      const signedTxHex = HexCoding.encode(signature);

      key.delete();

      setSignedTx(signedTxHex);
      setStatusMessage('Message signed successfully.');

      console.log("Signed Message:", signedTxHex);
    } catch (error) {
      console.error("Error signing message:", error);
      setStatusMessage('Error signing message.');
    }
  };

  return (
    <div className="App">
      <h1>Trust Wallet Core Demo</h1>
      <button onClick={generateWallet}>Generate Wallet</button>
      <button onClick={signTransaction}>Sign Transaction</button>
      <button onClick={signMessage}>Sign Message</button>
      <p>Mnemonic: {mnemonic}</p>
      <p>Private Key: {privateKey}</p>
      <p>Public Key: {publicKey}</p>
      <p>Address: {address}</p>
      <p>Signed Transaction: {signedTx}</p>
      <p>Status: {statusMessage}</p>
    </div>
  );
}

export default App;
