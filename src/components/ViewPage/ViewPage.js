import React from "react";
import dateFormat from "libs/dateFormat";
import { Link } from "react-router-dom";
import TOC from "./TOC";
import AdjacentPost from "./AdjacentPost";
import UtterancesContainer from "containers/UtterancesContainer/UtterancesContainer";
import "./viewpage.scss";

function ViewPage({ post, html, toc, adj }) {

  // When the page is refreshed, go to the top of the page
  if (!html) {
    window.scrollTo(0, 0);
  }

  return (
    <div className="view-page">
      <div className="title">
        <Link to="/">{"{ Unknown }"}</Link>
      </div>
      <div className=" post-header">
        <h1 className="post-title">
          {post ? post.title : "Loading post..."}
        </h1>
        <div>
          <strong>
            {dateFormat(
              post ? new Date(post.date) : new Date(),
              true
            )}
          </strong>
          <Link to={`/categories/${post?.category}`}>
            <span className="text-muted" style={{ marginLeft: "1rem" }}>
              #{post?.category}
            </span>
          </Link>
        </div>
      </div>
      <div>
        <hr style={{ marginTop: "2rem" }}></hr>
      </div>
      <div className="container">
        <div id="toc"><TOC toc={toc}></TOC></div>
        {/* Content of post */}
        <div className={"blog-post " + (html ? '' : 'blog-post-loading')} dangerouslySetInnerHTML={{ __html: html }}></div>
        <div id="adjPosts">
          <div>
            {"← "}
            <AdjacentPost adj={adj[0]} />
          </div>
          <div>
            <AdjacentPost adj={adj[1]} next />
            {" →"}
          </div>
        </div>
        {/* Comment section */}
        <UtterancesContainer />
      </div>
    </div>
  );
}

export default ViewPage;