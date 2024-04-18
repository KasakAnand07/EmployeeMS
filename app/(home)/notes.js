import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from "react-native";
import axios from "axios";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://192.168.29.173:8000/api/notes');
      console.log('Response:', response.data); // Log response data
      if (Array.isArray(response.data)) {
        setNotes(response.data);
      } else {
        console.error('Invalid response format: expected array of notes');
        // Handle error state here if needed
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      // Handle error state here if needed
    } finally {
      setLoading(false); // Update loading state regardless of success or failure
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://192.168.29.173:8000/api/notes/${id}`);
      console.log("Note deleted successfully");
      fetchNotes(); // Refresh notes list after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const addNote = async () => {
    try {
      const response = await axios.post(
        "http://192.168.29.173:8000/api/notes",
        { title, content }
      );
      console.log("Note added:", response.data);
      setTitle("");
      setContent("");
      fetchNotes(); // Refresh notes list
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const editNote = (id) => {
    // Logic to navigate to the edit screen for the selected note
    console.log("Edit note:", id);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Content"
        value={content}
        onChangeText={(text) => setContent(text)}
        multiline
      />
      <Button title="Add Note" onPress={addNote} />
      <ScrollView style={styles.notesContainer}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <View key={note._id} style={styles.note}>
              <View style={styles.noteContentContainer}>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteContent}>{note.content}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Delete" onPress={() => deleteNote(note._id)} color="#ff6347" />
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noNotesText}>No notes found</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a2add0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  loadingText: {
    fontSize: 18,
    color: "#808080",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  contentInput: {
    height: 80,
  },
  notesContainer: {
    marginTop: 20,
    width: "100%",
  },
  note: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noteContentContainer: {
    flex: 1,
  },
  noteTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000080",
  },
  noteContent: {
    color: "#000",
  },
  buttonContainer: {
    marginLeft: 10,
  },
  noNotesText: {
    color: "#808080",
  },
});
