import React from "react";
import "./postitemcard.css";

const PostItemCard = ({
  postDate,
  description,
  imgSrc,
  authorImg,
  authorName,
}) => {
  const hasImageToRender = () => {
    if (imgSrc != null) {
      return (
        <div className="bluring dimable image image-post">
          <img className="bluring dimable image" src={imgSrc} alt="" />
        </div>
      );
    }
  };
  return (
    <div className="ui card my-post-card">
      <div className="content">
        <div className="header">
          <div className="post-author">
            <img src={authorImg} alt="" />
            <h3>{authorName}</h3>
          </div>
          <h4 className="post-date">posted on: {postDate}</h4>
        </div>
        <div className="description">{description}</div>
        {hasImageToRender()}
        <div className="extra content">
          <span>
            <i className="heart outline like icon"></i>
            17 likes
          </span>
        </div>
      </div>
    </div>
  );
};
export default PostItemCard;
