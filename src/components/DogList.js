import React from "react";


function DogList({ dog, toggleClick }) {

    function handleClick(){
        toggleClick(dog.name)
        
    }

    return (
        <span onClick={handleClick}>{dog.name}</span>
    );
  }

export default DogList;
