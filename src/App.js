import React, {useEffect, useState} from "react";
import PostList from "./componets/PostList";
import './styles/App.css'
import PostForm from "./componets/PostForm";
import PostFilter from "./componets/PostFilter";
import MyModal from "./componets/UI/MyModal/MyModal";
import MyButton from "./componets/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./componets/UI/Loader/Loader";


function App() {

    const [posts, setPosts] = useState([])
    const [isPostsLoading, setIsPostsLoading] = useState(false)
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [visible,setVisible] = useState(false)


    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    async function fetchPosts() {
        setIsPostsLoading(true)
        setTimeout(async  () => {
            const posts = await PostService.getAll()
            setPosts(posts)
            setIsPostsLoading(false)
        }, 1000)
    }

    useEffect(() => {
        fetchPosts()
    }, [] )

    const removePost = (targetPost) => {
        setPosts(posts.filter(p => p.id !== targetPost.id))
    }
    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setVisible(false);
    }
    return (
    <div className="App">
        <MyButton style={{marginTop: 30}} onClick={() => setVisible(true)}>
            Создать пользователя
        </MyButton>
        <MyModal visible={visible} setVisible={setVisible}>
            <PostForm create={createPost}/>
        </MyModal>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter filter={filter} setFilter={setFilter}/>
        {isPostsLoading
            ? <div style={{display: 'flex', justifyContent: 'center',marginTop: 50 }}><Loader/></div>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список языков"}/>
        }
        </div>
    );
}

export default App;
