import { Task } from './../../models/taks.model';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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

  changeHandler(event : Event) : void {
    const input : HTMLInputElement = event.target as HTMLInputElement;
    const newTask : string = input.value;
    this.addTask(newTask);
    input.value = "";
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
}
