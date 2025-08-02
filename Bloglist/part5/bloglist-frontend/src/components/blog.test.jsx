/* eslint-disable quotes */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import { MemoryRouter } from 'react-router-dom'
import { expect, vi } from 'vitest'

test('only Blog title shown', () => {
  const blog = {
    title: 'Pekko',
    url: 'strayy',
    author: 'muumi',
    user: {
      username: 'test',
    },
  }

  render(
    <MemoryRouter>
      <Blog blog={blog} user={'test'} />
    </MemoryRouter>
  )

  screen.getByText('Pekko')
})

test('after View clicked all Blog information is shown', async () => {
  const blog = {
    title: 'Pekko',
    url: 'strayy',
    author: 'muumi',
    likes: 2,
    user: {
      username: 'testUser',
    },
  }

  render(
    <MemoryRouter>
      <Blog blog={blog} user={'testUser'} show={true}/>
    </MemoryRouter>
  )

  const user = userEvent.setup()
 

  screen.getByText('Pekko', { exact: false })
  screen.getByText('strayy', { exact: false })
  screen.getByText('muumi', { exact: false })
  screen.getByText('likes: 2', { exact: false })
})

test('after View clicked Blog is upvoted twice', async () => {
  const blog = {
    title: 'Pekko',
    url: 'strayy',
    author: 'muumi',
    likes: 2,
    user: {
      username: 'testUser',
    },
  }

  const mockClicker = vi.fn()

  render(
    <MemoryRouter>
      <Blog blog={blog} user={'testUser'} updateUpvote={mockClicker} show={true} />
    </MemoryRouter>
  )

  const user = userEvent.setup()
  

  const voteButton = screen.getByText('vote')
  await user.click(voteButton)
  await user.click(voteButton)

  expect(mockClicker.mock.calls).toHaveLength(2)
})

test('CreateBlog calls handler with right data', async () => {
  const mockClicker = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<CreateBlog handleCreation={mockClicker} />)

  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const save = screen.getByText('Create')

  await user.type(title, 'peikko')
  await user.type(author, 'Tester')
  await user.type(url, 'test.com')
  await user.click(save)

  expect(mockClicker.mock.calls).toHaveLength(1)
  expect(mockClicker.mock.calls[0][0].blog.title).toBe('peikko')
  expect(mockClicker.mock.calls[0][0].blog.author).toBe('Tester')
  expect(mockClicker.mock.calls[0][0].blog.url).toBe('test.com')
})
