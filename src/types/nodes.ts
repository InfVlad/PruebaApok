export interface Translation {
    id: number;
    node_id: number;
    locale: string;
    title: string;
}

export interface TNode {
    id: number;
    title: string;
    parent: number | null;
    created_at?: Date | null;
    updated_at?: Date | null;
    translation: Translation[];
}
