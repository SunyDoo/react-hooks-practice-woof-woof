import React, { useState } from "react";

function Dog({ dog, good, id, patchGood }) {
    const [isGood, setIsGood] = useState (good)

    function handleClick(){
        setIsGood(isGood=>!isGood)
        patchGood(dog)
        // console.log(dog)
    }

  
  return (
    <div>
        <img src={dog.image} alt={dog.name} />
        <h2>{dog.name}</h2>
        <button onClick={handleClick}>{isGood? "Good Dog!" : "Bad Dog!"}</button>
    </div>
  );
}

export default Dog;
