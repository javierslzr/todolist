import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { ToDo } from '../models/to-do';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnChanges {
  @Input() todo: ToDo;
  @Output() removed = new EventEmitter<ToDo>();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  removable = true;

  constructor() {
  }
  ngOnChanges(changes: {[prop: string]: SimpleChange}) {
    if (changes.todo && !this.todo.subtasks) {
      this.todo.subtasks = [];
    }
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.todo.subtasks.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }


  remove(subtask: string) {
    const index = this.todo.subtasks.indexOf(subtask);
    this.todo.subtasks.splice(index, 1);
  }

  onRemove() {
    this.removed.emit(this.todo);
  }
}
