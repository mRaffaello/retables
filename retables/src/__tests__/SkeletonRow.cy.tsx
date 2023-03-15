import SkeletonRow from '../components/SkeletonRow';
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

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        mount(
            <tbody style={{ width: '100%', display: 'block' }}>
                <SkeletonRow
                    indexTable={0}
                    colsPercentages={colsPercentages}
                    skeletonConfig={{
                        rows: nSkeletonRows,
                        renderer: () => <div className='mock-skeleton-cell'>-</div>
                    }}
                />
            </tbody>
        );
    });

    it('uses the correct html tags', () => {
        cy.get('tbody > tr > td');
    });

    it('renders the correct number of cells', () => {
        cy.get('tbody > tr > td').should('have.length', 5);
    });

    it('uses the skeleton renderer', () => {
        cy.get('tbody > tr > td')
            .should('have.length', mockPeopleColumns.length)
            .should('contain.text', '-');
    });

    it('uses the right column sizes', () => {
        const tds = [...document.querySelectorAll('tbody > tr > td')] as HTMLElement[];
        const totalWidth = tds.reduce((a, b) => a + b.clientWidth, 0);

        tds.forEach((th, i) => {
            const actualWidth = th.clientWidth;
            const tolerance = 1;
            const expectedWidth = Math.round(totalWidth * (colsPercentages[i] / 100));

            expect(actualWidth)
                .to.be.greaterThan(expectedWidth - tolerance)
                .and.to.be.lessThan(expectedWidth + tolerance);
        });
    });
});

describe('Row with custom column classes', () => {
    const colsPercentages = getColsPercentages(mockPeopleColumns);

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        mount(
            <tbody style={{ width: '100%', display: 'block' }}>
                <SkeletonRow
                    indexTable={0}
                    colsPercentages={colsPercentages}
                    skeletonConfig={{
                        rows: 8,
                        renderer: () => <div className='mock-skeleton-cell'>-</div>
                    }}
                    baseRowClasses='mock-test-class'
                />
            </tbody>
        );
    });

    it('applies the classes specified', () => {
        cy.get('tbody > tr').should('have.class', 'mock-test-class');
    });
});

describe('Row with custom column classes based on row index', () => {
    const colsPercentages = getColsPercentages(mockPeopleColumns);

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        mount(
            <tbody style={{ width: '100%', display: 'block' }}>
                <SkeletonRow
                    indexTable={0}
                    colsPercentages={colsPercentages}
                    skeletonConfig={{
                        rows: 8,
                        renderer: () => <div className='mock-skeleton-cell'>-</div>
                    }}
                    baseRowClasses={index => {
                        let baseClasses = 'mock-base-class';
                        return index % 2 !== 0
                            ? `${baseClasses} mock-odd-class`
                            : `${baseClasses} mock-even-class`;
                    }}
                />
            </tbody>
        );
    });

    it('applies classes based on the row index', () => {
        cy.get('tbody > tr')
            .should('have.class', 'mock-base-class mock-even-class')
            .should('not.have.class', 'mock-odd-class');
    });
});
