const crowdfundingABI = [
  {
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "campaignId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "pricePerShare",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "sharesAvailable",
            "type": "uint256"
          }
        ],
        "name": "CampaignCreated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "campaignId",
            "type": "uint256"
          }
        ],
        "name": "CampaignCanceled",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "campaignId",
            "type": "uint256"
          }
        ],
        "name": "CampaignFulfilled",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "campaignId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "investor",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "sharesBought",
            "type": "uint256"
          }
        ],
        "name": "PledgeMade",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "campaignId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "investor",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "RefundIssued",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_title",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_pricePerShare",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_sharesAvailable",
            "type": "uint256"
          }
        ],
        "name": "createCampaign",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_campaignId",
            "type": "uint256"
          }
        ],
        "name": "cancelCampaign",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_campaignId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_shares",
            "type": "uint256"
          }
        ],
        "name": "pledge",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_campaignId",
            "type": "uint256"
          }
        ],
        "name": "refund",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_campaignId",
            "type": "uint256"
          }
        ],
        "name": "fulfillCampaign",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdrawFees",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_newOwner",
            "type": "address"
          }
        ],
        "name": "changeOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  }
];

export default crowdfundingABI;
