const dummy = (blogs) =>{
    console.log(blogs)
    return 1
}

const totalLikes = (blogs) =>{
    return blogs.length === 1
    ? blogs[0].likes
    : blogs.reduce((a, b) => a + b.likes, 0)
}

const favoritePost = (blogs) => {
    return blogs.length === 1
    ? blogs[0]
    : blogs.find(blog =>{
        return blog.likes === Math.max(...blogs.map(blog => blog.likes))
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoritePost
}