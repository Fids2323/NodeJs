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


async function removeNote(NodeId){
    const notes = await getNotes()
    let notesNew = notes.filter(note=>{
      return +note.id !== NodeId.id
    })

    await  fs.writeFile(notesPath, JSON.stringify(notesNew))
    console.log(chalk.bgGreen('Node was deleted!'))
}


async function getNotes(){
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
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
    printNotes,
    removeNote
}