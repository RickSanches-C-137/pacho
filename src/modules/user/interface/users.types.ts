export interface SignUpBody {
    matNumber: string;
    gender: string;
    surname: string;
    department: string;
    faculty: string
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export type SignInBody = {
    matNumber: string;
    password: string;
}
