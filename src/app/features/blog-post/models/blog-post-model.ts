export interface BlogPost {
    id: string;
    title: string;
    shortDescripton: string;
    content: string;
    featuredImageUrl: string;
    urlHandle: string;
    author: string;
    publishedDate: Date;
    isVisible: boolean;
}