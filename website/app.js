/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear());
// Declare the URL & APIKEY
const baseURL = `http://api.openweathermap.org/data/2.5/forcecast?zip=`;
const  apiKey = ',&appid=e37416068760412f56549eb74291e31a';
//Declare the elemnt that will change in UI
let myDate = document.getElementById('date') ;
let myTemp =  document.getElementById('temp');
let myFeeling = document.getElementById('content');
//Declare the btn that will generate the action.
let generateBtn = document.getElementById('generate');


generateBtn.addEventListener('click',  (e)=> {
// becuse (type="submit") can affect 
  e.preventDefault();
// Geeting the values of zip &  feeling
  const newZip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

    getWeather(newZip)
      .then( (data) =>{
        //Add Data
        postData('/add' , {date:newDate, temp:data.main.temp, content:feelings});
        //Updating the UI
        updateUI()
      })     
});

// Async GET
const getWeather = async (newZip) => {
  const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${newZip},&appid=e37416068760412f56549eb74291e31a`)
      try{
          const data = await req.json();
          return data;
      } catch(error) {
          console.log("error",error);
      }
}

// Async POST
const postData = async ( url = '', data = {})=>{
            
  const res = await fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

  try {
    const newData = await res.json();
           return newData
  }catch(error) {
    // appropriately handle the error
    console.error("error", error);
  }
}







// Upadating Ui using DOM API'S
const updateUI = async () => {
  const requestUI = await fetch('/all');
  try{
    const allData = await requestUI.json();
    myDate.innerHTML = `Date: ${allData.date} 📅`;
    myTemp.innerHTML = `Temperature: ${(allData.temp-273.15).toFixed(2)} C^🌡️`;
    myFeeling.innerHTML = `I'm feeling : ${allData.content} 🗣️`;
  }
    catch(error){
      console.error("error", error);
    }
};
