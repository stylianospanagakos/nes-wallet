import moment from 'moment';

export const formatTokenBalance = (balance, decimals) => {
    const value = decimals > 0 ?
        parseInt(balance) / Math.pow(10, decimals) :
        parseInt(balance);
    return value.toFixed(2);
}

export const formatFiatValue = (quote) => {
    return parseFloat(quote).toFixed(2);
}

export const formatAddress = (address) => {
    return `${address.slice(0, 14)}...${address.slice(-5)}`;
}

export const createHistoryGraphData = ({ holdings, contract_decimals }) => {
    const line = [],
        candlestick = [];
    holdings.forEach(({timestamp, open, high, low, close}) => {
        let date = new Date(timestamp),
            openFormatted = formatTokenBalance(open.balance, contract_decimals),
            highFormatted = formatTokenBalance(high.balance, contract_decimals),
            lowFormatted = formatTokenBalance(low.balance, contract_decimals),
            closeFormatted = formatTokenBalance(close.balance, contract_decimals);

        /**
         * Line chart format [{ x: date, y: 76 }]
         */
        line.push({
            x: date,
            y: closeFormatted
        });
        /**
         * Candlestick chart format: [{ x: date, y: [O,H,L,C] }]
         */
         candlestick.push({
            x: date,
            y: [openFormatted, highFormatted, lowFormatted, closeFormatted]
        });
    });
    // reverse order of history items
    return {
        line: line.reverse(),
        candlestick: candlestick.reverse()
    };
}

export const createTransaction = ({ block_signed_at, gas_offered, gas_price, gas_spent, successful, value, from_address, to_address, transfer_type, tx_hash, contract_decimals }) => {
    return {
        amount: formatTokenBalance(value, contract_decimals),
        successful,
        block_signed_at: moment(block_signed_at).format('D MMM YY HH:mm'),
        gas_offered,
        gas_price,
        gas_spent,
        from_address,
        to_address,
        transfer_type,
        display_address: formatAddress(to_address),
        tx_hash
    }
}