require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
// require('hardhat-console');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    aurora: {
      url: `https://mainnet.aurora.dev`,
      accounts: [process.env.PRIVATE_KEY],
    },
    fantom: {
      url: `https://rpc.ftm.tools/`,
      accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: process.env.mumbaiRPC,
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: process.env.goerliRPC,
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      url: process.env.sepoliaRPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    compilers: [
      { version: "0.8.9" },
      { version: "0.7.6" },
      { version: "0.6.6" }
    ]
  },
};
