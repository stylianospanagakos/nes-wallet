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

export const createToken = ({ contract_decimals, contract_address, contract_name, contract_ticker_symbol, holdings, logo_url }) => {
    let token = {
        contract_address: {
            full: contract_address,
            truncated: formatAddress(contract_address)
        },
        contract_name,
        contract_ticker_symbol,
        logo_url,
        balance: holdings.length ?
            formatTokenBalance(holdings[0].close.balance, contract_decimals) :
            formatTokenBalance(0),
        history: {
            line: [],
            candle: []
        }
    }
    holdings.forEach(({timestamp, open, high, low, close}) => {
        let date = new Date(timestamp),
            openFormatted = formatTokenBalance(open.balance, contract_decimals),
            highFormatted = formatTokenBalance(high.balance, contract_decimals),
            lowFormatted = formatTokenBalance(low.balance, contract_decimals),
            closeFormatted = formatTokenBalance(close.balance, contract_decimals);

        /**
         * Line chart format [{ x: date, y: 76 }]
         */
        token.history.line.push({
            x: date,
            y: closeFormatted
        });
        /**
         * Candle chart format: [{ x: date, y: [O,H,L,C] }]
         */
        token.history.candle.push({
            x: date,
            y: [openFormatted, highFormatted, lowFormatted, closeFormatted]
        });
    });
    return token;
}