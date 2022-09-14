export default {
  abi: [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "did",
          "type": "address"
        }
      ],
      "name": "DIDAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "did",
          "type": "address"
        }
      ],
      "name": "DIDEnabled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "did",
          "type": "address"
        }
      ],
      "name": "DIDRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "did",
          "type": "address"
        }
      ],
      "name": "DIDRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "did",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "entity",
          "type": "string"
        }
      ],
      "name": "addDID",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "addresses",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "did",
          "type": "address"
        }
      ],
      "name": "enableDID",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "did",
          "type": "address"
        }
      ],
      "name": "getDID",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "entity",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "status",
              "type": "bool"
            }
          ],
          "internalType": "struct DNSRegistry.DIDStruct",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDIDs",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "removeDID",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "did",
          "type": "address"
        }
      ],
      "name": "revokeDID",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  extensions: {
    "1.2.3.4.5.6.7.8": {
      name: 'Post-Quantum Public Key',
      encode: 'base64'
    }
  },
  trustedCAs: {
    idemia: "-----BEGIN CERTIFICATE-----\n" +
      "MIIDbjCCAlYCCQDnMNPbKtQZ/TANBgkqhkiG9w0BAQsFADB5MQswCQYDVQQGEwJN\n" +
      "WDEPMA0GA1UECAwGTWV4aWNvMQ8wDQYDVQQHDAZNZXhpY28xDDAKBgNVBAoMA0JJ\n" +
      "RDELMAkGA1UECwwCSVQxETAPBgNVBAMMCGlhZGIub3JnMRowGAYJKoZIhvcNAQkB\n" +
      "FgtjYUBpYWRiLm9yZzAeFw0yMDExMTkwNDI4MzhaFw0yMTExMTkwNDI4MzhaMHkx\n" +
      "CzAJBgNVBAYTAk1YMQ8wDQYDVQQIDAZNZXhpY28xDzANBgNVBAcMBk1leGljbzEM\n" +
      "MAoGA1UECgwDQklEMQswCQYDVQQLDAJJVDERMA8GA1UEAwwIaWFkYi5vcmcxGjAY\n" +
      "BgkqhkiG9w0BCQEWC2NhQGlhZGIub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A\n" +
      "MIIBCgKCAQEAvcQdQSJ1b8S49F5UXbAwCSDAVqFA4JGJ4yO51tCSZFXI6Q4O6c3W\n" +
      "Y9lpbUaQaMoDbkZh0s7IqrxUzndH5cVesXHpyEJxR+lpbc2S/XQTfpQOmfACSjRX\n" +
      "9VgPwwHMWzn3SCLx2ORbJ7gjFwFz1euljnTsfuRPv1ORTlCZbMpqu8DmM07jc5c1\n" +
      "DO4VgzMD3LFO6fYMjKG4G+TwR0t9yXLF+HudNZE0g1SHhzmBlR8g95O92pS89Dr9\n" +
      "a62QV/yZD9y9eRVTH1xRj4a9rMHiQX+YNzegWUEqTOy35TNZFNVQ1m5aE0PXW8bm\n" +
      "gjUms3swZSqEHfgSwHF5eK92tWF0cAJscQIDAQABMA0GCSqGSIb3DQEBCwUAA4IB\n" +
      "AQBPv7ZxO7XWhD9Wm7BrMaONmqrl4hGzMbDajtatuc4xRiWjkA7MCgcQRDRdQiYp\n" +
      "SZXLmU/2tpVIKlIR4isxMJGODSLS9NAb1QIm9GytTpv4YZPm8Li8hGgVUmUax/lm\n" +
      "eNqHuCYUi4a5s8aUfRX7Gq83wifH0Ymlbevs2eUjBjuwhmGDLng3vkxYo7baZdGT\n" +
      "P6R6/dTstFVGlt+bpreALBHxaDCwXKCUgpFknLI30/Hmu5wH9b4IrBj0HrUe+2ZM\n" +
      "7zP5mtXtW9EtExJqT9XajcmXhXxkcEG0cg6fovG8t8bLVWVkel4SvehJpz2tq6BQ\n" +
      "1qznIsJp1kMbq0q+30Sxu65V\n" +
      "-----END CERTIFICATE-----\n"
  }
}
