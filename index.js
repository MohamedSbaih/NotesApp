//! Define main variable 
const addBtn = document.querySelector('#add-btn');
// let noteCounter = document.querySelector('#note-counter');
const noteTitle = document.querySelector('#note-title');
const noteText = document.querySelector('#note-text');
const notes = document.querySelector('#notes');
const del = document.querySelector('#delete-btn');
// ?Add Functionality to ADD BUTTON
addBtn.addEventListener('click', () =>{
    myObj = {
        title : noteTitle.value,
        text : noteText.value,
        // counter: noteCounter.value
    }

    if(myObj.title == "" || myObj.text == ""){
        return alert("Enter Note title and Note details")
    }
    let index = checkLocalStorage().length;
    createNotes(myObj,index)
    storeLocalStorage(checkLocalStorage())
    myObj.title = "";
    myObj.text = "";

})
document.addEventListener('DOMContentLoaded', getLocalStorageOnUpLoad)

//? Function to create new note
function createNotes(text,index){
    let num = index + 1
    let note = document.createElement('div')
    note.setAttribute('id','note')
    notes.appendChild(note)

    let paragraph = document.createElement("p")
    paragraph.classList.add('note-counter')
    paragraph.textContent = 'Note '+ num
    note.appendChild(paragraph)

    let noteTitle = document.createElement("h3")
    noteTitle.classList.add('note-title')
    noteTitle.textContent = text.title
    note.appendChild(noteTitle)

    let noteText = document.createElement("p")
    noteText.classList.add('note-text')
    noteText.textContent = text.text
    note.appendChild(noteText)

    let deleteBtn = document.createElement("button")
    deleteBtn.setAttribute('id','delete-btn')
    note.appendChild(deleteBtn)
    let spanDeleteBtn = document.createElement("span")
    spanDeleteBtn.classList.add('material-icons-sharp')
    spanDeleteBtn.textContent = 'delete'
    deleteBtn.appendChild(spanDeleteBtn);
    
    let editBtn = document.createElement("button")
    editBtn.setAttribute('id','edit-btn')
    note.appendChild(editBtn)
    let spanEditBtn = document.createElement("span")
    spanEditBtn.classList.add('material-icons-sharp')
    spanEditBtn.textContent = 'edit_note'
    editBtn.appendChild(spanEditBtn);

    deleteBtn.addEventListener('click',(e)=>{
        notes.removeChild(note)
        deleteNote(index)
       

    })
    editBtn.addEventListener('click',(e)=>{
        alert(index)
        editNote(index)

    })

}

//? Function to return note object that contain all data as array in localstorage
function checkLocalStorage(){
    let notes = localStorage.getItem('notes');
    let noteObj;
    if(notes == null){
        noteObj = []
        return noteObj;
    }else {
        noteObj = JSON.parse(notes)
        return noteObj
    }
}

//? Function to save data in localstorage
function storeLocalStorage(noteObj){
    let myObj = {
        title:noteTitle.value,
        text:noteText.value
    }
    noteObj.push(myObj)
    localStorage.setItem('notes', JSON.stringify(noteObj))

}

//? Function to get data in localstorage when upload page
function getLocalStorageOnUpLoad(){
    let notes = checkLocalStorage()
    notes.forEach((note,index) =>{
        createNotes(note,index)
    })
}

// ?Function to delete note
function deleteNote(index){
    let confirmDel = confirm("Are you deleting this note?!!")
    if(confirmDel == true){
        notesObj = checkLocalStorage();
        notesObj.splice(index,1)
        localStorage.setItem('notes', JSON.stringify(notesObj))
        notesObj = checkLocalStorage();

    }
   
}

//? Function to edit note
function editNote(index){
    if(noteTitle.value !=='' || noteText.value !==''){
        return alert("Please clear the form before editing a note")
    }
    noteObj = checkLocalStorage()
    noteObj.findIndex((element,index)=>{
        noteTitle.value =element.title
        noteText.value = element.text
    })
    noteObj.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(noteObj))

}