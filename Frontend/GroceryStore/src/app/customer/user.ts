export interface User {
    firstname: string,
    lastname: string,
    emailId: { type: string, unique: true }, //user's email should be unique. Will be used to log-in
    password: string,
    dob: string,
    phone: number,
    address: string
}
