// Show lesson on website 
fetch('https://openapi.programming-hero.com/api/levels/all')
.then(res => res.json())
.then((data) => showLesson(data.data))

// show lesson function In The container Lesson Button Create By API Call
function showLesson(data){
 const lessonNameShow = document.getElementById("lesson_cotainer")
//  console.log(data)
for(let lesson of data){
    const newButton = document.createElement("button");
    newButton.innerHTML= `
    <button id="btn-${lesson.level_no}" onclick="showLevelContain(${lesson.level_no})" class="text-[#422AD5] border-1 py-1 px-2 rounded-sm flex gap-1 items-center cursor-pointer  hover:bg-[#6c5bc7] hover:text-white"><i class="fa-solid fa-book-open text-ellipsis-[#00BCFF]"></i>Lesson-${lesson.level_no}</button>
    `
    lessonNameShow.append(newButton)
}
}


// Lesson is sort by name of the id and show the Details 
const showLevelContain=(level_number) =>{
  showLoader()
const url =`https://openapi.programming-hero.com/api/level/${level_number}`
fetch(url)
.then(res =>res.json())
.then((data) => {
           removeButtonPreviousColor()
          // get Button By id Code  and add a new class by add by press key
          const clickButtonId = document.getElementById(`btn-${level_number}`);
          clickButtonId.classList.add("button_active");
          showCard(data)
})
}


// ALL Card SHow Here Details 
function showCard(levelData){
const cardAddContainer = document.getElementById('word_card_details')
//
// Before Date empty from the webpage  //
//
// console.log(levelData.data[0].id);
cardAddContainer.innerHTML = "";
if(levelData.data.length == 0){
    cardAddContainer.innerHTML=`
          <div class="grid justify-center items-center col-span-3">
        <div class="grid justify-items-center"><img class="w-[200px]" src="assets/caution.webp" alt="">
          <h1 class="text-center my-2 opacity-60">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
          <p class="text-[35px] font-semibold">নেক্সট Lesson এ যান</p></div>
      </div>
    `
    removeLoader()
    return;
}
// Loop here continue 
for(let dataDetails of levelData.data){
const cardWebsite = document.createElement("div")
// console.log(dataDetails)
cardWebsite.innerHTML=`
    <div class="card  text-neutral-content w-auto text-black bg-white m-5">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-[25px]">${dataDetails.word}</h2>
          <p>Meaning /Pronounciation</p>
          <h2 class="card-title opacity-70">${dataDetails.meaning == null ? `<span class="font-semibold">অর্থ নেই</span>` : dataDetails.meaning} / ${dataDetails.pronunciation}</h2>
          <div class="flex gap-40 mt-[30px]">
            <button onclick="showWordDetails('${dataDetails.id}')"><i class="fa-solid fa-circle-info text-xl bg-[#1A91FF1A] p-2 rounded-sm cursor-pointer"></i></button>
            <button onclick="readText('${dataDetails.word}')"><i class="fa-solid fa-headphones text-2xl bg-[#1A91FF1A] p-2 rounded-sm cursor-pointer"></i></button>
          </div>
        </div>
      </div>
`
cardAddContainer.append(cardWebsite)
    }
    removeLoader()
}
//-------------------------------------------------------------------------------
// Use sound Code Here ---------------------------
//-------------------------------------------------------------------------------
function readText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
  // alert(`Reading: ${text}`);
}
//------------------------------------------------------------------------------------------------------
// -------------------------------------Word Details Part Here ----------------------
//------------------------------------------------------------------------------------------------------

function  showWordDetails(value_ID){
const url=`
https://openapi.programming-hero.com/api/word/${value_ID}`
// console.log(url)
fetch(url)
.then(res=>res.json())
.then((data) =>showContain(data))
}

const showContain =(value) =>{
document.getElementById('wordDetailsContainer').showModal()
const wordDetails = document.getElementById('detailsContainer')
wordDetails.innerHTML=`
<div>
<form method="dialog">
<div class="border-2 border-[#EDF7FF] p-2 rounded-lg">
<h3 class="text-lg font-bold">${value.data.word}(<i class="fa-solid fa-microphone text-2xl"></i> : ${value.data.pronunciation})</h3>
<h1 class="mt-2">Meaning</h1>
<h2>${value.data.meaning == null ? `<span class="font-bold">অর্থ পাওয়া যায়নি</span>` :value.data.meaning}</h2>
<p class="font-bold mt-2">Example</p>
<h1>${value.data.sentence}</h1>
<h2 class="font-bold mt-2">সমার্থক শব্দ গুলো</h2>
<div class="flex">${value.data.synonyms.length >0 ? value.data.synonyms.map((synonym) =>
`<p class="  bg-[#EDF7FF] text-black rounded-md mr-2 py-1 px-2">${synonym}</p>`).join('') : `<p class="  bg-[#EDF7FF] text-black rounded-md px-2 py-1">No synonym</p>`
}</div>
</div>
<button class="btn  bg-[#422AD5] text-white mt-3 rounded-lg">Complete Learning</button>
</form>
</div>
`;
};


// Active Button and Given Style Code Here 

//Remove button Previous Selected Color -----------------
function removeButtonPreviousColor() {
  const removeActive = document.getElementsByClassName("button_active");
  for (let removeBTN of removeActive) {
    removeBTN.classList.remove("button_active");
  }
}

// Loader Code icon 
const showLoader = () =>{
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById('word_card_details').classList.add("hidden")
}
const removeLoader = () =>{
  document.getElementById("loader").classList.add("hidden");
  document.getElementById('word_card_details').classList.remove("hidden")
}