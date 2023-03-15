import { mount } from 'cypress/react';
import { Person } from '../../cypress/fixtures/types';
import {
    compareBreakpoints,
    getBreakpointFromWidth,
    getColsPercentages,
    setColsPercentagesVariables
} from '../utils/spacing';
import { ColumnConfig } from '../types/table';
import { BREAKPOINT, CSS_VARIABLE } from '../types/enums';
import { generateTableCssVariable } from '../utils/css';
import TableFull from '../components/TableFull';
import { people } from '../../cypress/fixtures/data';
import { TableIdContext } from '../components/TableWrapper';

const dimensions = [300, 640, 768, 2014, 1280, 1536];

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

describe('Simple table', () => {
    const colsPercentages = getColsPercentages(mockPeopleColumns);

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        const onSelectionChangeSpy = cy.spy().as('onSelectionChangeSpy');
        const setColumnOrderSpy = cy.spy().as('setColumnOrderSpy');

        mount(
            <TableIdContext.Provider value={{ getTableId: () => 'mock-table' }}>
                <TableFull<Person>
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
        cy.get('thead');
        cy.get('tbody');
        cy.get('th');
        cy.get('td');
    });

    it('has the right number of rows and columns', () => {
        cy.get('table > thead > tr > th').should('have.length', mockPeopleColumns.length);

        cy.get('table > tbody > tr')
            .first()
            .find('td')
            .should('have.length', mockPeopleColumns.length);

        cy.get('table > tbody > tr').should('have.length', slicedPeople.length);
    });

    it('triggers set column order on header click', () => {
        cy.get('@setColumnOrderSpy').should('not.have.been.calledBefore');

        mockPeopleColumns.forEach((c, i) => {
            if (!c.disableOrderIcon) {
                cy.get('table > thead > tr > th').eq(i).find('svg').click();
                cy.get('@setColumnOrderSpy').should('have.been.called', c.key);
            }
        });
    });

    it('not triggers set column order on disabled sorting headers', () => {
        cy.get('@setColumnOrderSpy').should('not.have.been.calledBefore');

        mockPeopleColumns.forEach((c, i) => {
            if (c.disableOrderIcon) cy.get('table > thead > tr > th').eq(i).click();
        });
        cy.get('@setColumnOrderSpy').should('not.have.been.called');
    });
});

describe('Table resposiveness', () => {
    const mockPeopleColumns: ColumnConfig<Person>[] = [
        { title: 'Id', key: 'id', flex: 0.5 },
        { title: 'Last name', key: 'about.lastName', showAt: BREAKPOINT.XS },
        {
            title: 'Age',
            key: 'about.age',
            flex: 0.5,
            disableOrderIcon: true,
            showAt: BREAKPOINT.SM
        },
        { title: 'Job', key: 'about.job', flex: 1.5, showAt: BREAKPOINT.MD },
        { title: 'Company', key: 'company', flex: 1.5, showAt: BREAKPOINT.LG }
    ];

    dimensions.forEach(d => {
        const breakpoint = getBreakpointFromWidth(d);

        let mockVisibleColumns: ColumnConfig<Person>[] = [];

        mockPeopleColumns.forEach(c => {
            if (c.showAt === undefined) {
                mockVisibleColumns.push(c);
                return;
            }

            if (compareBreakpoints(breakpoint, c.showAt)) mockVisibleColumns.push(c);
        });

        it(`shows the correct columns at ${breakpoint} width`, () => {
            cy.viewport(d, 500);
            const colsPercentages = getColsPercentages(mockVisibleColumns);
            setColsPercentagesVariables('mock-table', colsPercentages, true);

            const onSelectionChangeSpy = cy.spy().as('onSelectionChangeSpy');
            const setColumnOrderSpy = cy.spy().as('setColumnOrderSpy');
            mount(
                <TableIdContext.Provider value={{ getTableId: () => 'mock-table' }}>
                    <TableFull<Person>
                        data={slicedPeople}
                        checkedKeys={[]}
                        columnConfigs={mockPeopleColumns}
                        indexKey='id'
                        onSelectionChange={onSelectionChangeSpy}
                        setColumnOrder={setColumnOrderSpy}
                    />
                </TableIdContext.Provider>
            );

            cy.get('table > thead > tr > th').should('have.length', mockVisibleColumns.length);
            cy.get('table > tbody > tr')
                .first()
                .find('td')
                .should('have.length', mockVisibleColumns.length);
        });
    });
});

describe('Table skeleton', () => {
    const colsPercentages = getColsPercentages(mockPeopleColumns);
    const nSkeletonRows = 8;

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        const onSelectionChangeSpy = cy.spy().as('onSelectionChangeSpy');
        const setColumnOrderSpy = cy.spy().as('setColumnOrderSpy');

        mount(
            <TableIdContext.Provider value={{ getTableId: () => 'mock-table' }}>
                <TableFull<Person>
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
        cy.get('table > tbody > tr')
            .first()
            .find('td')
            .should('have.length', mockPeopleColumns.length)
            .should('contain.text', '-');

        cy.get('table > tbody > tr').should('have.length', nSkeletonRows);
    });
});
