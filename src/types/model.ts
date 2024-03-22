export interface User {
    UserID?: number;
    UserIP?: string;
    Username: string;
    Nickname?: string;
    Password: string;
    Email?: string;
    Avatar?: string;
    RegistrationTime?: Date;
    Birthday?: Date;
    Age?: number;
    PhoneNumber?: string;
}

export interface Post {
    PostID: number;
    PostDate: Date;
    UserID: number;
    Title: string;
    Content: string;
    Likes: number;
    Replies: number;
    Views: number;
}

export interface Comment {
    CommentID: number;
    CommentDate: Date;
    Likes: number;
    UserID: number;
    PostID: number;
    ParentCommentID: number | null;
    Content: string;
}

export interface Category {
    CategoryID: number;
    CategoryName: string;
    CategoryAlias: string;
    CategoryDescription: string;
    ParentCategoryID: number | null;
}

export interface Tag {
    TagID: number;
    TagName: string;
    TagAlias: string;
    TagDescription: string;
}

export interface PostCategory {
    PostID: number;
    CategoryID: number;
}

export interface PostTag {
    PostID: number;
    TagID: number;
}
