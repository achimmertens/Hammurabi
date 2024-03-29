export interface HiveBlog {
    jsonrpc: number,
    result:
    [{
        author: String,
        permlink: String,
        category: String,
        title: String,
        body: String,
        json_metadata: String[],
        created: Date,
        last_update: Date,
        depth: number,
        children: number,
        last_payout: Date,
        cashout_time: Date,
        total_payout_value: String,
        curator_payout_value: String,
        pending_payout_value: String,
        promoted: String,
        replies: String[],
        body_length: number,
        author_reputation: number,
        parent_author: String,
        parent_permlink: String,
        url: String,
        root_title: String,
        beneficiaries: String[],
        max_accepted_payout: String,
        percent_hbd: number,
        post_id: number,
        net_rshares: number,
        active_votes: String[]
    }]
}
