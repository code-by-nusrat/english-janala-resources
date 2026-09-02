const createElements=(array)=>{
    const htmlElement = array.map(el=>`<span class='btn'>${el}</span>`)
    console.log(htmlElement.join(" "))
}
const synonyms =['hello', 'hi', 'jai']
createElements(synonyms)