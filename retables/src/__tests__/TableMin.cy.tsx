import { mount } from 'cypress/react';
import { Person } from '../../cypress/fixtures/types';
import { getColsPercentages, setColsPercentagesVariables } from '../utils/spacing';
import { ColumnConfig } from '../types/table';
import { CSS_VARIABLE } from '../types/enums';
import { generateTableCssVariable } from '../utils/css';
import TableMin from '../components/TableMin';
import { people } from '../../cypress/fixtures/data';
import { TableIdContext } from '../components/TableWrapper';

const mockPeopleColumns: ColumnConfig<Person>[] = [
    { title: 'Id', key: 'id', flex: 0.5 },
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

const slicedPeople = people.slice(0, 8);

describe('Simple min table', () => {
    const colsPercentages = getColsPercentages(mockPeopleColumns);

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        const onSelectionChangeSpy = cy.spy().as('onSelectionChangeSpy');
        const setColumnOrderSpy = cy.spy().as('setColumnOrderSpy');

        mount(
            <TableIdContext.Provider value={{ getTableId: () => 'mock-table' }}>
                <TableMin<Person>
                    data={slicedPeople}
                    checkedKeys={[]}
                    columnConfigs={mockPeopleColumns}
                    indexKey='id'
                    onSelectionChange={onSelectionChangeSpy}
                    setColumnOrder={setColumnOrderSpy}
                />
            </TableIdContext.Provider>
        );
    });

    it('uses the table components', () => {
        cy.get('table');
        cy.get('tbody');
        cy.get('th');
        cy.get('td');
    });

    it('has the right number of rows and columns', () => {
        cy.get('table > tbody')
            .first()
            .find('tr > th')
            .should('have.length', mockPeopleColumns.length);

        cy.get('table > tbody')
            .first()
            .find('tr > td')
            .should('have.length', mockPeopleColumns.length);

        cy.get('table > tbody').should('have.length', slicedPeople.length);
    });
});

describe('Table min skeleton', () => {
    const colsPercentages = getColsPercentages(mockPeopleColumns);
    const nSkeletonRows = 8;

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        const onSelectionChangeSpy = cy.spy().as('onSelectionChangeSpy');
        const setColumnOrderSpy = cy.spy().as('setColumnOrderSpy');

        mount(
            <TableIdContext.Provider value={{ getTableId: () => 'mock-table' }}>
                <TableMin<Person>
                    data={undefined}
                    checkedKeys={[]}
                    columnConfigs={mockPeopleColumns}
                    indexKey='id'
                    onSelectionChange={onSelectionChangeSpy}
                    setColumnOrder={setColumnOrderSpy}
                    skeletonConfig={{
                        rows: nSkeletonRows,
                        renderer: () => <div className='mock-skeleton-cell'>-</div>
                    }}
                />
            </TableIdContext.Provider>
        );
    });

    it('shows skeleton when data is undefined', () => {
        cy.get('table > tbody')
            .first()
            .find('tr > td')
            .should('have.length', mockPeopleColumns.length)
            .should('contain.text', '-');

        cy.get('table > tbody').should('have.length', nSkeletonRows);
    });
});
