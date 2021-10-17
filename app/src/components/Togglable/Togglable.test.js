
/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component
  const buttonLabel = 'show'
  beforeEach(() => {
    component = render(
      <Togglable buttonLabel='show'>
        <div>testDivContent</div>
      </Togglable>
    )
  })

  test('render its button', () => {
    const button = component.getByRole('button', { name: buttonLabel })
    expect(button).toBeInTheDocument()
  })

  test('should click button', async () => {
    const btn = component.getByRole('button', { name: buttonLabel })
    fireEvent.click(btn, {
      toggleVisibility: true
    })
  })

  test('after cliking its children must be shown', () => {
    const btn = component.getByRole('button', { name: buttonLabel })
    fireEvent.click(btn)

    const btnNot = component.queryByText(buttonLabel)
    expect(btnNot).not.toBeInTheDocument()
  })

  test('renders its children', async () => {
    const btn = component.getByRole('button', { name: buttonLabel })
    fireEvent.click(btn)

    const divContain = await component.findByText(/testDivContent/i)
    expect(divContain).toBeInTheDocument()
  })

  test('there should be a cancel button when clicking show', () => {
    const btn = component.getByRole('button', { name: buttonLabel })
    fireEvent.click(btn)

    const btnCancel = component.getByText(/cancel/i)
    expect(btnCancel)
  })
})
