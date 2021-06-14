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

export const createWallet = ({ chain_id, address, items }) => {
    let wallet = {
        key: `${chain_id.toString()}_${address}`,
        fiat_balance: 0,
        chain_id,
        address: {
            full: address,
            truncated: formatAddress(address)
        },
        logo_url: state.networks[chain_id].logo_url,
        tokens: []
    };
    items.forEach(item => {
        // format values
        let balance = formatTokenBalance(item.balance, item.contract_decimals);
        let quote = formatFiatValue(item.quote);
        // update wallet's fiat balance
        wallet.fiat_balance += item.quote;
        wallet.tokens.push({
            ...item,
            balance,
            quote
        });
    });
    wallet.fiat_balance = formatFiatValue(wallet.fiat_balance);
    return wallet;
}