const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  const likesArray = blogs.map((blog) => blog.likes);
  return likesArray.reduce((sum, likes) => sum + likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const favorite = blogs.find((blog) => blog.likes === maxLikes);

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}