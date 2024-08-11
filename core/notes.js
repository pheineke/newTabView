document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("addNote").onclick = addNote;
    document.getElementById("clearNotes").onclick = clearNotes;
    loadNotes();
});

function loadNotes() {
    const note_view = document.getElementById('note_view');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    note_view.innerHTML = ''; // Clear existing notes
    notes.forEach(note => {
        note_view.innerHTML += `
            <div id="note-${note.title}" class="note">
                <p>${note.content}</p>
                <button onclick="deleteNote(${note.title})">-</button>
            </div>`;
    });
    console.log('Notes loaded.');
}

function addNote() {
    const textContent = document.getElementById('note_input').value;
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    let nextId = 1;
    if (notes.length > 0) {
        const lastNote = notes[notes.length - 1];
        nextId = lastNote.title + 1;
    }

    const newNote = { title: nextId, content: textContent };
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();

    document.getElementById("note_input").value = "";

}

function clearNotes() {
    localStorage.removeItem('notes');
    document.getElementById('note_view').innerHTML = '';
    console.log('All notes cleared.');
}

function deleteNote(id) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.filter(note => note.title !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    loadNotes();
}
