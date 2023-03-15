import SkeletonMinRow from '../components/SkeletonMinRow';
import { mount } from 'cypress/react';
import { ColumnConfig } from '../types/table';
import { getColsPercentages, setColsPercentagesVariables } from '../utils/spacing';
import { CSS_VARIABLE } from '../types/enums';
import { generateTableCssVariable } from '../utils/css';
import { Person } from '../../cypress/fixtures/types';

const mockPeopleColumns: ColumnConfig<Person>[] = [
    { title: 'Id', key: 'id', flex: 0.5 },
    { title: 'Last name', key: 'about.lastName' },
    { title: 'Age', key: 'about.age', flex: 0.5 },
    { title: 'Job', key: 'about.job', flex: 1.5 },
    { title: 'Company', key: 'company', flex: 1.5 }
];

const mockVerticalPadding = '20px';
const mockHorizontalPadding = '2px';

const setMockCssPaddingVariables = () => {
    const r = document.querySelector(':root') as HTMLElement;
    if (r) {
        r.style.setProperty(
            generateTableCssVariable(CSS_VARIABLE.CELL_PADDING_HORIZONTAL),
            mockHorizontalPadding
        );
        r.style.setProperty(
            generateTableCssVariable(CSS_VARIABLE.CELL_PADDING_VERTICAL),
            mockVerticalPadding
        );
    }
};

// Clear css variables before each test
beforeEach(() => {
    const r = document.querySelector(':root') as HTMLElement;
    if (r) {
        mockPeopleColumns.forEach((_, i) => {
            const cssVar = generateTableCssVariable(CSS_VARIABLE.CELL_COL_N_WIDTH, [i]);
            r.style.removeProperty(cssVar);
        });
    }
});

describe('Basic skeleton row', () => {
    const nSkeletonRows = 8;
    const colsPercentages = getColsPercentages(mockPeopleColumns);
    setMockCssPaddingVariables();

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        mount(
            <tbody style={{ width: '100%', display: 'block' }}>
                <SkeletonMinRow
                    indexTable={0}
                    columnConfigs={mockPeopleColumns}
                    skeletonConfig={{
                        rows: nSkeletonRows,
                        renderer: () => <div className='mock-skeleton-cell'>-</div>
                    }}
                />
            </tbody>
        );
    });

    it('uses the correct html tags', () => {
        cy.get('tbody');
        cy.get('tr');
        cy.get('th');
        cy.get('td');
    });

    it('renders the correct number of cells', () => {
        cy.get('tbody > tr > td').should('have.length', 5);
        cy.get('tbody > tr > th').should('have.length', 5);
    });

    it('cells have the correct values in the right order', () => {
        mockPeopleColumns.forEach((c, i) => {
            cy.get('th').eq(i).should('contain.text', c.title);
            cy.get('td').eq(i).should('contain.text', '-');
        });
    });

    it('applies the correct cell padding', () => {
        mockPeopleColumns.forEach(_ => {
            cy.get('tr > th')
                .should('have.css', 'paddingTop', mockVerticalPadding)
                .should('have.css', 'paddingBottom', mockVerticalPadding)
                .should('have.css', 'paddingLeft', mockHorizontalPadding)
                .should('have.css', 'paddingRight', mockHorizontalPadding);
        });
    });
});

describe('Skeleton row min with custom header and row classes', () => {
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        mount(
            <SkeletonMinRow<Person>
                indexTable={0}
                columnConfigs={mockPeopleColumns}
                skeletonConfig={{
                    rows: 8,
                    renderer: () => <div className='mock-skeleton-cell'>-</div>
                }}
                baseRowClasses='mock-row-class'
                baseHeaderClasses='mock-header-class'
            />
        );
    });

    it('applies the custom header classes', () => {
        cy.get('tbody > tr > th').should('have.class', 'mock-header-class');
    });

    it('applies the custom row classes', () => {
        cy.get('tbody > tr').should('have.class', 'mock-row-class');
    });
});

describe('Skeleton row min with custom column classes based on row index', () => {
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        mount(
            <SkeletonMinRow<Person>
                indexTable={0}
                columnConfigs={mockPeopleColumns}
                baseRowClasses={index => {
                    let baseClasses = 'mock-base-class';
                    return index % 2 !== 0
                        ? `${baseClasses} mock-odd-class`
                        : `${baseClasses} mock-even-class`;
                }}
                skeletonConfig={{
                    rows: 8,
                    renderer: () => <div className='mock-skeleton-cell'>-</div>
                }}
            />
        );
    });

    it('applies classes based on the row index', () => {
        cy.get('tbody > tr')
            .should('have.class', 'mock-base-class mock-even-class')
            .should('not.have.class', 'mock-odd-class');
    });
});

describe('Skeleton row min with custom header renderers', () => {
    const mockPeopleColumns: ColumnConfig<Person>[] = [
        { title: 'Id', key: 'id', flex: 0.5 },
        {
            title: 'Last name',
            key: 'about.lastName',
            headerRenderer: props => <div id='mock-custom-header-renderer'>{props.title}</div>
        },
        { title: 'Age', key: 'about.age', flex: 0.5, disableOrderIcon: true },
        { title: 'Job', key: 'about.job', flex: 1.5 },
        { title: 'Company', key: 'company', flex: 1.5 }
    ];

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        mount(
            <SkeletonMinRow<Person>
                indexTable={0}
                columnConfigs={mockPeopleColumns}
                baseHeaderRenderer={props => (
                    <div className='mock-base-header-renderer'>{props.title}</div>
                )}
                skeletonConfig={{
                    rows: 8,
                    renderer: () => <div className='mock-skeleton-cell'>-</div>
                }}
            />
        );
    });

    it('uses the default header renderer', () => {
        mockPeopleColumns.forEach((c, i) => {
            if (!c.headerRenderer)
                cy.get('tr > th').eq(i).children('.mock-base-header-renderer').contains(c.title);
        });
    });

    it('overrides default header when specified in column configs', () => {
        mockPeopleColumns.forEach((c, i) => {
            if (c.headerRenderer)
                cy.get('tr > th').eq(i).children('#mock-custom-header-renderer').contains(c.title);
        });
    });
});
