const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  notesContainer.innerHTML = "";

  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    const textarea = document.createElement("textarea");
    textarea.value = note;
    textarea.addEventListener("input", (e) => {
      notes[index] = e.target.value;
      saveNotes();
    });

    const actions = document.createElement("div");
    actions.className = "note-actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    };

    actions.appendChild(deleteBtn);
    noteDiv.appendChild(actions);
    noteDiv.appendChild(textarea);
    notesContainer.appendChild(noteDiv);
  });
}

addNoteBtn.addEventListener("click", () => {
  const text = noteText.value.trim();
  if (!text) return;

  notes.push(text);
  noteText.value = "";
  saveNotes();
  renderNotes();
});

renderNotes();
