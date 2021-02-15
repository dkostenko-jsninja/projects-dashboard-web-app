import React from 'react';

import { render, screen } from '@testing-library/react';

import InputField from './InputField';

describe('InputField', () => {
  const inputFieldProps = {
    className: 'c-manage-dialog__form__input',
    required: true,
    type: 'input',
    inputType: 'text',
    label: 'Test label',
    placeholder: 'Test placeholder',
    name: 'Test name',
    selectValues: [],
    value: 'Test value',
    showErrors: true,
    handleChange: jest.fn(),
    countErrors: jest.fn(),
  };

  it('renders component', () => {
    const div = document.createElement('div');

    const { container } = render(<InputField {...inputFieldProps} />, {
      container: document.body.appendChild(div),
    });

    expect(container.querySelector('.c-manage-dialog__form__input')).toBeInTheDocument();
  });

  it('validates incorrect email address', () => {
    render(<InputField {...inputFieldProps} value="incorrect.email.com" inputType="email" />);

    expect(screen.getByText('Please enter a valid email address.')).toBeVisible();
  });

  it('validates incorrect url', () => {
    render(<InputField {...inputFieldProps} value="incorrect url" inputType="url" />);

    expect(screen.getByText('Please enter a valid url.')).toBeVisible();
  });

  it('validates incorrect date', () => {
    render(<InputField {...inputFieldProps} value="2020.01.01" inputType="date" />);

    expect(screen.getByText('Please enter a valid date in ISO8601 format.')).toBeVisible();
  });

  it('validates empty select', () => {
    render(
      <InputField
        {...inputFieldProps}
        value=""
        type="select"
        selectValues={['test1, test2']}
        label="Test select"
      />
    );

    expect(screen.getByText('Please select Test select')).toBeVisible();
  });

  it('validate empty text field', () => {
    render(<InputField {...inputFieldProps} value="" inputType="text" />);

    expect(screen.getByText('This field should contain at least 2 symbols.')).toBeVisible();
  });
});
