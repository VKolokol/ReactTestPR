import React, {useMemo, useState} from "react";
import PostList from "./componets/PostList";
import './styles/App.css'
import PostForm from "./componets/PostForm";
import PostFilter from "./componets/PostFilter";


function App() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'aJavaScript - язык программирования'},
        {id: 2, title: 'Python', body: 'zPython - язык программирования'},
        {id: 3, title: 'Java', body: 'vJava - язык программирования'}
        ]
    )

    const [filter, setFilter] = useState({sort: '', query: ''})



    const sortedPost = useMemo(() => {
        if(filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    },[filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPost.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))

    }, [filter.query, sortedPost])


    const removePost = (targetPost) => {
        setPosts(posts.filter(p => p.id !== targetPost.id))
    }
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }
    return (
    <div className="App">
        <PostForm create={createPost}/>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter filter={filter} setFilter={setFilter}/>
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список языков"}/>
    </div>
    );
}

export default App;
