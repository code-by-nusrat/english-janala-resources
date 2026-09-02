//7
const createElements=(array)=>{
    const htmlElement = array.map(el=>`<span class='btn'>${el}</span>`)
    return (htmlElement.join(" "))
}
//8
const manageSpinner=(status)=>{
    if(status===true){
        document.getElementById('spinner').classList.remove("hidden")
        document.getElementById('word-container').classList.add("hidden")
    }
    else{
        document.getElementById('word-container').classList.remove("hidden")
        document.getElementById('spinner').classList.add("hidden")
    }
}
//1
const loadLesson = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(url)//promise of response
        .then(res => res.json())//promise of json
        .then(json => displayLesson(json.data))
}

const removeActive=()=>{
    const lessonButtons = document.querySelectorAll('.lesson-btn')
    console.log(lessonButtons);
    lessonButtons.forEach(btn=>btn.classList.remove('active'))//remove all active class
}
//3
const loadLevelWord =(id)=>{
    //console.log(id)
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
   fetch(url)
   .then(res=>res.json())
   .then(data=>{
    removeActive();
    const clickBtn = document.getElementById(`lesson-btn-${id}`)
    // console.log(clickBtn)
    clickBtn.classList.add('active')// add active class

    displayLevelWord(data.data)
   })
}
// {
// "word": "Brisk",
// "meaning": "চটপটে / দ্রুত",
// "pronunciation": "ব্রিস্ক",
// "level": 3,
// "sentence": "He took a brisk walk in the morning.",
// "points": 3,
// "partsOfSpeech": "adjective",
// }

//5
const loadWordDetail=async(id)=>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`
    console.log(url)
    const res = await fetch(url)
    const details = await res.json();
    displayWordDetails (details.data);
}
//6
const displayWordDetails =(word)=>{
  console.log(word)
  const detailsBox = document.getElementById('details-container')
  detailsBox.innerHTML= `<div>
    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
</div>
<div>
    <h2 class="font-bold">Meaning</h2>
    <p>${word.meaning}</p>  
</div>
<div>
    <h2 class="font-bold">Examples</h2>
    <p>${word.sentence}</p>  
</div>
<div>
    <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
    <div class="">
    ${createElements(word.synonyms)}
    </div>
</div>
`
  document.getElementById('word_modal').showModal();
}
//4
const displayLevelWord=(words)=>{
  const wordContainer = document.getElementById('word-container')
  wordContainer.innerHTML=''
if(words.length ===0){
    wordContainer.innerHTML=` <div class='text-center col-span-full'>
            <img class="mx-auto" src="assets/alert-error.png" alt="">
            <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-[2rem] font-medium">নেক্সট Lesson এ যান</h2>
        </div>`
    return;
}
// {
//     "id": 82,
//     "level": 1,
//     "word": "Car",
//     "meaning": "গাড়ি",
//     "pronunciation": "কার"
// }
  words.forEach(word => {
    console.log(word);
    const card =document.createElement('div')
    card.innerHTML=`<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word:"it can't be found"}</h2>
            <p class="font-semibold">Meaning/Pronunciation</p>

            <div class="text-2xl font-medium font-bangla">${word.meaning ?word.meaning:'no meaning'} / ${word.pronunciation ? word.pronunciation:'invalid'}</div>
            <div class="flex justify-between items-center">
                <button onClick='loadWordDetail(${word.id})' class="btn  bg-[#1a52ff1a] hover:bg-[#1a52ffe6]"><i class="fa-solid fa-circle-info"></i></button>
                <button  class="btn bg-[#1a52ff1a] hover:bg-[#1a52ffe6]"><i class="fa-solid fa-volume-low"></i></button>
            </div>
        </div>`
    wordContainer.append(card);
  });
  manageSpinner(false)
}
//2
const displayLesson = (lessons) => {
    console.log(lessons)
    //1.get the container & empty
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = ''
    //2.get into every lesson
    for (const lesson of lessons) {
        //3.create element
        console.log(lesson)
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `<button id='lesson-btn-${lesson.level_no}' onClick= "loadLevelWord(${lesson.level_no})"class="btn lesson-btn text-[#422AD5] border-[#422AD5]"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
 `

        //4.append the child
        levelContainer.append(btnDiv)
    }

}
loadLesson();