async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();
    console.log("NFT contract deployed to:", nft.address);
  
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const marketplace = await NFTMarketplace.deploy();
    console.log("NFT Marketplace contract deployed to:", marketplace.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  