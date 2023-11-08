import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">        
        <div className="togglableContent">togglable content</div>
      </Togglable>
    );
  });

  test('renders its children', () => {
    expect(screen.getByText('togglable content')).toBeDefined();
  });

  
  test('at start, the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...');
    userEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggling twice hides the children', () => {
    const button = component.getByText('show...');
    userEvent.click(button);
    userEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});
