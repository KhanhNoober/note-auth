import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note.model';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private http:HttpClient) {}

  reqAddNote(note: Note, idToken: string) {
    let noteResult = this.http.post<Note>('http://localhost:3000/notes/create/', note, {'headers' : {'Authorization' : idToken}});
    return noteResult;
  }

  reqDeleteNote(note: Note, idToken: string) {
    let code = this.http.post<string>('http://localhost:3000/notes/delete', note, {'headers' : {'Authorization' : idToken}});
    return code;
  }

  reqGetNotes(idToken: string) {
    let notes = this.http.get<Note[]>(`http://localhost:3000/notes/all`, {headers : {"Authorization" : idToken}});
    return notes;
  }
}
