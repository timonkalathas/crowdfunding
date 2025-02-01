import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import crowdfundingABI from "./abis/Crowdfunding.json";

const contractAddress = "0x56a7B09aDa51db0a3D4ACF32583A68D3f5a66306";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [title, setTitle] = useState("");
  const [pricePerShare, setPricePerShare] = useState("");
  const [sharesAvailable, setSharesAvailable] = useState("");

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

        const crowdfundingContract = new ethers.Contract(
          contractAddress,
          crowdfundingABI.abi,
          signer
        );
        setContract(crowdfundingContract);

        fetchCampaigns(crowdfundingContract);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const fetchCampaigns = async (contract) => {
    try {
      const totalCampaigns = await contract.totalCampaigns();
      let campaignsArray = [];
      for (let i = 0; i < totalCampaigns; i++) {
        const campaign = await contract.campaigns(i);
        campaignsArray.push({ id: i, ...campaign });
      }
      setCampaigns(campaignsArray);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const createCampaign = async () => {
    if (contract) {
      try {
        const tx = await contract.createCampaign(
          title,
          ethers.utils.parseEther(pricePerShare),
          sharesAvailable,
          { value: ethers.utils.parseEther("0.01") }
        );
        await tx.wait();
        alert("Campaign created successfully!");
        fetchCampaigns(contract);
      } catch (error) {
        console.error("Error creating campaign:", error);
      }
    }
  };

  const pledge = async (campaignId, shares) => {
    if (contract) {
      try {
        const pricePerShare = await contract.pricePerShare(campaignId);
        const totalCost = ethers.utils.parseEther(pricePerShare.toString()).mul(shares);
        const tx = await contract.pledge(campaignId, shares, { value: totalCost });
        await tx.wait();
        alert("Pledge successful!");
        fetchCampaigns(contract);
      } catch (error) {
        console.error("Error pledging:", error);
      }
    }
  };

  const withdrawFunds = async (campaignId) => {
    if (contract) {
      try {
        const tx = await contract.fulfillCampaign(campaignId);
        await tx.wait();
        alert("Funds withdrawn successfully!");
        fetchCampaigns(contract);
      } catch (error) {
        console.error("Error withdrawing funds:", error);
      }
    }
  };

  return (
    <div>
      <h1>Blockchain Crowdfunding</h1>
      <p>Connected Account: {account ? account : "Not connected"}</p>
      {!account && <button onClick={connectWallet}>Connect Wallet</button>}

      {account && (
        <div>
          <h2>Create a Campaign</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price per Share (ETH)"
            value={pricePerShare}
            onChange={(e) => setPricePerShare(e.target.value)}
          />
          <input
            type="number"
            placeholder="Shares Available"
            value={sharesAvailable}
            onChange={(e) => setSharesAvailable(e.target.value)}
          />
          <button onClick={createCampaign}>Create Campaign</button>

          <h2>Active Campaigns</h2>
          {campaigns.length > 0 ? (
            <ul>
              {campaigns.map((campaign, index) => (
                <li key={index}>
                  <strong>{campaign.title}</strong> - {ethers.utils.formatEther(campaign.pricePerShare)} ETH per share
                  <br /> Available Shares: {campaign.sharesAvailable.toString()}
                  <br />
                  <button onClick={() => pledge(campaign.id, 1)}>Invest 1 Share</button>
                  <button onClick={() => withdrawFunds(campaign.id)}>Withdraw Funds</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No active campaigns</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
