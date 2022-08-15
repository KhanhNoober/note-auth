import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesModule } from './modules/notes/notes.module';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effect';
import { AuthService } from './Services/auth.service';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotesReducer } from './reducers/notes.reducer';
import { NoteEffects } from './effects/note.effect';
import { NoteService } from './modules/notes/Services/note.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    BrowserModule,
    AppRoutingModule,
    NotesModule,
    StoreModule.forRoot(
      {
        auth: AuthReducer,
        notes: NotesReducer,
      },
      {}
    ),
    EffectsModule.forRoot([AuthEffects, NoteEffects]),
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, HttpClient, NoteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
