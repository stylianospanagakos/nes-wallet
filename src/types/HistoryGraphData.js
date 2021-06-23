import {formatTokenBalance} from '../lib/helpers';

export default ({ holdings, contract_decimals }) => {
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