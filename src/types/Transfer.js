import {formatTokenBalance, formatAddress} from '../lib/helpers';
import moment from 'moment';

export const Transfer = ({ block_signed_at, gas_offered, gas_price, gas_spent, successful, transfers }) => {
    const {
        delta,
        from_address,
        to_address,
        transfer_type,
        tx_hash,
        contract_decimals,
        contract_ticker_symbol
    } = transfers[0];
    
    return {
        amount: formatTokenBalance(delta, contract_decimals),
        successful,
        block_signed_at: moment(block_signed_at).format('D MMM YY HH:mm'),
        gas_offered,
        gas_price,
        gas_spent,
        contract_ticker_symbol,
        from_address,
        to_address,
        display_address: formatAddress(to_address),
        transfer_type,
        tx_hash
    }
}