// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
// };

require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/DHiOUxMp3f0VjNvYLYmm-51UGIuMMXJp",
      accounts: ['377720eb258a59e23452f4ea8bd8af78e7ac57174edb71d1fed22950b2cc660e'], // Replace with your actual private key
    },
  },
};