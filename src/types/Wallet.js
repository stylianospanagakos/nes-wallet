import {formatAddress, formatFiatValue} from '../lib/helpers';
import {v4 as uuidv4} from 'uuid';

export const Wallet = ({ chain_id, address, items, name, logo_url }) => {
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
        logo_url,
        tokens_count: 0
    };
    items.forEach(item => {
        // update wallet's fiat balance
        wallet.fiat_balance += item.quote;
        wallet.tokens_count++;
    });
    wallet.fiat_balance = formatFiatValue(wallet.fiat_balance);
    return wallet;
};