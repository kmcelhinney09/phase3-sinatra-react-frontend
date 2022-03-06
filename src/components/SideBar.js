import React, { useState, useEffect } from 'react'
import { Nav } from 'react-bootstrap'

function SideBar() {
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9292/categories`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setCategoryList(data)
            })
    }, [])
    
    return (
        <Nav defaultActiveKey="/home" className="flex-column">
            {categoryList.map(category => <Nav.Link key={category.id} href={`/category/${category.id}`}>{category.category_name}</Nav.Link>)}
        </Nav>
    )
}

export default SideBar