import { mount } from 'cypress/react';
import { CSS_VARIABLE } from '../types/enums';
import { generateTableCssVariable } from '../utils/css';
import ExternLines from '../components/ExternLines';

const mockSetCssVariable = (variable: CSS_VARIABLE, value: string | number) => {
    const r = document.querySelector(':root') as HTMLElement;
    if (r) {
        r.style.setProperty(generateTableCssVariable(variable), String(value));
    }
};

describe('Basic', () => {
    beforeEach(() => {
        mount(
            <div id='mock-extern-lines' style={{ width: '100%' }}>
                <ExternLines />
            </div>
        );
    });

    it('renders all the lines', () => {
        cy.get('#mock-extern-lines > #extern-left');
        cy.get('#mock-extern-lines > #extern-right');
        cy.get('#mock-extern-lines > #extern-top');
        cy.get('#mock-extern-lines > #extern-bottom');
    });

    it('line has the right color', () => {
        const color = 'rgb(255, 0, 0)';
        mockSetCssVariable(CSS_VARIABLE.GRID_COLOR, color);

        cy.get('#mock-extern-lines > #extern-left').should('have.css', 'background-color', color);
        cy.get('#mock-extern-lines > #extern-right').should('have.css', 'background-color', color);
        cy.get('#mock-extern-lines > #extern-top').should('have.css', 'background-color', color);
        cy.get('#mock-extern-lines > #extern-bottom').should('have.css', 'background-color', color);
    });

    it.skip('uses the correct widths', () => {
        mockSetCssVariable(CSS_VARIABLE.GRID_WIDTH_LEFT, '4px');
        mockSetCssVariable(CSS_VARIABLE.GRID_WIDTH_RIGHT, '5px');
        mockSetCssVariable(CSS_VARIABLE.GRID_WIDTH_TOP, '6px');
        mockSetCssVariable(CSS_VARIABLE.GRID_WIDTH_BOTTOM, '7px');

        cy.get('#mock-extern-lines > #extern-left')
            .should('have.css', 'width', '4px')
            .should('have.css', 'height', `${window.innerHeight}px`);
        cy.get('#mock-extern-lines > #extern-right')
            .should('have.css', 'width', '5px')
            .should('have.css', 'height', `${window.innerHeight}px`);
        cy.get('#mock-extern-lines > #extern-top')
            .should('have.css', 'height', '6px')
            .should('have.css', 'width', `${window.innerWidth}px`);
        cy.get('#mock-extern-lines > #extern-bottom')
            .should('have.css', 'height', '7px')
            .should('have.css', 'width', `${window.innerWidth}px`);
    });
});
