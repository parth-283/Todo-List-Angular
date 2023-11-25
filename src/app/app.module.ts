import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoComponent } from './todo/todo.component';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, TodoComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, CommonModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
