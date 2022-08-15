import { createAction, props } from "@ngrx/store";
import { Note } from "../modules/notes/models/note.model";

export const getNotes = createAction('[Notes] Get Notes'
    ,props<{ idToken: string} >()
);
export const getNotesSuccess = createAction('[Notes] Get Notes Success', props<{ notes: Note[] }>());
export const getNotesFailure = createAction('[Notes] Get Notes Failure');
export const addNote = createAction('[Notes] Add Note'
    ,props<{ note: Note, idToken: string}>()
);
export const addNoteSuccess = createAction(
    '[Notes] Add Note Success',
    props<{ note: Note }>()
);
export const addNoteFailure = createAction(
    '[Notes] Add Note Failure',
);
export const deleteNote = createAction(
    '[Notes] Delete Note',
    props<{ note: Note }>()
);
export const deleteNoteLogout = createAction(
    '[Notes] Delete Note Logout',
);
