import React, { useState, useEffect } from "react";
import { getWeb3, getCurrentAccount, getBalance, isMetaMaskInstalled, switchNetwork } from "../utils/web3";

const WalletConnect = ({ onAccountChange, onNetworkChange }) => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [networkId, setNetworkId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isMetaMaskInstalled()) {
      checkConnection();
      setupEventListeners();
    }
  }, []);

  const setupEventListeners = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount("");
      setBalance("");
      onAccountChange("");
    } else {
      setAccount(accounts[0]);
      updateBalance(accounts[0]);
      onAccountChange(accounts[0]);
    }
  };

  const handleChainChanged = (chainId) => {
    const networkId = parseInt(chainId, 16);
    setNetworkId(networkId);
    onNetworkChange(networkId);
    window.location.reload();
  };

  const checkConnection = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        updateBalance(accounts[0]);
        onAccountChange(accounts[0]);
      }
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      setNetworkId(parseInt(chainId, 16));
      onNetworkChange(parseInt(chainId, 16));
    } catch (err) {
      console.error("Error checking connection:", err);
    }
  };

  const updateBalance = async (address) => {
    try {
      const bal = await getBalance(address);
      setBalance(parseFloat(bal).toFixed(4));
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    setError("");
    try {
      if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed. Please install it to continue.");
      }

      await getWeb3();
      const currentAccount = await getCurrentAccount();
      setAccount(currentAccount);
      await updateBalance(currentAccount);
      onAccountChange(currentAccount);

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const networkId = parseInt(chainId, 16);
      setNetworkId(networkId);
      onNetworkChange(networkId);
    } catch (err) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setBalance("");
    setNetworkId(null);
    onAccountChange("");
    onNetworkChange(null);
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchNetwork(1337);
    } catch (err) {
      setError(err.message || "Failed to switch network");
    }
  };

  if (!isMetaMaskInstalled()) {
    return (
      <div className="wallet-connect">
        <div className="error-message">
          <p>MetaMask is not installed.</p>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="install-link"
          >
            Install MetaMask
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-connect">
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError("")}>Dismiss</button>
        </div>
      )}
      
      {!account ? (
        <button onClick={connectWallet} disabled={loading} className="connect-btn">
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="wallet-info">
          <div className="account-info">
            <p>
              <strong>Account:</strong> {account.slice(0, 6)}...{account.slice(-4)}
            </p>
            <p>
              <strong>Balance:</strong> {balance} ETH
            </p>
            {networkId !== 1337 && networkId !== null && (
              <div className="network-warning">
                <p>Wrong network. Please switch to localhost (1337)</p>
                <button onClick={handleSwitchNetwork} className="switch-btn">
                  Switch Network
                </button>
              </div>
            )}
          </div>
          <button onClick={disconnectWallet} className="disconnect-btn">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;

