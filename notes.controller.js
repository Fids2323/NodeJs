const fs = require('fs/promises')
const path = require('path')
const chalk = require("chalk");

const notesPath = path.join(__dirname, 'db.json')


async function addNote(title){
    const notes = await getNotes()

    const note ={
        title,
        id: Date.now().toString()
    }
    notes.push(note)

  await  fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Node was added!'))
}


async function removeNote(id){
    const notes = await getNotes()
    const filtered = notes.filter((note) => note.id !== id);

    await  fs.writeFile(notesPath, JSON.stringify(filtered))
    console.log(chalk.bgGreen('Node was deleted!'))
}


async function getNotes(){
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function editNote(id,title) {
    const notes = await getNotes()
    const editNotes = notes.map((note)=>{
        if(note.id === id){
            note.title =title
        }
        return note
    })
    await  fs.writeFile(notesPath, JSON.stringify(editNotes))
    console.log(chalk.bgGreen('Node was edited!'))
}



async function printNotes(){
    const  notes = await getNotes()
    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach(note=>{
        console.log(chalk.blue(note.id), chalk.blue(note.title))
    })
}

module.exports = {
    addNote,
    getNotes,
    removeNote,
    editNote
}