import { AccountsComponent } from "./accounts/accounts.component";


export interface HiveAccount {
    jsonrpc: string;
    result: Result;
    id: number;
}

interface Result {
    accounts: Accounts[];
}

interface Accounts {
    id: number;
    name: string;
    owner: Owner;
    active: Owner;
    posting: Posting;
    memo_key: string;
    json_metadata: string;
    posting_json_metadata: string;
    proxy: string;
    last_owner_update: string;
    last_account_update: string;
    created: string;
    mined: boolean;
    recovery_account: string;
    last_account_recovery: string;
    reset_account: string;
    comment_count: number;
    lifetime_vote_count: number;
    post_count: number;
    can_vote: boolean;
    voting_manabar: Votingmanabar;
    downvote_manabar: Votingmanabar;
    balance: Balance;
    savings_balance: Balance;
    hbd_balance: Balance;
    hbd_seconds: string;
    hbd_seconds_last_update: string;
    hbd_last_interest_payment: string;
    savings_hbd_balance: Balance;
    savings_hbd_seconds: string;
    savings_hbd_seconds_last_update: string;
    savings_hbd_last_interest_payment: string;
    savings_withdraw_requests: number;
    reward_hbd_balance: Balance;
    reward_hive_balance: Balance;
    reward_vesting_balance: Balance;
    reward_vesting_hive: Balance;
    vesting_shares: Balance;
    delegated_vesting_shares: Balance;
    received_vesting_shares: Balance;
    vesting_withdraw_rate: Balance;
    post_voting_power: Balance;
    next_vesting_withdrawal: string;
    withdrawn: number;
    to_withdraw: number;
    withdraw_routes: number;
    pending_transfers: number;
    curation_rewards: number;
    posting_rewards: number;
    proxied_vsf_votes: number[];
    witnesses_voted_for: number;
    last_post: string;
    last_root_post: string;
    last_post_edit: string;
    last_vote_time: string;
    post_bandwidth: number;
    pending_claimed_accounts: number;
    open_recurrent_transfers: number;
    is_smt: boolean;
    delayed_votes: any[];
    governance_vote_expiration_ts: string;
}

interface Balance {
    amount: string;
    precision: number;
    nai: string;
}
interface Votingmanabar {
    current_mana: string;
    last_update_time: number;
}
interface Owner {
    weight_threshold: number;
    account_auths: any[];
    key_auths: (number | string)[][];
}

interface Posting {
    weight_threshold: number;
    account_auths: (number | string)[][];
    key_auths: (number | string)[][];
}

export interface Profile {
    profile: ProfileObject;
  }

interface ProfileObject {
    profile_image: string;
    name: string;
    location: string;
    website: string;
    about: string;
    twitter: string;
    youtube: string;
    cover_image: string;
    ethereum: string;
}