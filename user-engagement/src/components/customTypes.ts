export type Human = {
    id: string;
    name: string;
} 

export type PreEngagement = {
    id: string;
    name: string;
    client: string;
    employee: string;
    description: string;
    started: Date;
    ended?: Date;
}
export type NewEngagement = {
    name: string;
    client: string;
    employee: string;
    description: string;
}
export type Engagement = {
    id: string;
    name: string;
    client: Human;
    employee: Human;
    description: string;
    started: Date;
    ended?: Date;
}