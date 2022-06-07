const listHelper = require('../utils/list_helper')

describe('the post with the most likes:', () => {
    const listOfBlogs = [
        {
          _id: '5a422aa71b54a676234d17f3',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 8,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f7',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 2,
          __v: 0
        }
    ]
  
    test('testing on a list of three blogs', () => {
      const result = listHelper.favoritePost(listOfBlogs)
      expect(result).toEqual({'__v': 0, '_id': '5a422aa71b54a676234d17f8', 'author': 'Edsger W. Dijkstra', 'likes': 8, 'title': 'Go To Statement Considered Harmful', 'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'})
    })
  })