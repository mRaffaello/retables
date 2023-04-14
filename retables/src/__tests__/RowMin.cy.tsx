import RowMin from '../components/RowMin';
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

describe('Basic row min', () => {
    const colsPercentages = getColsPercentages(mockPeopleColumns);
    setMockCssPaddingVariables();

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        mount(
            <RowMin<Person>
                data={person}
                indexKey='id'
                indexTable={0}
                columnConfigs={mockPeopleColumns}
            />
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
            cy.get('td').eq(i).should('contain.text', getByString(person, c.key!));
        });
    });

    it('applies the correct cell padding', () => {
        mockPeopleColumns.forEach((_, i) => {
            cy.get('tr > th')
                .should('have.css', 'paddingTop', mockVerticalPadding)
                .should('have.css', 'paddingBottom', mockVerticalPadding)
                .should('have.css', 'paddingLeft', mockHorizontalPadding)
                .should('have.css', 'paddingRight', mockHorizontalPadding);
        });
    });
});

describe('Row min with custom header and row classes', () => {
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        mount(
            <RowMin<Person>
                data={person}
                indexKey='id'
                indexTable={0}
                columnConfigs={mockPeopleColumns}
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

describe('Row min with custom column classes based on row index', () => {
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        mount(
            <RowMin<Person>
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
        );
    });

    it('applies classes based on the row index', () => {
        cy.get('tbody > tr')
            .should('have.class', 'mock-base-class mock-even-class')
            .should('not.have.class', 'mock-odd-class');
    });
});

describe('Row min with custom column classes based on check state', () => {
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        mount(
            <RowMin<Person>
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
                defaultChecked
            />
        );
    });

    it('applies classes based on the selection status', () => {
        cy.get('tbody > tr')
            .should('have.class', 'mock-base-class mock-selected-class')
            .should('not.have.class', 'mock-unselected-class');
    });
});

describe('Row min with on cell press', () => {
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        const onCellPressSpy = cy.spy().as('onCellPressSpy');
        mount(
            <RowMin<Person>
                data={person}
                indexKey='id'
                indexTable={0}
                onCellPress={onCellPressSpy}
                columnConfigs={mockPeopleColumns}
            />
        );
    });

    it('triggers on cell press when clicked', () => {
        cy.get('@onCellPressSpy').should('not.have.been.calledBefore');
        cy.get('tbody > tr > td').eq(2).click({ multiple: true });
        cy.get('@onCellPressSpy').should('have.been.calledWith', person, mockPeopleColumns[2].key);
    });
});

describe('Row min with custom header renderers', () => {
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
        const onCellPressSpy = cy.spy().as('onCellPressSpy');
        mount(
            <RowMin<Person>
                data={person}
                indexKey='id'
                indexTable={0}
                onCellPress={onCellPressSpy}
                columnConfigs={mockPeopleColumns}
                baseHeaderRenderer={props => (
                    <div className='mock-base-header-renderer'>{props.title}</div>
                )}
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
