const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      },
    ];

    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test('when list has more than one blog, equals the likes of the sum of them', () => {
    const listWithTwoBlogs = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      },
      {
        title: 'Sample Blog',
        author: 'James Doe',
        url: 'http://sampleblog.html',
        likes: 10,
      },
    ];

    const result = listHelper.totalLikes(listWithTwoBlogs);
    expect(result).toBe(15);
  });
});


describe('favorite blog', () => {
  test('when list has only one blog, returns that blog', () => {
    const listWithOneBlog = [
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
      },
    ];

    const result = listHelper.favoriteBlog(listWithOneBlog);
    const expectedBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };

    expect(result).toEqual(expectedBlog);
  });
  test('when list has more than one blog, returns the blog with more likes', () => {
    const listWithTwoBlogs = [
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
      },
      {
        title: 'Sample blog',
        author: 'James Doe',
        likes: 10,
      },
    ];

    const result = listHelper.favoriteBlog(listWithTwoBlogs);
    const expectedBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };

    expect(result).toEqual(expectedBlog);
  });
});


describe('most blog', () => {
  test('when list has only one blog, returns that author', () => {
    const listWithOneBlog = [
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
      },
    ];

    const result = listHelper.mostBlogs(listWithOneBlog);
    const expectedAuthor = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    };

    expect(result).toEqual(expectedAuthor);
  });
  test('when list has more than one blog, returns the author with more blogs', () => {
    const listWithThreeBlogs = [
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
      },
      {
        title: 'Sample blog',
        author: 'James Doe',
        likes: 10,
      },
      {
        title: 'Canonical string reduction Part 2',
        author: 'Edsger W. Dijkstra',
        likes: 18,
      },
    ];

    const result = listHelper.mostBlogs(listWithThreeBlogs);
    const expectedAuthor = {
      author: 'Edsger W. Dijkstra',
      blogs: 2,
    };

    expect(result).toEqual(expectedAuthor);
  });
});

