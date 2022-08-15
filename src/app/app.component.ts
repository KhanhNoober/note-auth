import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './states/auth.state';
import * as AuthActions from './actions/auth.action';
import * as NotesActions from './actions/notes.action';
import { NotesState } from './states/note.state';
import { NoteService } from './modules/notes/Services/note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'NoteWithAuth';
  idToken: string = 'default';
  constructor(private store: Store<{ auth: AuthState, notes: NotesState }>, private noteService: NoteService) {}
  ngOnInit(): void {
    console.log('hello');
  }
  idToken$ = this.store.select((state) => state.auth.idToken);
  note$ = this.store.select((state) => state.notes.notes);

  login() {
    this.store.dispatch(AuthActions.login());
    this.idToken$.subscribe(idToken => {
      if(idToken !== '')
        this.reload(idToken);
    })
  }

  reload(idToken: string) {
    this.store.dispatch(NotesActions.getNotes({idToken: idToken}));
    this.note$.subscribe();
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.store.dispatch(NotesActions.deleteNoteLogout());
    this.note$.subscribe();
  }
}
