import React from "react";
import PostItem from "./PostItems";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, title, remove}) => {
    if (!posts.length) {
        return  (
            <h2 style={{textAlign: "center"}}> Посты не найдены</h2>
        )
    }
    return (
        <div className="App">
        <h1 style={{textAlign:'center'}}> {title} </h1>
            <TransitionGroup>
                {
                    posts.map((post, index) =>
                        <CSSTransition
                            key={post.id}
                            timeout={500}
                            classNames={"post"}
                        >
                            <PostItem remove={remove} number={post.id} post={post}/>
                        </CSSTransition>
                    )
                }
            </TransitionGroup>
    </div>
    )
}
export default PostList;