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
        url: "http://www.testblog.com/",
        likes: 10,
        author: "Test author",
        user: {
            name: "Test author"
        }
    }

    // Mock the window.confirm function
    window.confirm = jest.fn(() => true);

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} onDeleteBlog={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('Remove') // Make sure 'Remove' matches the actual button text

    await user.click(button)

    // Expect that the mock handler was called once
    expect(mockHandler.mock.calls).toHaveLength(1)
})

test('blog details are hidden by default and shown when the button is clicked', async () => {
    const blog = {
      title: "Test blog",
      url: "http://www.testblog.com/",
      likes: 10,
      author: "Test author",
      user: {
        name: "Test author"
      }
    }

    render(<Blog blog={blog} />)

    // Initially, details are not shown
    expect(screen.queryByText('Likes: 10')).toBeInTheDocument()

    // Click the "view" button to toggle details
    userEvent.click(screen.getByText('view')) // Make sure 'view' matches the actual button text

    // After clicking, details should be visible
    expect(screen.getByText('Likes: 10')).toBeInTheDocument()
})

test('like button event handler is called twice when clicked twice', async () => {
    const blog = {
        title: "Test blog",
        url: "http://www.testblog.com/",
        likes: 10,
        author: "Test author",
        user: {
            name: "Test author"
        }
    }

    const handleLikesMock = jest.fn();

    render(
        <Blog blog={blog} handleLikes={handleLikesMock} />
    )

    // Initially, likes are set to 10
    expect(screen.getByText('Likes: 10')).toBeInTheDocument();

    // Click the "view" button to toggle details
    userEvent.click(screen.getByText('view'));

    // Click the like button twice
    const likeButton = screen.getByText('Like');

    // First click
    await userEvent.click(likeButton);

    // Second click
    await userEvent.click(likeButton);

    console.log('Number of calls:', handleLikesMock.mock.calls.length); // Add this line for logging

    // Expect that the mock handler was called twice
    expect(handleLikesMock).toHaveBeenCalledTimes(2);
});