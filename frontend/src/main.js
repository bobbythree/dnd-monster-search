import './style.css'
import defaultImg from '../src/assets/img-not-avail.png'

//get html elememts
const form = document.getElementById('form');
const input = document.getElementById('input');
const output = document.getElementById('output');
const monsterPic = document.getElementById('monster-pic');
const picDiv = document.getElementById('pic-div');

//form event handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (input.value) {
    await fetchMonster(hyphenateStr(input.value));
    input.value = '';
  } else {
    alert('enter a monster name')
  } 
})

//call API for all monster data
async function fetchMonster(monsterName) {
  const url = `https://www.dnd5eapi.co/api/2014/monsters/${monsterName}`; 
  try {
     const response = await fetch(url, {
      method: 'GET',
      accept: 'application/json'
    }); 

    if (!response.ok) {
      alert('Monster not found, try again.')
      throw new Error('HTTP error!', response.status);
    }

    const results = await response.json();
    const monsterData = {
      name: results.name,
      type: results.type,
      alignment: results.alignment,
      armor_class: results["armor_class"][0].value, 
      HP: results.hit_points
    } 

    //clear prev data
    output.innerHTML = '';

    // call API for image
    const imgURL = `https://www.dnd5eapi.co/api/2014/images/monsters/${monsterName}.png`
    const imgResponse = await fetch(imgURL);
    // check if image exists
    if (imgResponse.ok) {
      monsterPic.src = imgURL;
      monsterPic.alt = `Picture of ${monsterName}`;
    } else {
      monsterPic.src = defaultImg;
      monsterPic.alt = 'image not available';
    }
    
    monsterPic.width = '500';
    picDiv.innerHTML = '';
    picDiv.appendChild(monsterPic);
    
    // display monster data 
    for(const [key, value] of Object.entries(monsterData)) {
      const li = document.createElement('li');
      li.innerHTML = `${key}: ${value}`;
      output.appendChild(li);
    }
    } catch (err) {
      console.error(err);
    }  
}


//utils
function hyphenateStr(str) {
  return str.trim().toLowerCase().replace(/\s+/g, '-');  
}

