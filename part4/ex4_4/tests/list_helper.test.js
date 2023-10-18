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
