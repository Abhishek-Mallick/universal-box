const { expect } = require("chai");

describe("NFT Marketplace", function () {
  let NFT, nft, Marketplace, marketplace, owner, buyer;

  beforeEach(async function () {
    [owner, buyer] = await ethers.getSigners();

    NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();

    Marketplace = await ethers.getContractFactory("NFTMarketplace");
    marketplace = await Marketplace.deploy();
  });

  it("Should mint and list an NFT", async function () {
    await nft.mintNFT(owner.address, "uri1");
    await nft.approve(marketplace.address, 0);
    await marketplace.listItem(nft.address, 0, ethers.utils.parseEther("1"));

    const listing = await marketplace.listings(nft.address, 0);
    expect(listing.price).to.equal(ethers.utils.parseEther("1"));
    expect(listing.seller).to.equal(owner.address);
  });

  it("Should allow someone to buy an NFT", async function () {
    await nft.mintNFT(owner.address, "uri1");
    await nft.approve(marketplace.address, 0);
    await marketplace.listItem(nft.address, 0, ethers.utils.parseEther("1"));

    await marketplace.connect(buyer).buyItem(nft.address, 0, { value: ethers.utils.parseEther("1") });
    expect(await nft.ownerOf(0)).to.equal(buyer.address);
  });
});
