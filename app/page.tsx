"use client";

import { useEffect, useState } from "react";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes
  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data: Note[] = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add note
  const addNote = async () => {
    if (!title || !content) return;

    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    fetchNotes();
  };

  // Edit note
  const editNote = async (note: Note) => {
    const newTitle = prompt("Edit title", note.title);
    const newContent = prompt("Edit content", note.content);

    if (!newTitle || !newContent) return;

    await fetch("/api/notes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: note._id,
        title: newTitle,
        content: newContent,
      }),
    });

    fetchNotes();
  };

  // Delete note
  const deleteNote = async (id: string) => {
    await fetch("/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchNotes();
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          📝 Notes App
        </h1>

        {/* Add Note */}
        <div className="mb-6">
          <input
            className="border border-gray-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border border-gray-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            onClick={addNote}
          >
            Add Note
          </button>
        </div>

        {/* Notes */}
        {notes.length === 0 && (
          <p className="text-center text-gray-500">
            No notes yet. Add one above 👆
          </p>
        )}

        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="border rounded-lg p-4 bg-gray-50 hover:shadow transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">
                    {note.title}
                  </h2>
                  <p className="text-gray-700 mt-1">
                    {note.content}
                  </p>
                </div>

                <div className="flex gap-2 mt-2">
  <button
    onClick={() => editNote(note)}
    className="px-3 py-1 text-sm rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
  >
    Edit
  </button>

  <button
    onClick={() => deleteNote(note._id)}
    className="px-3 py-1 text-sm rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
  >
    Delete
  </button>
</div>

              </div>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
