import Cell from '../components/Cell';
import { mount } from 'cypress/react';
import { person } from '../../cypress/fixtures/data';
import { Person } from '../../cypress/fixtures/types';

type CellProps = React.ComponentProps<typeof Cell<Person>>;

const mockCellRenderer: CellProps['cellRenderer'] = props => (
    <div id='cell-mock' className='cell-mock-class'>
        {props.text}
    </div>
);

const mockColumnRenderer: CellProps['columnRenderer'] = props => (
    <div id='col-mock' className='col-mock-class'>
        {props.item.about.job}
    </div>
);

describe('No custom renderer', () => {
    beforeEach(() => {
        mount(<Cell<Person> columnKey='company' rowIndex={1} item={person} />);
    });

    it('contains the correct information', () => {
        cy.contains(person.company);
    });
});

describe('Default global cell renderer', () => {
    beforeEach(() => {
        mount(
            <Cell<Person>
                columnKey='about.firstName'
                rowIndex={1}
                item={person}
                cellRenderer={mockCellRenderer}
            />
        );
    });

    it('contains the correct information', () => {
        cy.contains(person.about.firstName);
    });

    it('uses the specified render', () => {
        cy.get('#cell-mock')
            .contains(person.about.firstName)
            .should('have.class', 'cell-mock-class');
    });
});

describe('Specific column cell renderer', () => {
    beforeEach(() => {
        mount(
            <Cell<Person>
                columnKey='about.job'
                rowIndex={1}
                item={person}
                columnRenderer={mockColumnRenderer}
            />
        );
    });

    it('contains the correct information', () => {
        cy.contains(person.about.job);
    });

    it('uses the specified render', () => {
        cy.get('#col-mock').contains(person.about.job).should('have.class', 'col-mock-class');
    });
});

describe('Both column renderer and cell renderer', () => {
    beforeEach(() => {
        mount(
            <Cell<Person>
                columnKey='about.job'
                rowIndex={1}
                item={person}
                cellRenderer={mockCellRenderer}
                columnRenderer={mockColumnRenderer}
            />
        );
    });

    it('uses columnRenderer instead of cellRenderer', () => {
        cy.get('#col-mock').contains(person.about.job).should('have.class', 'col-mock-class');
    });
});
