import React from "react";
import { Link } from "react-router-dom";
import { connectWallet } from "../utils/web3";

const Navbar = () => {
  const handleConnectWallet = async () => {
    const signer = await connectWallet();
    if (signer) {
      alert(`Connected Wallet: ${await signer.getAddress()}`);
    }
  };

  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>NFT Marketplace</h1>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/create" style={styles.link}>
            Create NFT
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/marketplace" style={styles.link}>
            Marketplace
          </Link>
        </li>
        <li style={styles.navItem}>
          <button onClick={handleConnectWallet} style={styles.walletButton}>
            Connect Wallet
          </button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#282c34",
    color: "white"
  },
  logo: {
    margin: "0",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
  },
  navItem: {
    textDecoration: "none",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.2rem",
  },
  walletButton: {
    backgroundColor: "#61dafb",
    color: "black",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "1rem",
    borderRadius: "5px",
  }
};

export default Navbar;
