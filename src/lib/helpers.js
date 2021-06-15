import {v4 as uuidv4} from 'uuid';

export const formatTokenBalance = (balance, decimals) => {
    const value = decimals > 0 ?
        parseInt(balance) / Math.pow(10, decimals) :
        parseInt(balance);
    return value.toFixed(4);
}

export const formatFiatValue = (quote) => {
    return parseFloat(quote).toFixed(2);
}

export const formatAddress = (address) => {
    return `${address.slice(0, 14)}...${address.slice(-5)}`;
}

export const createWallet = ({ chain_id, address, items, name, network }) => {
    const key = `${chain_id.toString()}_${address}`;
    let wallet = {
        key,
        uuid: uuidv4(key),
        name,
        fiat_balance: 0,
        chain_id,
        address: {
            full: address,
            truncated: formatAddress(address)
        },
        logo_url: network.logo_url,
        tokens_count: 0
    };
    items.forEach(item => {
        // update wallet's fiat balance
        wallet.fiat_balance += item.quote;
        wallet.tokens_count++;
    });
    wallet.fiat_balance = formatFiatValue(wallet.fiat_balance);
    return wallet;
}

export const createToken = ({ contract_decimals, contract_address, contract_name, contract_ticker_symbol, holdings }) => {
    let token = {
        contract_address,
        contract_name,
        contract_ticker_symbol,
        balance: holdings.length ?
            formatTokenBalance(holdings[0].close.balance, contract_decimals) :
            formatTokenBalance(0),
        history: []
    }
    holdings.forEach(({timestamp, open, high, low, close}) => {
        /**
         * Candle chart format: [{ x: date, y: [O,H,L,C] }]
         */
        token.history.push({
            x: new Date(timestamp),
            y: [
                formatTokenBalance(open.balance, contract_decimals),
                formatTokenBalance(high.balance, contract_decimals),
                formatTokenBalance(low.balance, contract_decimals),
                formatTokenBalance(close.balance, contract_decimals)
            ]
        });
    });
    return token;
}