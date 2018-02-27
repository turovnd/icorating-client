export class ICO {
    id          : Number;
    name        : String;
    website     : String;
    telegram    : String; // @channelusername
    bitcointalk : String; // topic_number
    twitter     : String; // page_name
    facebook    : String; // page_name
    reddit      : String; // page_name
    medium      : String; // @user_name
    admin_score : Number;
    scores: {
        telegram    : Number;
        bitcointalk : Number;
        twitter     : Number;
        facebook    : Number;
        reddit      : Number;
        medium      : Number;
        bing        : Number;
        total_visits: Number;
        mentions    : Number;
        admin_score : Number;
        hype_score  : Number;
        created_at  : Date
    };
    updated_at : Date;
    created_at : Date;
}