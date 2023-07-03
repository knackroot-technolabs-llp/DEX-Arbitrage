# Dex Arbitrage Bot

This bot will move over certain decentralized exchanges and mark the price of each pair of tokens. If the bot finds any profitable trading pair between two decentralized exchanges, it will trade for it and make the profit, only if the profit is above threshold value, otherwise it will continue to search for another trading pair.


# Setup Instructions

## 1. Edit .env-example.txt file with your private key and rpc url.
#
## 2. Build using the following commands:

```shell
git clone https://github.com/jamesbachini/DEX-Arbitrage.git
cd DEX-Arbitrage
mv .env-example.txt .env
rm .env-example.txt 
npm install
```
#
## 3. Deploy the trading or arbitrage contract

```shell
npx hardhat run --network <your-network> scripts/deploy.js
```
#
## 4. Set the Configurations

These configurations should be in the json file under the config folder. This configuration file will contain the details of your trading contract, the dex’s you want to trade on, the tokens you want to trade on, and also the routes you want to follow while trading.

### Fields of the configuration file :-
#
#### 1. arbContract :- 
Deployed Contract address of Arb.sol solidity smart contract. This contract will be our trading contract or ARB contract.

Eg: 
```json
"arbContract": "0x64066c4DA5953B282508c6b620243b6Cc3cfC66C",
```
#
#### 2. minBasisPointsPerTrade :- 
The minimum amount of profit you want to make on each trade. (Remember to use less value to perform more trade and earn higher profits. Can be greate than or equal to zero or less than or equal to 10000).

Here, 
10000 means - 100% profit.
5000 means - 50% profit.
1000 means - 10% profit.

Keep the value accordingly.

Eg: 
```json
"minBasisPointsPerTrade": 0,
```
#
#### 3. routers :-
An array of decentralized exchanges router addresses on which you want to perform the trade. It takes an object with two values at each index of the array named “dex” - name of the dex and “address” - address of its router.

Eg:
```json
"routers": [
     { "dex": "uniswap", "address": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" },
     { "dex": "sushiswap", "address": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506" }
   ],
```
#
#### 4. baseAssets :- 
Token address which you want to use to start and end the trade with. These tokens generally are stable tokens like WETH, USDC, etc. It contains an array with “sym” (symbol) and “address” (address of the token).

Eg: 
```json
"baseAssets": [
     { "sym": "WETH","address": "0xa4f08fcC97b3f41F9163667021AcfD73De982514" }
   ],
```
#
#### 5. tokens :- 
Token addresses on which you want to trade. These tokens are the tokens that can give you profit during the difference of prices in dexes. It contains an array with “sym” (symbol) and “address” (address of the token)

Eg:
```json 
"tokens": [
     {"sym": "DAI", "address": "0xA94bE554Aa488a1aAA37C650bBB2d1170ED7F7c0" },
     {"sym": "BTC", "address": "0xf7de2503483D227e724F48d6c3757e53A8baaF20" }
   ],
```
#
#### 6. routes (Optional) :- 
These are the array of paths that the bot can use to make the trade. It is an array of arrays with 4 parameters.

##### a. 1st index :- router’s address of one dex
##### b. 2nd index :- router’s address of other dex
##### c. 3rd index :- address of baseAsset token
##### 4. 4th index :- address of the tokens you want to trade.
Eg:
```json
     "routes":[ ["0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506","0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","0xa4f08fcC97b3f41F9163667021AcfD73De982514","0xA94bE554Aa488a1aAA37C650bBB2d1170ED7F7c0"],
     ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506","0xa4f08fcC97b3f41F9163667021AcfD73De982514","0xA94bE554Aa488a1aAA37C650bBB2d1170ED7F7c0"]
],
```
#
#### The config.json file will look like this :- 
```json
{
   "arbContract": "0x64066c4DA5953B282508c6b620243b6Cc3cfC66C",
   "minBasisPointsPerTrade": 0,
   "routers": [
     { "dex": "uniswap", "address": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" },
     { "dex": "sushiswap", "address": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506" }
   ],
   "baseAssets": [
     { "sym": "TK1","address": "0xa4f08fcC97b3f41F9163667021AcfD73De982514" }
   ],
   "tokens": [
     {"sym": "TK2", "address": "0xA94bE554Aa488a1aAA37C650bBB2d1170ED7F7c0" },
     {"sym": "TK3", "address": "0xf7de2503483D227e724F48d6c3757e53A8baaF20" }
   ],
   "routes": [
     ["0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506","0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","0xa4f08fcC97b3f41F9163667021AcfD73De982514","0xA94bE554Aa488a1aAA37C650bBB2d1170ED7F7c0"],
     ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506","0xa4f08fcC97b3f41F9163667021AcfD73De982514","0xA94bE554Aa488a1aAA37C650bBB2d1170ED7F7c0"]
   ]
 }
```
#
## 4. To fund the contract with all the baseAssets mentioned in config.json file.

```shell
npx hardhat run --network goerli ./scripts/fund.js
```
#
## 5. To check the balances of baseAssets of contract.

```shell
npx hardhat run --network goerli ./scripts/balances.js
```
#
## 6. To start with the trading.

```shell
npx hardhat run --network goerli ./scripts/trade.js
```
#
## 7. Finally to recover any funds.

```shell
npx hardhat run --network goerli ./scripts/recover.js
```
#
# For Triangular Arbitrage Trading within single dex.

Instatrade feature trades in the same interface between different tokens. It follows a triangular arbitrage bot method. Triangular arbitrage bot method makes the profit in the balance of BaseAsset by trading between two different tokens using one Stable coin.

Suppose you trade from ETH to DAI, DAI to USDT, USDT to SUSHI, and SUSHI to ETH again and you make a profit with this trading. Then the method is the Triangular Arbitrage Trading Method.

Transaction Flow is : 

  a. BaseAsset > Trading Token 1 	(eg: ETH > DAI)

  b. Trading Token1 > Stable Coin 	(eg: DAI > USDT)

  c. Stable Coin > Trading Token 2	(eg: USDT > SUSHI)

  d. Trading Token 2 > Base Asset	(eg: SUSHI > ETH)


## 1. Deploy the trading or arbitrage contract

```shell
npx hardhat run --network <your-network> scripts/instadeploy.js
```
#
## 2. Set the Configurations

These configurations should be in the json file under the config folder. This configuration file will contain the details of your trading contract, the dex’s you want to trade on, the tokens you want to trade on, and also the routes you want to follow while trading.

### Fields of the configuration file :-
#
#### 1. arbContract :- 
Deployed Contract address of Arb.sol solidity smart contract. This contract will be our trading contract or ARB contract.

Eg: 
```json
"arbContract": "0x64066c4DA5953B282508c6b620243b6Cc3cfC66C",
```
#
#### 2. minBasisPointsPerTrade :- 
The minimum amount of profit you want to make on each trade. (Remember to use less value to perform more trade and earn higher profits. Can be greate than or equal to zero or less than or equal to 10000).

Here, 
10000 means - 100% profit.
5000 means - 50% profit.
1000 means - 10% profit.

Keep the value accordingly.

Eg: 
```json
"minBasisPointsPerTrade": 0,
```
#
#### 3. routers :-
An array of decentralized exchanges router addresses on which you want to perform the trade. It takes an object with two values at each index of the array named “dex” - name of the dex and “address” - address of its router.

Eg:
```json
"routers": [
     { "dex": "uniswap", "address": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" },
     { "dex": "sushiswap", "address": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506" }
   ],
```
#
#### 4. baseAssets :- 
Token address which you want to use to start and end the trade with. These tokens generally are stable tokens like WETH, USDC, etc. It contains an array with “sym” (symbol) and “address” (address of the token).

Eg: 
```json
"baseAssets": [
     { "sym": "WETH","address": "0xa4f08fcC97b3f41F9163667021AcfD73De982514" }
   ],
```

#
#### 5. stables :- 
Token address which you want to use as a mediator. These tokens generally are stable tokens like WETH, USDC, etc. It contains an array with “sym” (symbol) and “address” (address of the token).

Eg: 
```json
"stables": [
     { "sym": "WETH","address": "0xa4f08fcC97b3f41F9163667021AcfD73De982514" }
   ],
```

#
#### 6. tokens :- 
Token addresses on which you want to trade. These tokens are the tokens that can give you profit during the difference of liquidity in same dex. It contains an array with “sym” (symbol) and “address” (address of the token)

Eg:
```json 
"tokens": [
     {"sym": "DAI", "address": "0xA94bE554Aa488a1aAA37C650bBB2d1170ED7F7c0" },
     {"sym": "BTC", "address": "0xf7de2503483D227e724F48d6c3757e53A8baaF20" }
   ],
```
#

#
#### The config.json file will look like this :- 
```json
{
   "arbContract": "0x64066c4DA5953B282508c6b620243b6Cc3cfC66C",
   "minBasisPointsPerTrade": 0,
   "routers": [
     { "dex": "uniswap", "address": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" },
     { "dex": "sushiswap", "address": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506" }
   ],
   "baseAssets": [
     { "sym": "TK1","address": "0xa4f08fcC97b3f41F9163667021AcfD73De982514" }
   ],
   "tokens": [
     {"sym": "TK2", "address": "0xA94bE554Aa488a1aAA37C650bBB2d1170ED7F7c0" },
     {"sym": "TK3", "address": "0xf7de2503483D227e724F48d6c3757e53A8baaF20" }
   ]
 }
```
#
## 3. To start with the trading.

```shell
npx hardhat run --network goerli ./scripts/instatrade.js
```
#