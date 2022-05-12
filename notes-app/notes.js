const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) { // no duplicates found safe to add

        notes.push({ // push new note
            title: title,
            body: body
        })

        saveNotes(notes); // save note
        console.log(chalk.green("Your note added successfully :)"));

    } else {
        console.log(chalk.red("Note title already taken :("));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const updatedNotes = notes.filter((note) => note.title !== title);

    if (notes.length > updatedNotes.length) { // note to be deleted found
        console.log(chalk.green("Note Removed !"));
        saveNotes(updatedNotes);
    } else {
        console.log(chalk.red("No note found"));
    }

}

const listNotes = () => {

    console.log(chalk.magenta.inverse("Your notes"));

    const notes = loadNotes();
    notes.forEach(note => {
        console.log(note);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);
    if (foundNote) {
        console.log(chalk.yellowBright.inverse(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red.inverse("No note found"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('./notes.json', dataJSON);
}


const loadNotes = () => {
    try {
        const bufferData = fs.readFileSync('./notes.json'); // read buffer data
        const dataJSON = bufferData.toString(); // convert to string
        return JSON.parse(dataJSON); // convert string to javascript obj
    } catch (e) {
        return []; // no file exist,  so no data exist
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};