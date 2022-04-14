import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../componets/UI/Loader/Loader";

const PostIdPages = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostById, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getCommentsByPostId(params.id)
        setComments(response.data)
    })

    const [fetchCommentsPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })
    useEffect(() => {
        fetchCommentsPostById(params.id)
        fetchPostById(params.id)
    }, [])

    return (
        <div>
            {isLoading ? <Loader/> :
                <div>
                    <h1> {post.title} </h1>
                    <div>
                        <h3> {post.body}</h3>
                    </div>
                </div>
            }

            <div style={{margin: '0 auto', width: 400}}>
                {isComLoading
                    ? <Loader/>
                    :<div> <h2> Комментарии </h2>
                        {comments.map(comment =>
                                <div style={{marginTop: 15}}>
                                    <h3>{comment.email} - {comment.name}</h3>
                                    <p>{comment.body}</p>
                                </div>
                            )
                        } </div>

                }

            </div>

        </div>
    );
};

export default PostIdPages;