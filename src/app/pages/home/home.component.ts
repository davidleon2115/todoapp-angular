import { Task } from './../../models/taks.model';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id : Date.now(),
      title: 'Crear Proyecto',
      completed: false
    },
    {
      id : Date.now(),
      title: 'Crear Componentes',
      completed: false
    }
  ])

  filter = signal('all');

  newTaskCtrl = new FormControl('', {
      nonNullable : true,
      validators: [
        Validators.required
      ]
    }
  );

  changeHandler() : void {
    // const input : HTMLInputElement = event.target as HTMLInputElement;
    // const newTask : string = input.value;
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim() as string;
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
    // input.value = "";
  }

  addTask(title : string) : void {
    const newTask = {
      id : Date.now(),
      title,
      completed : false
    }
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deteleTask(index : number) : void {
    this.tasks.update((tasks) => tasks.filter((task, position ) => index !== position));
  }

  updateTask(index : number) {
    this.tasks.update((task) => {
      return task.map((task, position) => { 
        if(index === position) { 
          return { 
            ...task, 
            completed : !task.completed
          }
        }
        return task;
      })
    })

  }

  editTaskClass(index : number) {
    this.tasks.update((prevTask) => {
      return prevTask.map((task, position) => { 
        if(index === position) { 
          return { 
            ...task, 
            editing : true
          }
        }
        return task;
      })
    })
  }

  editTaskText(index : number, event : Event) {
    const input : HTMLInputElement = event.target as HTMLInputElement
    this.tasks.update((prevTask) => {
      return prevTask.map((task, position) => { 
        if(index === position) { 
          return { 
            ...task, 
            title : input.value,
            editing : false
          }
        }
        return task;
      })
    })
  }

  changeFilter(filter : string) {
    this.filter.set(filter)
  }
}
