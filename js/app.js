const creat = document.getElementById('create-note');
const container = document.querySelector(".container");

function createNote() {
    const div = document.createElement('div');
    div.classList.add('notes');
    div.innerHTML = `
        <input type="text" class="input">
        <div class="img">
            <img src="../img/Pencil.png" class="edit" alt="">
            <img src="../img/Trash.png" class="trash" alt="">
        </div>
    `;
    container.appendChild(div);

    const trash = div.querySelector('.trash');
    trash.addEventListener('click', e => {
        e.preventDefault();
        div.remove();
        saveNotes();
    });

    const input = div.querySelector('.input');
    input.value = "this is note";
    const edit = div.querySelector('.edit');
    edit.addEventListener('click', e => {
        e.preventDefault();
        input.focus();
        input.select();
    });

    saveNotes();
}

function saveNotes() {
    const notes = [];
    const noteElements = document.querySelectorAll('.notes');
    noteElements.forEach(note => {
        const input = note.querySelector('.input');
        notes.push(input.value);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        notes.forEach(noteContent => {
            const div = document.createElement('div');
            div.classList.add('notes');
            div.innerHTML = `
                <input type="text" class="input" value="${noteContent}">
                <div class="img">
                    <img src="../img/Pencil.png" class="edit" alt="">
                    <img src="../img/Trash.png" class="trash" alt="">
                </div>
            `;
            container.appendChild(div);

            const trash = div.querySelector('.trash');
            trash.addEventListener('click', e => {
                e.preventDefault();
                div.remove();
                saveNotes();
            });

            const edit = div.querySelector('.edit');
            edit.addEventListener('click', e => {
                e.preventDefault();
                const input = div.querySelector('.input');
                input.focus();
                input.select();
            });
        });
    }
}

creat.addEventListener('click', createNote);
window.addEventListener('load', loadNotes);
