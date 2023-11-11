const createBlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, handleSubmit
}) => (
  <>
    <h2>Create new blog</h2>
    <form onSubmit={handleSubmit}>
      <div>
            Title:
        <input
          type="text"
          value={title}
          name="Title"
          id="title"
          placeholder="Write title here"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
            Author:
        <input
          type="text"
          value={author}
          name="Author"
          id="author"
          placeholder="Write author here"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
            Url:
        <input
          type="text"
          value={url}
          name="Url"
          id="url"
          placeholder="Write url here"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <br></br>
      <button id="createSubmit" type="submit">Create</button>
    </form>
  </>
)

export default createBlogForm