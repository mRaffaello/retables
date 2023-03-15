import { mount } from 'cypress/react';
import { Person } from '../../cypress/fixtures/types';
import { getColsPercentages, setColsPercentagesVariables } from '../utils/spacing';
import { ColumnConfig } from '../types/table';
import { CSS_VARIABLE } from '../types/enums';
import { generateTableCssVariable } from '../utils/css';
import XAxis from '../components/Axis';
import { TableIdContext } from '../components/TableWrapper';

const mockPeopleColumns: ColumnConfig<Person>[] = [
    { title: 'Id', key: 'id', flex: 0.4 },
    { title: 'Last name', key: 'about.lastName' },
    { title: 'Age', key: 'about.age', flex: 0.5, disableOrderIcon: true },
    { title: 'Job', key: 'about.job', flex: 1.5 },
    { title: 'Company', key: 'company', flex: 1.5 }
];

// Clear css variables before each test
beforeEach(() => {
    const r = document.querySelector(':root') as HTMLElement;
    if (r) {
        mockPeopleColumns.forEach((_, i) => {
            const cssVar = generateTableCssVariable(CSS_VARIABLE.CELL_COL_N_WIDTH, [i]);
            r.style.removeProperty(cssVar);
        });
        r.style.removeProperty(generateTableCssVariable(CSS_VARIABLE.CELL_PADDING_HORIZONTAL));
        r.style.removeProperty(generateTableCssVariable(CSS_VARIABLE.CELL_PADDING_VERTICAL));
    }
});

describe('Unresizable Axis', () => {
    const colsPercentages = getColsPercentages(mockPeopleColumns);

    let sum = 0;
    const colsLeftPercentages = colsPercentages.map(p => {
        const temp = sum;
        sum += p;
        return temp;
    });

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);

        mount(
            <TableIdContext.Provider value={{ getTableId: () => 'mock-table' }}>
                <div id='mock-axis' style={{ width: '100%' }}>
                    <XAxis colsPercentages={colsPercentages} resizable={false} />
                </div>
            </TableIdContext.Provider>
        );
    });

    it('renders the correct number of lines', () => {
        cy.get('#mock-axis > div > div').should('have.length', mockPeopleColumns.length - 1);
    });

    it('lines should not be hoverable', () => {
        cy.get('#mock-axis > div > div > .hoverable-line').should('not.exist');
    });

    it.skip('lines has the right positions', () => {
        const lines = [...document.querySelectorAll('#mock-axis > div > div')] as HTMLElement[];
        const container = document.querySelector('#mock-axis');

        if (!container) throw new Error('Header not found');

        lines.forEach((l, i) => {
            const actualLeftValue = Math.round(Number(getComputedStyle(l).left.replace('px', '')));
            const expectedLeftValue = Math.round(500 * (colsLeftPercentages[i + 1] / 100));

            expect(actualLeftValue).to.be.equal(expectedLeftValue);
        });
    });
});

describe('Resizable Axis', () => {
    const colsPercentages = getColsPercentages(mockPeopleColumns);

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);

        mount(
            <TableIdContext.Provider value={{ getTableId: () => 'mock-table' }}>
                <div id='mock-axis' style={{ width: '100%' }}>
                    <XAxis colsPercentages={colsPercentages} resizable />
                </div>
            </TableIdContext.Provider>
        );
    });

    it('renders the correct number of lines', () => {
        cy.get('#mock-axis > div > div').should('have.length', mockPeopleColumns.length - 1);
    });

    it('allows hover', () => {
        cy.get('#mock-axis > div > div > .hoverable-line').should('exist');
    });
});
