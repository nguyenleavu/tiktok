export interface UserType {
    id: number;
    first_name: string;
    last_name: string;
    nickname: string;
    avatar: string;
    bio: string;
    tick: string;
    is_followed: string;
    followings_count: number;
    followers_count: number;
    likes_count: number;
    website_url: string;
    facebook_url: string;
    youtube_url: string;
    twitter_url: string;
    instagram_url: string;
    videos?: VideoType[];
}

export interface VideoType {
    allows: string[];
    comments_count: number;
    created_at: string;
    description: string;
    file_url: string;
    id: number;
    is_liked: boolean;
    likes_count: number;
    meta: any;
    music: string;
    published_at: string;
    shares_count: number;
    thumb_url: string;
    type: string;
    updated_at: string;
    user: UserType;
    user_id: number;
    uuid: string;
    viewable: number;
    views_count: number;
}
