import React, { useState, useEffect } from 'react'

function User({ user_id, name }) {
const [userRecipeBoxData, setUserRecipeBoxData] = useState([])
    
    useEffect(() => {
        console.log(user_id)
        fetch(`http://localhost:9292/users/${user_id}/recipe_box`)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            setUserRecipeBoxData(data)
        })
    }, [])

    return (
        <div>
            {userRecipeBoxData.map(recipe => <p>{recipe.recipe_name}</p>)}
        </div>
    )
}

export default User