export type Human = {
    id: string;
    name: string;
} 

export type Engagements = {
    id: string;
    name: string;
    client: string;
    employee: string;
    description: string;
    started: Date;
    ended?: Date;
}