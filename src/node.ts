// @url: https://developer.trustwallet.com/developer/wallet-core/faq#how-to-create-hdwallet-from-private-key

import { initWasm, TW, KeyStore } from "@trustwallet/wallet-core";

/**
 * Main function to create an HDWallet, retrieve its public key and address,
 * store it in a keystore, and then delete it.
 */
async function main() {
  const start = Date.now();
  console.log("Initializing Wasm...");
  
  // Initialize Trust Wallet Core WebAssembly
  const core = await initWasm();
  const { CoinType, HexCoding, HDWallet, AnyAddress, StoredKeyEncryption } = core;
  console.log(`Done in ${Date.now() - start} ms`);

  // Create a new HDWallet with 256-bit entropy
  const wallet = HDWallet.create(256, "");
  const mnemonic = wallet.mnemonic();

  // Derive Ethereum private and public keys
  const key = wallet.getKeyForCoin(CoinType.ethereum);
  const pubKey = key.getPublicKeySecp256k1(false);
  
  // Generate Ethereum address from public key
  const address = AnyAddress.createWithPublicKey(pubKey, CoinType.ethereum);

  // Setup keystore with file system storage
  const storage = new KeyStore.FileSystemStorage("/tmp");
  const keystore = new KeyStore.Default(core, storage);

  // Store wallet using AES-128 encryption
  const storedWallet = await keystore.import(mnemonic, "Coolw", "password", [
    CoinType.ethereum,
  ], StoredKeyEncryption.aes128Ctr);

  // Log wallet details
  console.log(`Create wallet: ${mnemonic}`);
  console.log(`Get Ethereum public key: ${HexCoding.encode(pubKey.data())}`);
  console.log(`Get Ethereum address: ${address.description()}`);
  console.log(`CoinType.ethereum.value = ${CoinType.ethereum.value}`);
  console.log("Keystore JSON: \n", JSON.stringify(storedWallet, null, 2));

  // Cleanup: delete wallet from keystore
  await keystore.delete(storedWallet.id, "password");

  // Free memory allocated for wallet and keys
  wallet.delete();
  key.delete();
  pubKey.delete();
  address.delete();
}

// Execute main function
main();
