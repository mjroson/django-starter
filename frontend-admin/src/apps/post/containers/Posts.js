import React from 'react';

const Posts = (props) => {
    return (
        <div>
            <h1>Posts</h1>
            <p>{JSON.stringify(props)}</p>
            {props.objects.results.map((el) => {
                return(<p>{el.title}</p>)
            })}
        </div>
    )
}

export default Posts;