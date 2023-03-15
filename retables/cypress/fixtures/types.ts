export type Person = {
    id: number;
    about: {
        firstName: string;
        lastName: string;
        job: string;
        age: number;
    };
    contacts: {
        address: string;
        phone: string;
    };
    company: string;
};
