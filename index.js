let myLead = []
const btnEl = document.getElementById("btn-el")
const inputEl = document.getElementById("txt-el")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
const btnDel = document.getElementById("btn-del") 
const btnTab = document.getElementById("btn-tab")


if (leadsFromLocalStorage){
    myLead = leadsFromLocalStorage
    render()
}

btnTab.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLead.push(tabs[0].url)
        myLead.push(tabs)
        localStorage.setItem("myLead", JSON.stringify(myLead))
        render()

})})


btnDel.addEventListener("dblclick", function(){
    localStorage.clear()
    myLead = []
    render()
})

btnEl.addEventListener("click", function(){
    myLead.push(inputEl.value)
    localStorage.setItem("myLead", JSON.stringify(myLead))
    inputEl.value = ""
    render()
    
})


function render(){
    let listItems = ''
    
    for (let i =0; i <myLead.length; i++){
        //  listItems += "<li><a target='blank' href ='"+ myLead[i] + "'>" + myLead[i] + "</a></li>"
        listItems += `
                    <li>
                        <a target ="_blank" href = ${myLead[i]}>
                        ${myLead[i]}
                        </a>
                    </li>
                    `
    }
    ulEl.innerHTML = listItems
}
