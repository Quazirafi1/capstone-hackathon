// types.ts
export interface Person {
    id: number;
    name: string;
    content: string;
    sets: string;
}

export interface Columns {
    [key: string]: Person[];
}
