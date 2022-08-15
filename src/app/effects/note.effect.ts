import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NoteService } from '../modules/notes/Services/note.service';
import * as NotesActions from '../actions/notes.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class NoteEffects {
  constructor(private action$: Actions, private noteService: NoteService) {}

  addNote$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotesActions.addNote),
      switchMap((action) => this.noteService.reqAddNote(action.note, action.idToken)),
      map((note) => NotesActions.addNoteSuccess({ note })),
      catchError(() => of(NotesActions.addNoteFailure()))
    )
  );

  getNotes$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotesActions.getNotes),
      switchMap((action) => this.noteService.reqGetNotes(action.idToken)),
      map((notes) => NotesActions.getNotesSuccess({ notes })),
      catchError(() => of(NotesActions.getNotesFailure()))
    )
  );
}
