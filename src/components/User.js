import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import RecipeCard from './RecipeCard'
import SideBar from './SideBar';
import { MDBRow } from 'mdb-react-ui-kit';

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
    }, [user_id])

    return (
        <div>
            <div className='d-flex'>
                <div className='p2 w-20'>
                    <SideBar />
                </div>
                <div className='p2 w-80'>
                    <MDBRow className='row-cols-1 row-cols-md-3 g-2' >
                        {userRecipeBoxData.map(recipe => <RecipeCard key={recipe.id}
                            recipe_name={recipe.recipe_name}
                            serving_size={recipe.serving_size}
                            updated={recipe.updated_at}
                            img_url={recipe.img_url}
                            category_name={recipe.category.category_name}
                            ingredients_list={recipe.recipe_ingredients}
                            cal_per_serving={recipe.cal_per_serving}
                        />)}
                    </MDBRow>
                </div>
            </div>
        </div>
    )
}

export default User