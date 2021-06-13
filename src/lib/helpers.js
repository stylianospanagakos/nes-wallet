export const formatTokenBalance = (balance, decimals) => {
    const value = decimals > 0 ?
        parseInt(balance) / Math.pow(10, decimals) :
        parseInt(balance);
    return value.toFixed(4);
}

export const formatFiatValue = (quote) => {
    return parseFloat(quote).toFixed(2);
}