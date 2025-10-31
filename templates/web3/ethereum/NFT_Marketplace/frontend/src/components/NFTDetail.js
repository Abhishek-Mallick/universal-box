import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { getNFTContract, getMarketplaceContract } from "../utils/web3";

const NFTDetails = () => {
  const { tokenId } = useParams(); // Get tokenId from URL params
  const [nft, setNFT] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchNFTDetails = async () => {
      setLoading(true);

      try {
        const nftContract = await getNFTContract();
        const tokenUri = await nftContract.tokenURI(tokenId);
        const response = await fetch(tokenUri); // Fetch metadata from token URI
        const metadata = await response.json();
        const owner = await nftContract.ownerOf(tokenId);

        // Check if the connected wallet is the owner
        const signer = await nftContract.signer.getAddress();
        setIsOwner(signer.toLowerCase() === owner.toLowerCase());

        setNFT({
          ...metadata,
          owner,
          tokenId,
        });
      } catch (error) {
        console.error("Error fetching NFT details: ", error);
      }
      setLoading(false);
    };

    fetchNFTDetails();
  }, [tokenId]);

  const handleBuyNFT = async () => {
    try {
      const marketplaceContract = await getMarketplaceContract();
      const price = await marketplaceContract.getPrice(tokenId);

      await marketplaceContract.buyNFT(tokenId, {
        value: ethers.utils.parseUnits(price.toString(), "ether"),
      });

      alert("NFT purchased successfully!");
    } catch (error) {
      console.error("Error purchasing NFT: ", error);
      alert("Failed to purchase NFT");
    }
  };

  if (loading) {
    return <h2>Loading NFT details...</h2>;
  }

  if (!nft) {
    return <h2>NFT not found</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>{nft.name}</h1>
      <img src={nft.image} alt={nft.name} style={styles.image} />
      <p>{nft.description}</p>
      <p>Owner: {nft.owner}</p>
      <p>Token ID: {nft.tokenId}</p>

      {isOwner ? (
        <button style={styles.ownerButton} disabled>
          You own this NFT
        </button>
      ) : (
        <button style={styles.buyButton} onClick={handleBuyNFT}>
          Buy NFT
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
  },
  image: {
    width: "300px",
    height: "300px",
    objectFit: "cover",
  },
  buyButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    cursor: "pointer",
    fontSize: "1rem",
    borderRadius: "5px",
    marginTop: "1rem",
  },
  ownerButton: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    cursor: "not-allowed",
    fontSize: "1rem",
    borderRadius: "5px",
    marginTop: "1rem",
  },
};

export default NFTDetails;
