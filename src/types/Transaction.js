import {formatTokenBalance, formatAddress} from '../lib/helpers';
import moment from 'moment';

export default ({
    block_signed_at,
    gas_offered,
    gas_price,
    gas_spent,
    successful,
    value,
    from_address,
    to_address,
    transfer_type,
    tx_hash,
    contract_decimals
}) => {
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