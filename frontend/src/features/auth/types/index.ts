export interface RegisterRequest {
    email: string;
    password: string;
    fullname: string;
}

export interface RegisterResponse {
    token: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

// Define a type for the slice state
export interface AuthState {
    token: string
}

// Define the initial state using that type
export const initialAuthState: AuthState = {
    token: ''
}
