import React, {useEffect, useState} from "react";
import '../styles/App.css'
import {getPageCount} from "../utils/pages";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import {usePosts} from "../hooks/usePosts";
import MyButton from "../componets/UI/button/MyButton";
import MyModal from "../componets/UI/MyModal/MyModal";
import PostForm from "../componets/PostForm";
import PostFilter from "../componets/PostFilter";
import PostList from "../componets/PostList";
import Pagination from "../componets/UI/pagination/Pagination";
import Loader from "../componets/UI/Loader/Loader";



function Posts() {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [visible,setVisible] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const responce = await PostService.getAll(limit, page)
        setPosts(responce.data)
        const totalCount = responce.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })

    const changePage = (page) => {
        setPage(page)
    }

    useEffect(() => {
        fetchPosts()
    }, [page])

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
        {postError &&
            <h1>Произошла ошибка ${postError}</h1>
        }
        {isPostsLoading
            ? <div style={{display: 'flex', justifyContent: 'center',marginTop: 50 }}><Loader/></div>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список языков"}/>
        }
        <Pagination
            totalPages={totalPages}
            page={page}
            changePage={changePage}
        />
        </div>
    );
}

export default Posts;
