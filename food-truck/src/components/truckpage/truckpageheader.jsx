import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import standInTruck from '../../images/delivery-truck-png-7.png';
import { Typography, Divider, Box, Icon, Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import EditTruck from './editForms/edittruck';
import { connect } from 'react-redux';
import { update } from '../../actions';


const Container = styled.section`

    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    img {

        max-width: 33vw;
        max-height: 33vw;
        min-width: 33vw;
        min-height: 33vw;
    }

    .MuiDivider-middle{

        width: 66%;
        margin-top: 5%;
    }

    .MuiButtonBase-root {

        margin: 5% 0;
    }

    div {

        margin-top: 5%;
        display: flex;
        justify-content: space-around;
        width: 80%;

        svg { 

            margin-top: 8%;
        }
    }

    #bottom-border{

        width: 100%;
        margin-top: 5%;
    }

`;


const TruckPageHeader = (props) => {

    const [value, setValue] = useState(3);
    const [favorite, setFavorite] = useState(false);
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        props.update();
        console.log(props);
        if (count < 3)
            setCount(count +1);
        console.log(props);
    },[count]);
    
    const handleClickOpen = () => { 
        setOpen(true);
    }

    const handleClose = value => {
        setOpen(false);
        
    }

    return(<Container>
        
        <img src={standInTruck} alt="truck"></img>
    <Typography>{props.truck.truckName}</Typography>
        <Button onClick={handleClickOpen}>Edit Truck</Button>
        <EditTruck open={open} onClose={handleClose} />
        <div>
            <Typography>{props.truck.cuisineType}</Typography>
            <Typography>{}</Typography>
        </div>
        <Divider variant="middle" />
        <div>
            {favorite ? (<FavoriteBorderIcon onClick={() => setFavorite(!favorite)} style={{ color: "red"}}></FavoriteBorderIcon>
            ) : ( 
            <FavoriteIcon onClick={() => setFavorite(!favorite)} style={{ color: "red"}} ></FavoriteIcon>)}
            
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Avg. Rating</Typography>
                <Rating
                name="read-only" value={value} readOnly />
            </Box>
        </div>
        <Divider id="bottom-border" />
        
    </Container>);
}

const mapStateToProps = state => {

    let truck = {};
    console.log(state);
    if (state.currentUser.Role === "Operator") {
        const id = window.location.pathname.split('/')[2];
        let trucks = state.currentUser.trucks.filter( truck => {
            return truck.id === id
        });
        truck = trucks[0];
        console.log(truck);
    }

        
    return {

        truck: truck
    }
}

export default connect(mapStateToProps, { update })(TruckPageHeader);