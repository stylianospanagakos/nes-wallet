import {formatAddress, formatTokenBalance, formatFiatValue} from '../lib/helpers';

export default ({
    contract_decimals,
    contract_address,
    contract_name,
    contract_ticker_symbol,
    quote,
    balance,
    supports_erc,
    logo_url
}) => {
    let token = {
        contract_address: {
            full: contract_address,
            truncated: formatAddress(contract_address)
        },
        contract_name,
        contract_ticker_symbol,
        logo_url,
        balance: formatTokenBalance(balance, contract_decimals),
        fiat_balance: formatFiatValue(quote),
        erc_codes: supports_erc ? supports_erc.map(item => item.split('erc')[1]) : null
    }
    return token;
}