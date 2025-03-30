import './style.css'

const form = document.getElementById('form');
const input = document.getElementById('input');
const output = document.getElementById('output');
const monsterPic = document.getElementById('monster-pic');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetchMonster(hyphenateStr(input.value));
  input.value = '';
})

async function fetchMonster(monsterName) {
  const url = `https://www.dnd5eapi.co/api/2014/monsters/${monsterName}`; 
  try {
     const response = await fetch(url, {
      method: 'GET',
      accept: 'application/json'
    }); 

    if (!response.ok) {
      throw new Error('HTTP error!', response.status);
    }

    const results = await response.json();
    const monsterData = {
      name: results.name,
      type: results.type,
      alignment: results.alignment,
    } 

    //clear prev data
    output.innerHTML = '';

    //set monster image
    monsterPic.src = `https://www.dnd5eapi.co/api/2014/images/monsters/${monsterName}.png`;
    monsterPic.alt = `Picture of ${monsterName}`;
    monsterPic.width = '500';

    for(const [key, value] of Object.entries(monsterData)) {
      const li = document.createElement('li');
      li.innerHTML = `${key}: ${value}`;
      output.appendChild(li);
    }
    } catch (err) {
      console.error(err)
    }  
}


//utils
function hyphenateStr(str) {
  return str.trim().toLowerCase().replace(/\s+/g, '-');  
}
