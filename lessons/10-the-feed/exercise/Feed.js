import React, { useEffect, useReducer } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

let feedState = null;

function Feed() {
  const [ state, dispatch ] = useReducer((state, action) => {
    switch(action.type) {
      case 'NEW_POSTS_LOADED': return {
        ...state,
        newPosts: action.newPosts
      }
      case 'LOAD_POSTS': return {
        ...state,
        posts: action.posts
      }
      case 'LOAD_NEW_POSTS': return {
        ...state,
        date: Date.now(),
        quantity: state.quantity + state.newPosts.length
      }
      case 'VIEW_MORE': return {
        ...state,
        quantity: state.quantity + 3
      }
      default: throw new Error(`Unknown action: ${action.type}`)
    }
  }, feedState || {
    posts: [],
    date: Date.now(),
    quantity: 3, 
    newPosts: []
  })

  useEffect(() => {
    feedState = state;
  })

  const { posts, date, quantity, newPosts } = state;

  useEffect(() => {
    let isCurrent = true;
    if (isCurrent) {
      loadFeedPosts(date, quantity).then(posts => dispatch({ type: 'LOAD_POSTS', posts }));
    };
    return () => {
      isCurrent = false;
    };
  }, [date, quantity]);

  useEffect(() => {
    return subscribeToNewFeedPosts(date, (newPosts) => {
      dispatch({ type: 'NEW_POSTS_LOADED', newPosts })
    })
  }, [date])

  return (
    <div className="Feed">
      {newPosts.length > 0 && (
        <div className="Feed_button_wrapper">
        <button onClick={() => {
          dispatch({ type: 'LOAD_NEW_POSTS' })
        }} className="Feed_new_posts_button icon_button">
            View {newPosts.length} New Posts
          </button>
        </div>
      )}

      {posts.map(post => <FeedPost post={post} key={post.createdAt} />)}

      <div className="Feed_button_wrapper">
        <button onClick={() => {
          dispatch({ type: 'VIEW_MORE' })
        }} className="Feed_new_posts_button icon_button">View More</button>
      </div>
    </div>
  )
}
