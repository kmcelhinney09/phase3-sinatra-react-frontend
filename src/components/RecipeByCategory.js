import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import RecipeCard from './RecipeCard'
import SideBar from './SideBar';
import { MDBRow } from 'mdb-react-ui-kit';
import { useParams } from "react-router-dom"

function RecipeByCategory() {
    let { categoryId } = useParams();
    
    const [recipeByCategory, setrecipeByCategory] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9292/categories/${categoryId}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setrecipeByCategory(data)
            })
    }, [categoryId])

    return (
        <div>
            
            <div className='d-flex'>
                <div className='p2 w-20'>
                    <SideBar />
                </div>
                <div className='p2 w-80'>
                    <MDBRow className='row-cols-1 row-cols-md-3 g-2' >
                        {recipeByCategory.map(recipe => <RecipeCard key={recipe.id}
                            recipe_name={recipe.recipe_name}
                            serving_size={recipe.serving_size}
                            cal_per_serving={recipe.cal_per_serving}
                            updated={recipe.updated_at}
                            img_url={recipe.img_url}
                            category_name={recipe.category.category_name}
                            ingredients_list={recipe.recipe_ingredients}
                        />)}
                    </MDBRow>
                </div>
            </div>
        </div>
    )
}

export default RecipeByCategory