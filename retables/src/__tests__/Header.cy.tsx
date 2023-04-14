import Header from '../components/Header';
import { mount } from 'cypress/react';
import { Person } from '../../cypress/fixtures/types';
import { ColumnConfig } from '../types/table';
import { CSS_VARIABLE, SORT_DIRECTION } from '../types/enums';
import { generateTableCssVariable } from '../utils/css';
import { setColsPercentagesVariables, getColsPercentages } from '../utils/spacing';

const mockPeopleColumns: ColumnConfig<Person>[] = [
    { title: 'Id', key: 'id', flex: 0.5 },
    { title: 'Last name', key: 'about.lastName' },
    { title: 'Age', key: 'about.age', flex: 0.5, disableOrderIcon: true },
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
        r.style.removeProperty(generateTableCssVariable(CSS_VARIABLE.CELL_PADDING_HORIZONTAL));
        r.style.removeProperty(generateTableCssVariable(CSS_VARIABLE.CELL_PADDING_VERTICAL));
    }
});

describe('Basic header', () => {
    const colsPercentages = getColsPercentages(mockPeopleColumns);
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        setMockCssPaddingVariables();
        const setColumnOrderSpy = cy.spy().as('setColumnOrderSpy');
        mount(
            <div id='mock-header' style={{ width: '100%' }}>
                <Header<Person>
                    columnConfigs={mockPeopleColumns}
                    setColumnOrder={setColumnOrderSpy}
                />
            </div>
        );
    });

    it('uses the correct html tags', () => {
        cy.get('#mock-header > thead > tr > th');
    });

    it('applies the correct cell padding', () => {
        mockPeopleColumns.forEach((_, i) => {
            cy.get('#mock-header > thead > tr > th')
                .eq(i)
                .should('have.css', 'paddingTop', mockVerticalPadding)
                .should('have.css', 'paddingBottom', mockVerticalPadding)
                .should('have.css', 'paddingLeft', mockHorizontalPadding)
                .should('have.css', 'paddingRight', mockHorizontalPadding);
        });
    });

    it('renders the correct number of cells', () => {
        cy.get('#mock-header > thead > tr > th').should('have.length', 5);
    });

    it('renders the header texts', () => {
        mockPeopleColumns.forEach((c, i) => {
            cy.get('#mock-header > thead > tr > th').eq(i).contains(c.title);
        });
    });

    it('disables order icon when requested', () => {
        mockPeopleColumns.forEach((c, i) => {
            if (c.disableOrderIcon)
                cy.get('#mock-header > thead > tr > th').eq(i).children('svg').should('not.exist');
            else cy.get('#mock-header > thead > tr > th').eq(i).children('svg').should('exist');
        });
    });

    it('triggers set column order on icon click', () => {
        cy.get('@setColumnOrderSpy').should('not.have.been.calledBefore');
        cy.get('#mock-header > thead > tr > th').eq(3).children('svg').click({ multiple: true });
        cy.get('@setColumnOrderSpy').should('have.been.calledWith', mockPeopleColumns[3].key);
    });

    it('uses the right column sizes', () => {
        const ths = [
            ...document.querySelectorAll('#mock-header > thead > tr > th')
        ] as HTMLElement[];
        const totalWidth = ths.reduce((a, b) => a + b.clientWidth, 0);

        ths.forEach((th, i) => {
            const actualWidth = th.clientWidth;
            const tolerance = Number(mockHorizontalPadding.replace('px', '')) + 1;
            const expectedWidth = Math.round(totalWidth * (colsPercentages[i] / 100));

            expect(actualWidth)
                .to.be.greaterThan(expectedWidth - tolerance)
                .and.to.be.lessThan(expectedWidth + tolerance);
        });
    });
});

describe('Header with custom classes', () => {
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        const setColumnOrderSpy = cy.spy().as('setColumnOrderSpy');
        mount(
            <div id='mock-header' style={{ width: '100%' }}>
                <Header<Person>
                    columnConfigs={mockPeopleColumns}
                    setColumnOrder={setColumnOrderSpy}
                    baseHeaderClasses='mock-test-class'
                />
            </div>
        );
    });

    it('applies the classes specified', () => {
        cy.get('#mock-header > thead > tr').should('have.class', 'mock-test-class');
    });
});

describe('Header with custom renderers', () => {
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

    const colsPercentages = getColsPercentages(mockPeopleColumns);

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        setMockCssPaddingVariables();
        const setColumnOrderSpy = cy.spy().as('setColumnOrderSpy');
        mount(
            <div id='mock-header' style={{ width: '100%' }}>
                <Header<Person>
                    columnConfigs={mockPeopleColumns}
                    setColumnOrder={setColumnOrderSpy}
                    baseHeaderRenderer={props => (
                        <div className='mock-base-header-renderer'>{props.title}</div>
                    )}
                />
            </div>
        );
    });

    it('uses the default header renderer', () => {
        mockPeopleColumns.forEach((c, i) => {
            if (!c.headerRenderer)
                cy.get('#mock-header > thead > tr > th')
                    .eq(i)
                    .children('.mock-base-header-renderer')
                    .contains(c.title);
        });
    });

    it('overrides default header when specified in column configs', () => {
        mockPeopleColumns.forEach((c, i) => {
            if (c.headerRenderer)
                cy.get('#mock-header > thead > tr > th')
                    .eq(i)
                    .children('#mock-custom-header-renderer')
                    .contains(c.title);
        });
    });

    it('applies the correct cell padding', () => {
        mockPeopleColumns.forEach(_ => {
            cy.get('#mock-header > thead > tr > th')
                .should('have.css', 'paddingTop', mockVerticalPadding)
                .should('have.css', 'paddingBottom', mockVerticalPadding)
                .should('have.css', 'paddingLeft', mockHorizontalPadding)
                .should('have.css', 'paddingRight', mockHorizontalPadding);
        });
    });
});

describe('Header with column order and custom sorting icon renderers', () => {
    const defaultSortedCol = 3;

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', getColsPercentages(mockPeopleColumns), true);
        const setColumnOrderSpy = cy.spy().as('setColumnOrderSpy');

        mount(
            <div id='mock-header' style={{ width: '100%' }}>
                <Header<Person>
                    columnConfigs={mockPeopleColumns}
                    columnOrder={{
                        index: defaultSortedCol,
                        direction: SORT_DIRECTION.DESC
                    }}
                    setColumnOrder={setColumnOrderSpy}
                    orderIconsConfig={{
                        ASC: () => <p className='mock-asc-renderer'>🍎</p>,
                        DESC: () => <p className='mock-desc-renderer'>🍐</p>,
                        INITIAL: () => <p className='mock-initial-renderer'>🍋</p>
                    }}
                />
            </div>
        );
    });

    it('Uses the right icon renderers', () => {
        mockPeopleColumns.forEach((c, i) => {
            if (i !== defaultSortedCol && !c.disableOrderIcon)
                cy.get('#mock-header > thead > tr > th').eq(i).children('.mock-initial-renderer');
            if (i === defaultSortedCol)
                cy.get('#mock-header > thead > tr > th').eq(i).children('.mock-desc-renderer');
        });
    });
});

describe('Header with selection config', () => {
    const selectionFlex = 0.5;

    const colsPercentages = getColsPercentages(mockPeopleColumns, selectionFlex);
    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        const setColumnOrderSpy = cy.spy().as('setColumnOrderSpy');
        mount(
            <div id='mock-header' style={{ width: '100%' }}>
                <Header<Person>
                    columnConfigs={mockPeopleColumns}
                    setColumnOrder={setColumnOrderSpy}
                    hasSelectionConfig
                />
            </div>
        );
    });

    it('uses the right column sizes', () => {
        const ths = [...document.querySelectorAll('#mock-header > thead > tr > th')];
        const totalWidth = ths.reduce((a, b) => a + b.clientWidth, 0);

        ths.forEach((th, i) => {
            const actualWidth = th.clientWidth;
            const expectedWidth = Math.round(totalWidth * (colsPercentages[i] / 100));

            expect(actualWidth).to.be.equal(expectedWidth);
        });
    });
});

describe('Header with selection config and custom renderer', () => {
    const selectionFlex = 0.5;
    const colsPercentages = getColsPercentages(mockPeopleColumns, selectionFlex);

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        const setColumnOrderSpy = cy.spy().as('setColumnOrderSpy');
        const onSelectionChangeSpy = cy.spy().as('onSelectionChangeSpy');
        mount(
            <div id='mock-header' style={{ width: '100%' }}>
                <Header<Person>
                    columnConfigs={mockPeopleColumns}
                    setColumnOrder={setColumnOrderSpy}
                    headerSelectionRenderer={props => (
                        <div id='mock-header-selection-renderer'>
                            <input
                                type='checkbox'
                                checked={props.checked}
                                onChange={onSelectionChangeSpy}
                            />
                        </div>
                    )}
                    hasSelectionConfig
                />
            </div>
        );
    });

    it('uses the custom renderer', () => {
        cy.get('#mock-header > thead > tr > th > #mock-header-selection-renderer');
    });

    it('uses the right column sizes', () => {
        const ths = [...document.querySelectorAll('#mock-header > thead > tr > th')];
        const totalWidth = ths.reduce((a, b) => a + b.clientWidth, 0);

        ths.forEach((th, i) => {
            const actualWidth = th.clientWidth;
            const expectedWidth = Math.round(totalWidth * (colsPercentages[i] / 100));

            expect(actualWidth).to.be.equal(expectedWidth);
        });
    });

    it('triggers on selection change when input is pressed', () => {
        cy.get('@onSelectionChangeSpy').should('not.have.been.calledBefore');
        cy.get('#mock-header > thead > tr > th > #mock-header-selection-renderer > input').click();
        cy.get('@onSelectionChangeSpy').should('have.been.called');
        cy.get('#mock-header > thead > tr > th > #mock-header-selection-renderer > input').should(
            'be.checked'
        );
        cy.get('#mock-header > thead > tr > th > #mock-header-selection-renderer > input').click();
        cy.get('@onSelectionChangeSpy').should('have.been.calledTwice');
        cy.get('#mock-header > thead > tr > th > #mock-header-selection-renderer > input').should(
            'not.be.checked'
        );
    });
});

describe('Header with options config', () => {
    const optionsFlex = 0.6;
    const colsPercentages = getColsPercentages(mockPeopleColumns, undefined, optionsFlex);

    beforeEach(() => {
        setColsPercentagesVariables('mock-table', colsPercentages, true);
        const setColumnOrderSpy = cy.spy().as('setColumnOrderSpy');
        mount(
            <div id='mock-header' style={{ width: '100%' }}>
                <Header<Person>
                    columnConfigs={mockPeopleColumns}
                    setColumnOrder={setColumnOrderSpy}
                />
            </div>
        );
    });

    it('uses the right column sizes', () => {
        const ths = [...document.querySelectorAll('#mock-header > thead > tr > th')];
        let totalThsWidth = ths.reduce((a, b) => a + b.clientWidth, 0);

        const header = document.querySelector('#mock-header');

        if (!header) throw new Error('Header not found');

        const optionsActualWidth = header.clientWidth - totalThsWidth;
        const optionsExpectedWidth = Math.round(
            header.clientWidth * (colsPercentages[colsPercentages.length - 1] / 100)
        );

        expect(optionsActualWidth).to.be.equal(optionsExpectedWidth);
    });
});
