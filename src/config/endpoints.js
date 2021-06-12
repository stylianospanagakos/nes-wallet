/**
 * Get all chains.
 */
export const CHAINS = 'chains/';

/**
 * Return a list of all ERC20 and NFT token balances along with their current spot prices.
 * Note: Token holder balances exclude passive rewards through static reflection.
 */
export const TOKEN_BALANCES = '%s/address/%s/balances_v2/';

/**
 * Given chain_id and wallet address, return wallet value for the last 30 days at 24 hour timestamps.
 */
export const HISTORICAL_PORTFOLIO = '%s/address/%s/portfolio_v2/';

/**
 * Retrieve all transactions for address including their decoded log events.
 * This endpoint does a deep-crawl of the blockchain to retrieve all kinds of transactions that references the address.
 */
export const TRANSACTIONS = '%s/address/%s/transactions_v2/';