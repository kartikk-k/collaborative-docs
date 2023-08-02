

export interface AuthContextType {
    isAuthenticated: boolean | undefined;
    userData: UserDataType | null;
}

export interface UserDataType {
    id: string;
    name: string;
    email: string;
    isAuthenticated: boolean;
}

export interface DocumentType {
    id: string;
    created_at: string;
    title: string;
    creator: string;
    share_status: "private" | "public" | "limited";
    content: JSON[] | null;
    ghost_documnet: boolean;
}