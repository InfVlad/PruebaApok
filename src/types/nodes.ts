export interface Node {
    id: number;
    title: string;
    parent: number | null;
    created_at?: Date | null;
    updated_at?: Date | null;
}