import React, { useEffect, useState } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

function Feed() {
  const [posts, setPosts] = useState([]);
  const [date, setDate] = useState(Date.now());
  const [quantity, setQuantity] = useState(3); 
  const [newPosts, setNewPosts] = useState([]);

  useEffect(() => {
    let isCurrent = true;
    if (isCurrent) {
      loadFeedPosts(date, quantity).then(result => setPosts(result));
    };
    return () => {
      isCurrent = false;
    };
  }, [date, quantity]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  useEffect(() => {
    return subscribeToNewFeedPosts(date, setNewPosts)
  }, [date])

  return (
    <div className="Feed">
      {newPosts.length > 0 && (
        <div className="Feed_button_wrapper">
        <button onClick={() => {
          setDate(Date.now())
          setQuantity(quantity + newPosts.length)
        }} className="Feed_new_posts_button icon_button">
            View {newPosts.length} New Posts
          </button>
        </div>
      )}

      {posts.map(post => <FeedPost post={post} key={post.createdAt} />)}

      <div className="Feed_button_wrapper">
        <button onClick={() => setQuantity(quantity + 3)} className="Feed_new_posts_button icon_button">View More</button>
      </div>
    </div>
  )
}
