# NES Wallet

A crypto wallet powered by Covalent's API.

Supported mainnet chains:
* Ethereum
* Binance Smart Chain
* Matic/Polygon
* Fantom Opera
* Avalanche C-Chain

## Project setup
```
npm install
```
You need to create your own `.env` file and copy the contents of the `.env.example`.

Access [Covalent's API](https://www.covalenthq.com/docs/api) to register your own key and add it as value to the `VUE_APP_COVALENT_API_KEY` variable.

If you also want to include testnets as part of the network options, change the value of `VUE_APP_ENABLE_TESTNETS` to `true`.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
