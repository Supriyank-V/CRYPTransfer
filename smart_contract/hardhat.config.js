require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten:{
      url: `https://eth-ropsten.alchemyapi.io/v2/G03n2nkH1N5wq6m3kmnQrJcAmm_Yx8uV`,
      accounts: ['7ec3998e9f5d8c4e517bcae9ab9b14d86f60aba5a5e0036179748a76b5b6668e']
    }
  }
}