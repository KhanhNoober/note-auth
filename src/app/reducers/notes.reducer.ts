import { createReducer, on } from "@ngrx/store";
import { NotesState } from "../states/note.state";
import * as NotesActions from "../actions/notes.action";

const initialState: NotesState = {
    notes: [],
};

export const NotesReducer = createReducer(
    initialState,
    on(NotesActions.addNote, (state, action) => ({
        ...state,
    })),
    on(NotesActions.addNoteSuccess, (state, action) => ({
        ...state,
        notes: [...state.notes, action.note],
    })),
    on(NotesActions.addNoteFailure, (state) => ({
        ...state,
    })),
    on(NotesActions.deleteNote, (state, action) => {
        const notes = state.notes.filter((note) => note.id !== action.note.id);
        return {
            ...state,
            notes,
        };
    }),
    on(NotesActions.getNotes, state => state),
    on(NotesActions.getNotesSuccess, (state, action) => ({
        ...state,
        notes: action.notes,
    })),
    on(NotesActions.getNotesFailure, state => state),
    on(NotesActions.deleteNoteLogout, state =>
        ({
            ...state,
            notes: [],
            })
    ),
);
