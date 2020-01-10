import React, { useState } from 'react';
import styled from 'styled-components';
import standInFood from '../../images/foodArt.jpg';
import { Typography, Divider, Paper, ListItem, Button } from '@material-ui/core';
import EditMenuItem from './editForms/editmenuitem';


const Container = styled.section`

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    margin-bottom: 5%;
    
        

        .MuiPaper-root {

            flex-basis: 35vw;
            
            li {

            
                
                display: flex;
                flex-flow: column;
                margin-right: 3%;
                flex-wrap: nowrap;

                img {

                    max-width: 20vw;
                    max-height: 20vw;
                    min-width: 20vw;
                    min-height: 20vw;

                }  

               

            }

           

           
        }

`;





const MenuList = (props) => {

    const [focusedItem, setFocusedItem] = useState({
            name: "",
            description: "",
            price: ""
    });

    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = (e) => { 

        e.stopPropagation();
        setOpen(true);
    }

    const handleClose = value => {
        setOpen(false);
        
    }

    const clickItem = (e) => {

        const dropdownList = document.getElementsByClassName("dropdown");
        for ( let dropdown of dropdownList) {
            dropdown.style.display = "none";
        }   

        console.log();

        const parent = e.currentTarget.parentNode.parentNode;

        const item = props.items.filter( item => {
            return item.name === e.currentTarget.children[2].textContent 
        });

        
        setFocusedItem(item[0]);

        let indexOfNode = Array.prototype.indexOf.call(parent.childNodes, e.currentTarget.parentNode);
        let remainder = Math.floor(indexOfNode/3);
        let difference = indexOfNode - 3*remainder;
        
        difference % 2 !== 0 ? parent.children[indexOfNode + 1].style.display = "block" :  parent.children[indexOfNode + 2].style.display = "block";
        
    }
    

    return(<Container>
      {props.items.map( (item, index) => {

          
          return(
          
          <>
          <Paper >
            <ListItem onClick={clickItem}>
                
                
                    <img src={standInFood} alt="food"></img>
                    <Divider />
                    <Typography variant="caption">{item.name}</Typography>
                    <Typography>{item.price}</Typography>  
                    <Button  onClick={handleClickOpen}>Edit Food Item</Button>
                    <EditMenuItem catagory={props.catagory} id={item.id} open={open} onClose={handleClose}/>
            </ ListItem>
           
          </Paper>
          
          {index % 2 !== 0 ? (<div className="dropdown" style={{display: "none"}}>
                <Typography>{focusedItem.name}</Typography>
                <Typography>{focusedItem.price}</Typography>
                <Divider />
                <Typography>{focusedItem.description}</Typography>
          </div> 
          
          ) : null}
          </>)})}
          
          

          
          

         
       
          
    </Container>);
}

export default MenuList;