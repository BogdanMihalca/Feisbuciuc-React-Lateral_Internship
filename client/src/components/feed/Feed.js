import React from "react";
import "./feed.css";
import api from "../../apis/api";
import profile from "../../images/profile.png";
import PostItemCard from "../postItemCard/PostItemCard";
import history from "../../history";

class Feed extends React.Component {
  state = {
    user: null,
    posts: [],
    descriptionText: "",
    chosenPhoto: {
      name: "",
      photo_object: null,
    },
  };

  getPostsFromApi = async () => {
    await api.getAllPosts().then((res) => {
      this.setState({ posts: [...this.state.posts, res.data.data] });
    });
  };

  /* here we call the api to fetch new posts*/
  componentDidMount() {
    this.setState(
      { user: JSON.parse(localStorage.getItem("LogedInUser")) },
      () => {
        if (this.state.user == null) history.push("/");
      }
    );
    this.getPostsFromApi();
  }

  // handler for loading a picture
  handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      this.setState({
        chosenPhoto: { name: e.target.files[0].name },
      });
      reader.addEventListener("load", () => {
        this.setState({
          chosenPhoto: {
            name: this.state.chosenPhoto.name,
            photo_object: reader.result,
          },
        });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  //Submiting a new post
  submitNewPost = (event) => {
    event.preventDefault();
    api
      .addNewPost({
        description: this.state.descriptionText,
        picture: this.state.chosenPhoto.photo_object,
        user_id: this.state.user._id,
      })
      .then(() => {
        history.push("/main");
      })
      .catch((err) => console.log(err));
  };

  renderNewPost() {
    return (
      <div className="add-new-post">
        <form className="ui form" onSubmit={this.submitNewPost}>
          <div className="inline field">
            <img className="profile-image" src={profile} alt="profile pic" />
            <input
              onChange={(e) => {
                this.setState({ descriptionText: e.target.value });
              }}
              type="text"
              placeholder="Whats on your mind dear feisbuciuc user?"
              name="description"
            />
          </div>
          <div className="add-post-bottom-buttons">
            <div className="file-input">
              <input
                type="file"
                id="file"
                className="file"
                onChange={this.handlePhotoChange}
              />
              <label htmlFor="file">
                <i className="upload icon" />
                upload image
                <p className="file-name"></p>
              </label>
              <span>File name:{this.state.chosenPhoto.name}</span>
            </div>
            <button className="ui blue button" type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }

  //method to generate new post cards
  renderPosts() {
    if (this.state.posts.length !== 0)
      return this.state.posts[0].slice(0).map((postItem) => {
        const hasImage = postItem.post_image ? postItem.post_image.url : null;
        return (
          <PostItemCard
            key={postItem.id}
            authorName={postItem.author.email}
            authorImg={postItem.author.profile_pic.url}
            description={postItem.description}
            postDate={postItem.createdAt}
            imgSrc={hasImage}
          />
        );
      });
    else
      return (
        <div className="ui inverted segment">
          <p></p>
          <div className="ui inverted divider"></div>
          <p></p>
          <h4 className="ui horizontal inverted divider">
            there are no post available
          </h4>
        </div>
      );
  }

  render() {
    return (
      <div className="ui container feed-page">
        {this.renderNewPost()}
        {this.renderPosts()}
      </div>
    );
  }
}
export default Feed;
