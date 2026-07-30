import React, { useState } from "react";
import "./App.css";
import WalletConnect from "./components/WalletConnect";
import ContractInteraction from "./components/ContractInteraction";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || "";

function App() {
  const [account, setAccount] = useState("");
  const [networkId, setNetworkId] = useState(null);

  const handleAccountChange = (newAccount) => {
    setAccount(newAccount);
  };

  const handleNetworkChange = (newNetworkId) => {
    setNetworkId(newNetworkId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web3 React MetaMask Demo</h1>
        <p>Interact with SimpleStorage Smart Contract</p>
      </header>

      <main className="App-main">
        <section className="wallet-section">
          <WalletConnect
            onAccountChange={handleAccountChange}
            onNetworkChange={handleNetworkChange}
          />
        </section>

        {account && (
          <section className="contract-section">
            <ContractInteraction
              contractAddress={CONTRACT_ADDRESS}
              account={account}
            />
          </section>
        )}

        {!account && (
          <section className="info-section">
            <p>Please connect your MetaMask wallet to interact with the contract.</p>
          </section>
        )}
      </main>

      <footer className="App-footer">
        <p>
          Made with{" "}
          <a
            href="https://github.com/Abhishek-Mallick/universal-box"
            target="_blank"
            rel="noopener noreferrer"
          >
            Universal-Box
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
