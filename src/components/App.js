import React, { useEffect, useState } from "react";
import DogList from "./DogList";
import Dog from "./Dog";

function App() {

  const[dogList, setDogList] = useState([])
  const[viewDog, setViewDog] = useState([])
  const[viewGood, setViewGood] = useState(true)


  
  useEffect(() => {
    fetch("http://localhost:3001/pups")
      .then((r) => r.json())
      .then((dogs) => setDogList(dogs));    
  }, []);


  function clickPic(selectedDog){
    const newDog = dogList.filter((dog) =>  {if(dog.name===selectedDog){
        return dog
      }else return null
    })    
    setViewDog(newDog)
  }

  function runPatch(updatedDog){
    fetch(`http://localhost:3001/pups/${updatedDog.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isGoodDog: !updatedDog.isGoodDog,
            })
          })   
          .then((r) => r.json())
          .then((updatedDog) => console.log(updatedDog))      
          console.log(viewDog)    
  }


  function filterDogs(){
    const dogsToDisplay = dogList.filter((dog) => dog.isGoodDog)
    setViewGood(viewGood=>!viewGood)
    if(viewGood){
      setDogList(dogsToDisplay)
    } else {
      fetch("http://localhost:3001/pups")
      .then((r) => r.json())
      .then((dogs) => setDogList(dogs));
    }     
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={filterDogs}>{!viewGood? "Filter good dogs: OFF" : "Filter good dogs: ON"}</button>
      </div>
      <div id="dog-bar">{
        dogList.map((dog) => (
          <DogList key={dog.id} dog={dog} toggleClick={clickPic} />
          ))            
        }
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {viewDog.map((dog) =>(
          <Dog key={dog.id} dog={dog} good={dog.isGoodDog} id={dog.id} patchGood={runPatch} />)) }
        </div>
      </div>
    </div>
  );
}

export default App;
