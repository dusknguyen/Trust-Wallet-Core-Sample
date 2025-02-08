# Trust Wallet Core Sample with Vite.js

This project demonstrates the integration of Trust Wallet Core with Vite.js to create and manage cryptocurrency wallets, as well as sign transactions.

## Getting Started

These instructions will guide you through setting up and running the project on your local machine for development and testing purposes.

## Overview of Test Files

This repository contains various test files under the `wasm/tests` directory to ensure the reliability and correctness of Trust Wallet Core's WebAssembly (Wasm) integration. Below is a detailed description of each file:
#### TypeScript tests: 
https://github.com/trustwallet/wallet-core/tree/master/wasm/tests
### Blockchain-Specific Tests
1. **Aptos.test.ts**: Tests functionalities related to the Aptos blockchain.
2. **Bitcoin.test.ts**: Validates Bitcoin-specific features, including transaction creation and address generation.
3. **Cardano.test.ts**: Tests features of the Cardano blockchain.
4. **Ethereum.test.ts**: Ensures Ethereum functionality, such as signing transactions and generating addresses, works as expected.
5. **Greenfield.test.ts**: Tests functionalities related to the Greenfield decentralized storage system.
6. **Hedera.test.ts**: Verifies operations for Hedera Hashgraph.
7. **InternetComputer.test.ts**: Tests features of the Internet Computer blockchain.
8. **Sui.test.ts**: Checks the implementation of Sui blockchain functionalities.
9. **TheOpenNetwork.test.ts**: Tests features of The Open Network (TON) blockchain.
10. **Zcash.test.ts**: Verifies Zcash blockchain features, especially privacy-related functionalities.

### Core Functional Tests
1. **AES.test.ts**: Tests encryption and decryption functionalities using AES.
2. **AnyAddress.test.ts**: Validates address generation for multiple blockchains from public keys.
3. **Base32.test.ts**: Tests Base32 encoding and decoding.
4. **Base64.test.ts**: Tests Base64 encoding and decoding.
5. **Bech32.test.ts**: Validates Bech32 encoding and decoding, commonly used in Bitcoin SegWit addresses.
6. **BitcoinSigHashType.test.ts**: Tests supported `SIGHASH` types in the Bitcoin protocol.
7. **CoinType.test.ts**: Tests definitions and functionalities of various cryptocurrency coin types.
8. **HDVersion.test.ts**: Verifies hierarchical deterministic (HD) wallet versioning.
9. **HDWallet.test.ts**: Tests core HDWallet functionalities, including mnemonic generation and key derivation.
10. **HRP.test.ts**: Tests Human Readable Part (HRP) values used in Bech32 addresses.
11. **Hash.test.ts**: Verifies hash functions such as SHA256, Keccak, and others.
12. **HexCoding.test.ts**: Validates encoding and decoding of hexadecimal data.
13. **KeyStore+extension.test.ts**: Tests extended functionalities of the KeyStore module.
14. **KeyStore+fs.test.ts**: Tests the integration of KeyStore with the file system.
15. **Mnemonic.test.ts**: Validates the creation and verification of mnemonic phrases for wallet recovery.
16. **PBKDF2.test.ts**: Verifies the PBKDF2 key derivation algorithm used in encryption.
17. **StoredKey.test.ts**: Tests storing and retrieving private keys securely.
18. **initWasm.test.ts**: Verifies the initialization of the WebAssembly (Wasm) module.
19. **mock.ts**: Provides mock objects and data for use in test cases.
20. **setup.test.ts**: Validates the initial setup and configuration of the testing environment.


## Additional Resources

For more details about Trust Wallet Core, visit the [official documentation](https://developer.trustwallet.com/developer/wallet-core/faq).
