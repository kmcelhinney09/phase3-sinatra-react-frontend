import React from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function RecipeCard({ recipe_name, serving_size, updated, img_url, category_name, ingredients_list, cal_per_serving }) {

    function msToTime(ms) {
        let seconds = (ms / 1000).toFixed(1);
        let minutes = (ms / (1000 * 60)).toFixed(1);
        let hours = (ms / (1000 * 60 * 60)).toFixed(1);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + " Sec";
        else if (minutes < 60) return minutes + " Min";
        else if (hours < 24) return hours + " Hrs";
        else return days + " Days"
    }

    let timeSinceEdit = msToTime(Date.now() - Date.parse(updated))

    return (
        <MDBCol>
            <MDBCard style={{ maxWidth: '540px' }}>
                <MDBRow className='g-0'>
                    <MDBCol md='4'>
                        <MDBCardImage src={`${img_url}`} alt='Image of Food' fluid />
                    </MDBCol>
                    <MDBCol md='8'>
                        <MDBCardBody>
                            <MDBCardTitle>{recipe_name}</MDBCardTitle>
                            <MDBCardText>
                                {`Serving Size: ${serving_size} \n`}<br />
                                <small className='text-muted'>{`Cals per serving: ${cal_per_serving}`}</small>
                                <br />
                                <small className='text-muted'>{`Number of ingredients: ${ingredients_list.length}`}</small>
                            </MDBCardText>
                            <MDBCardText>
                                {`Food category: ${category_name}`}
                            </MDBCardText>
                            <MDBCardText>
                                <small className='text-muted'>{`Last Edited: ${timeSinceEdit} ago`}</small>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBCol>
    );
}

export default RecipeCard