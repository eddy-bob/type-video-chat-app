export interface Register {
       email: string;
       role?: string;
       firstName: string;
       lastName: string;
       mobile: string;
       zipCode?: string;
       country?: string
       password: string,
       region?: string
};
export interface Login {
       email: string;
       password: string
}
export interface ForgotPasswordInit {
       email: string;
}
export interface ForgotPasswordComplete {
       confirmPassword: string
       newPassword: string
       resetToken: string
}
export interface ChangePassword {
       oldPassword: string;
       newPassword: string
}