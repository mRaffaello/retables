import Row from '../components/Row';
import { mount } from 'cypress/react';
import { ColumnConfig } from '../types/table';
import { getColsPercentages, setColsPercentagesVariables } from '../utils/spacing';
import { getByString } from '../utils/objects';
import { CSS_VARIABLE } from '../types/enums';
import { generateTableCssVariable } from '../utils/css';
import { person } from '../../cypress/fixtures/data';
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

describe('Basic row', () => {
    const colsPercentages = getColsPercentages(mockPeopleColumns);

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        mount(
            <tbody style={{ width: '100%', display: 'block' }}>
                <Row<Person>
                    data={person}
                    indexKey='id'
                    indexTable={0}
                    columnConfigs={mockPeopleColumns}
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

    it('cells have the correct values in the right order', () => {
        mockPeopleColumns.forEach((c, i) => {
            cy.get('td').eq(i).should('contain.text', getByString(person, c.key));
        });
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

describe('Row with custom row classes', () => {
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        mount(
            <tbody id='mock-table' style={{ width: '100%', display: 'block' }}>
                <Row<Person>
                    data={person}
                    indexKey='id'
                    indexTable={0}
                    columnConfigs={mockPeopleColumns}
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
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        mount(
            <tbody id='mock-table' style={{ width: '100%', display: 'block' }}>
                <Row<Person>
                    data={person}
                    indexKey='id'
                    indexTable={0}
                    columnConfigs={mockPeopleColumns}
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

describe('Row with custom column classes based on check state', () => {
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        mount(
            <tbody id='mock-table' style={{ width: '100%', display: 'block' }}>
                <Row<Person>
                    data={person}
                    indexKey='id'
                    indexTable={0}
                    columnConfigs={mockPeopleColumns}
                    baseRowClasses={(_, isSelected) => {
                        let baseClasses = 'mock-base-class';
                        return isSelected
                            ? `${baseClasses} mock-selected-class`
                            : `${baseClasses} mock-unselected-class`;
                    }}
                    checked={true}
                />
            </tbody>
        );
    });

    it('applies classes based on the selection status', () => {
        cy.get('tbody > tr')
            .should('have.class', 'mock-base-class mock-selected-class')
            .should('not.have.class', 'mock-unselected-class');
    });
});

describe('Row with options renderer', () => {
    const optionFlex = 0.2;

    const colsPercentages = getColsPercentages(mockPeopleColumns, undefined, optionFlex);

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);

        mount(
            <tbody id='mock-table' style={{ width: '100%', display: 'block' }}>
                <Row<Person>
                    data={person}
                    indexKey='id'
                    indexTable={0}
                    columnConfigs={mockPeopleColumns}
                    optionsCellRenderer={() => (
                        <div
                            id='mock-options-renderer'
                            style={{ backgroundColor: 'red', height: '10px', width: '10px' }}
                        />
                    )}
                />
            </tbody>
        );
    });

    it('renders the options cell', () => {
        cy.get('tbody > tr > td > #mock-options-renderer').should('exist');
    });
});

describe('Row with selection config', () => {
    const selectionFlex = 0.4;

    beforeEach(() => {
        setColsPercentagesVariables(
            'mock-table',
            getColsPercentages(mockPeopleColumns, selectionFlex),
            true
        );
        const onSelectionChangeSpy = cy.spy().as('onSelectionChangeSpy');
        mount(
            <tbody id='mock-table' style={{ width: '100%', display: 'block' }}>
                <Row<Person>
                    data={person}
                    indexKey='id'
                    indexTable={0}
                    columnConfigs={mockPeopleColumns}
                    onSelectionChange={onSelectionChangeSpy}
                    selectionConfigRenderer={props => (
                        <div
                            id='mock-selection-renderer'
                            className='flex justify-center h-full w-full'>
                            <input
                                type='checkbox'
                                checked={props.checked}
                                onChange={() => props.onChange && props.onChange()}
                            />
                        </div>
                    )}
                    checked={true}
                />
            </tbody>
        );
    });

    it('renders the selection cell', () => {
        cy.get('tbody > tr > td > #mock-selection-renderer').should('exist');
    });

    it('checks by default the selection input', () => {
        cy.get('tbody > tr > td > #mock-selection-renderer > input').should('be.checked');
    });

    it('triggers on selection change when input is pressed', () => {
        cy.get('@onSelectionChangeSpy').should('not.have.been.calledBefore');
        cy.get('tbody > tr > td > #mock-selection-renderer > input').click();
        cy.get('@onSelectionChangeSpy').should('have.been.calledWith', person.id);
    });

    //it('selection cell should has the right width');
});

describe('Row with on cell press', () => {
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        const onCellPressSpy = cy.spy().as('onCellPressSpy');
        mount(
            <tbody id='mock-table' style={{ width: '100%', display: 'block' }}>
                <Row<Person>
                    data={person}
                    indexKey='id'
                    indexTable={0}
                    onCellPress={onCellPressSpy}
                    columnConfigs={mockPeopleColumns}
                />
            </tbody>
        );
    });

    it('triggers on cell press when clicked', () => {
        cy.get('@onCellPressSpy').should('not.have.been.calledBefore');
        cy.get('tbody > tr > td').eq(2).click({ multiple: true });
        cy.get('@onCellPressSpy').should('have.been.calledWith', person, mockPeopleColumns[2].key);
    });
});
