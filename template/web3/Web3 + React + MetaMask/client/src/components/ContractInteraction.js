import React, { useState, useEffect } from "react";
import { getContract, getCurrentAccount } from "../utils/web3";
import SimpleStorageABI from "../contracts/SimpleStorage.json";

const ContractInteraction = ({ contractAddress, account }) => {
  const [storedValue, setStoredValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    if (contractAddress && account) {
      loadContractData();
    }
  }, [contractAddress, account]);

  const loadContractData = async () => {
    try {
      const contract = getContract(SimpleStorageABI.abi, contractAddress);
      const value = await contract.methods.get().call();
      const contractOwner = await contract.methods.getOwner().call();
      setStoredValue(value.toString());
      setOwner(contractOwner);
    } catch (err) {
      setError("Failed to load contract data: " + err.message);
    }
  };

  const handleSetValue = async (e) => {
    e.preventDefault();
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    if (!newValue || isNaN(newValue)) {
      setError("Please enter a valid number");
      return;
    }

    setLoading(true);
    setError("");
    setTxHash("");

    try {
      const contract = getContract(SimpleStorageABI.abi, contractAddress);
      const currentAccount = await getCurrentAccount();

      const tx = await contract.methods.set(newValue).send({
        from: currentAccount,
        gas: 100000,
      });

      setTxHash(tx.transactionHash);
      setNewValue("");
      await loadContractData();

      contract.events.ValueChanged({}, (error, event) => {
        if (error) {
          console.error("Error listening to event:", error);
        } else {
          console.log("Value changed:", event.returnValues);
        }
      });
    } catch (err) {
      if (err.code === 4001) {
        setError("Transaction rejected by user");
      } else {
        setError("Transaction failed: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!contractAddress) {
    return (
      <div className="contract-interaction">
        <p className="info-message">
          Please deploy the contract first. Check the README for instructions.
        </p>
      </div>
    );
  }

  return (
    <div className="contract-interaction">
      <h2>Contract Interaction</h2>
      
      <div className="contract-info">
        <p>
          <strong>Contract Address:</strong> {contractAddress}
        </p>
        <p>
          <strong>Owner:</strong> {owner.slice(0, 6)}...{owner.slice(-4)}
        </p>
        <p>
          <strong>Stored Value:</strong> {storedValue}
        </p>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError("")}>Dismiss</button>
        </div>
      )}

      {txHash && (
        <div className="success-message">
          <p>Transaction successful!</p>
          <p>
            <strong>Tx Hash:</strong> {txHash.slice(0, 10)}...{txHash.slice(-8)}
          </p>
        </div>
      )}

      <form onSubmit={handleSetValue} className="value-form">
        <div className="form-group">
          <label htmlFor="newValue">Set New Value:</label>
          <input
            type="number"
            id="newValue"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter a number"
            disabled={loading || !account}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || !account}
          className="submit-btn"
        >
          {loading ? "Processing..." : "Set Value"}
        </button>
      </form>

      <button onClick={loadContractData} className="refresh-btn">
        Refresh Data
      </button>
    </div>
  );
};

export default ContractInteraction;

