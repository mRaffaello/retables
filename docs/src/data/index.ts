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

export const people = [
    {
        id: 0,
        about: {
            firstName: 'Alexys',
            lastName: 'Zemlak',
            job: 'Investor Markets Consultant',
            age: 69
        },
        contacts: { address: '76388 White Oval', phone: '794-995-9230 x2936' },
        company: 'Olson Group'
    },
    {
        id: 1,
        about: {
            firstName: 'Gertrude',
            lastName: 'Feeney',
            job: 'Global Intranet Executive',
            age: 25
        },
        contacts: { address: '101 Jessica Turnpike', phone: '533.314.5876 x8840' },
        company: 'Lind LLC'
    },
    {
        id: 2,
        about: {
            firstName: 'Eleanora',
            lastName: 'Schaefer',
            job: 'Lead Branding Producer',
            age: 66
        },
        contacts: { address: '585 Malvina Garden', phone: '1-266-871-8713 x682' },
        company: 'Hirthe, Jerde and Jacobson'
    },
    {
        id: 3,
        about: {
            firstName: 'Annette',
            lastName: 'Greenholt',
            job: 'Corporate Security Coordinator',
            age: 47
        },
        contacts: { address: '437 Anastasia Divide', phone: '424-213-7160 x2695' },
        company: 'Jakubowski Group'
    },
    {
        id: 4,
        about: {
            firstName: 'Shea',
            lastName: 'Rogahn',
            job: 'Forward Communications Officer',
            age: 55
        },
        contacts: { address: '622 Fletcher Streets', phone: '(970) 896-8440 x49564' },
        company: 'Ebert - Rutherford'
    },
    {
        id: 5,
        about: {
            firstName: 'Edgardo',
            lastName: 'Crooks',
            job: 'Customer Quality Assistant',
            age: 41
        },
        contacts: { address: '75376 Brakus Valley', phone: '289-478-3111 x4148' },
        company: "Hayes, D'Amore and Lehner"
    },
    {
        id: 6,
        about: {
            firstName: 'Mozell',
            lastName: 'Ebert',
            job: 'Central Applications Associate',
            age: 63
        },
        contacts: { address: '222 Anabelle Fort', phone: '1-212-755-1455' },
        company: 'Gutkowski, Crona and Keebler'
    },
    {
        id: 7,
        about: {
            firstName: 'Domenico',
            lastName: 'Brakus',
            job: 'International Paradigm Analyst',
            age: 21
        },
        contacts: { address: '4212 Harris Summit', phone: '354-233-7297 x74489' },
        company: 'Bashirian - Kunde'
    },
    {
        id: 8,
        about: {
            firstName: 'Eladio',
            lastName: 'Howe',
            job: 'International Factors Designer',
            age: 39
        },
        contacts: { address: '777 Funk Radial', phone: '212.500.1077 x044' },
        company: 'Haley, Armstrong and Price'
    },
    {
        id: 9,
        about: {
            firstName: 'Gaston',
            lastName: 'Stark',
            job: 'International Research Liaison',
            age: 34
        },
        contacts: { address: '224 Kayleigh Drive', phone: '(902) 661-0451 x692' },
        company: 'Oberbrunner LLC'
    },
    {
        id: 10,
        about: {
            firstName: 'Terry',
            lastName: 'McDermott',
            job: 'Internal Division Facilitator',
            age: 39
        },
        contacts: { address: '412 Jarvis Harbor', phone: '1-357-257-1892' },
        company: 'Erdman, Erdman and Collins'
    },
    {
        id: 11,
        about: {
            firstName: 'Beryl',
            lastName: 'Morar',
            job: 'Legacy Metrics Coordinator',
            age: 30
        },
        contacts: { address: '103 Pietro Mission', phone: '426-363-6418' },
        company: 'Bogisich, Kiehn and Ruecker'
    },
    {
        id: 12,
        about: {
            firstName: 'Curtis',
            lastName: 'Ruecker',
            job: 'Central Markets Technician',
            age: 47
        },
        contacts: { address: '602 Solon Falls', phone: '(627) 596-0084' },
        company: 'Legros - Anderson'
    },
    {
        id: 13,
        about: {
            firstName: 'Rylee',
            lastName: 'Boyer',
            job: 'Internal Integration Orchestrator',
            age: 32
        },
        contacts: { address: '520 Wisoky Glen', phone: '919-422-4677 x4485' },
        company: 'Hilll and Sons'
    },
    {
        id: 14,
        about: {
            firstName: 'Preston',
            lastName: 'Kertzmann',
            job: 'Regional Optimization Producer',
            age: 60
        },
        contacts: { address: '3712 Cronin Vista', phone: '677-282-4997 x8686' },
        company: 'Connelly - Sipes'
    },
    {
        id: 15,
        about: {
            firstName: 'Raheem',
            lastName: 'Grant',
            job: 'National Program Consultant',
            age: 62
        },
        contacts: { address: '7718 Yost Avenue', phone: '630-976-2460 x10636' },
        company: "Rippin - O'Kon"
    },
    {
        id: 16,
        about: {
            firstName: 'Anjali',
            lastName: 'Swift',
            job: 'Future Operations Architect',
            age: 68
        },
        contacts: { address: '217 Silas Motorway', phone: '1-737-668-7309 x315' },
        company: 'Moen - Casper'
    },
    {
        id: 17,
        about: {
            firstName: 'Arlie',
            lastName: 'Heidenreich',
            job: 'Corporate Mobility Assistant',
            age: 31
        },
        contacts: { address: '612 Aaliyah Cape', phone: '1-675-742-6926 x54198' },
        company: 'Kirlin, Abernathy and Gusikowski'
    },
    {
        id: 18,
        about: {
            firstName: 'Mckenna',
            lastName: 'Steuber',
            job: 'Forward Communications Liaison',
            age: 63
        },
        contacts: { address: '496 Legros Light', phone: '(782) 601-6108 x9224' },
        company: 'Dach - Schneider'
    },
    {
        id: 19,
        about: {
            firstName: 'Armand',
            lastName: 'Schaefer',
            job: 'Human Brand Facilitator',
            age: 45
        },
        contacts: { address: '72448 Kassulke Ridge', phone: '626-400-6065 x2611' },
        company: 'Kulas, Mohr and Luettgen'
    }
] as Person[];
