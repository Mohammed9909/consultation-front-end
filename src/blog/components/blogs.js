import React from 'react';
import { getAllBlogs, deleteBlogByID } from '../api';

import Blog from './blog';
import { Link } from 'react-router-dom';

class Blogs extends React.Component {
  componentDidMount() {
    getAllBlogs()
      .then((response) => {
        this.props.setBlogs(response.data.blogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteBlog = (id) => {
    deleteBlogByID(id, this.props.user)
      .then((response) => {
        const newBlogsList = this.props.blogs.filter((blog) => {
          return blog._id !== id;
        });

        this.props.setBlogs(newBlogsList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let allBlogs = <h2>No Blogs</h2>;

    if (this.props.blogs.length > 0) {
      allBlogs = this.props.blogs.map((blog, index) => {
        return <Blog 
        user={this.props.user}
        title={blog.title}
          author={blog.author}
          content={blog.content}
          id={blog._id}

          deleteBlog={this.deleteBlog}
          key={index} />;
      });
    }
    return (
      <div>
        <Link to='/blog/createBlog'> <button>Create Blog</button> </ Link>
        {allBlogs}
      </ div>
    );
  }
}

export default Blogs; 