/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import ListNote from './ListNotes'

test('renders content', () => {
  const notes = {
    content: 'This is a test',
    important: true
  }

  const component = render(<ListNote notes={notes} />)

  // component.getByText('This is a test')
  expect(component.container).toHaveTextContent(notes.content)
  // component.debug()
  // const li = component.container.querySelector('li')
  // console.log(prettyDOM(li))
})
