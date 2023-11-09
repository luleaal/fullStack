import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateBlogForm from './CreateBlogForm';
import userEvent from '@testing-library/user-event';

test('<CreateBlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn();
  const setTitle = jest.fn();
  const setAuthor = jest.fn();
  const setUrl = jest.fn();
  const user = userEvent.setup();

  render(<CreateBlogForm handleSubmit={createBlog} setTitle={setTitle} 
    setAuthor={setAuthor} setUrl={setUrl} title={'Testing title...'}
    author={'Testing author...'} url={'Testing url...'}/>);

  const titleInput = screen.getByPlaceholderText('Write title here');
  const authorInput = screen.getByPlaceholderText('Write author here');
  const urlInput = screen.getByPlaceholderText('Write url here');
  const sendButton = screen.getByText('Create');

  await user.type(titleInput, 'Testing title...');
  await user.type(authorInput, 'Testing author...');
  await user.type(urlInput, 'Testing url...');
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(titleInput.value).toBe('Testing title...');
});
