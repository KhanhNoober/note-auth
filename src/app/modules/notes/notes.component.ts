import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/states/auth.state';
import { NotesState } from 'src/app/states/note.state';
import { Note } from './models/note.model';
import { NoteService } from './Services/note.service';
import * as NotesActions from '../../actions/notes.action';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {

  currentAddingNote: Note = {
    id: '',
    title: '',
    description: '',
  }

  idToken: string = 'default';
  notes: Note[] = [];

  constructor(private store: Store<{ auth: AuthState, notes: NotesState }>, private noteService: NoteService) {}
  idToken$ = this.store.select((state) => state.auth.idToken);
  notes$ = this.store.select((state) => state.notes.notes);

  OnInit() {
  }

  reload() {
    this.store.dispatch(NotesActions.getNotes({ idToken: this.idToken }));
    this.notes$.subscribe();
  }

  deleteNote(note: Note) {
    this.store.dispatch(NotesActions.deleteNote({ note }));
    this.idToken$.subscribe(idToken => this.idToken = idToken);
    this.noteService.reqDeleteNote(note, this.idToken);
    this.notes$.subscribe();
  }

  addNote() {
    this.idToken$.subscribe(idToken => this.idToken = idToken);
    this.store.dispatch(NotesActions.addNote({ note: this.currentAddingNote, idToken: this.idToken }));
    this.notes$.subscribe();
    this.currentAddingNote = {
      id: '',
      title: '',
      description: '',
    }
  };

  ngOnInit(): void {}
}
