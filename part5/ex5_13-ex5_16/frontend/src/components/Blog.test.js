import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: "Test blog",
        url: "http://www.testblog.com",
        likes: 10,
        author: "Test author",
        user: {
            name: "Test author"
        }
    }

    render(<Blog blog={blog} />)

    screen.debug()

    const element = screen.getByText('Test blog')

    screen.debug(element)
    expect(element).toBeDefined()
})


test('clicking the button calls event handler once', async () => {
    const blog = {
        title: "Test blog",
        url: "http://www.testblog.com",
        likes: 10,
        author: "Test author",
        user: {
            name: "Test author"
        }
    }
  
    const mockHandler = jest.fn()
  
    render(
      <Blog blog={blog} onDeleteBlog={mockHandler} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('Remove')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
})