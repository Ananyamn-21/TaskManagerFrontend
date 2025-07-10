import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  @Input() task: Task | null = null;
  @Output() updated = new EventEmitter<void>();

  taskData: Task = {
    name: '',
    description: '',
    status: '',
    priority: 1
  };

  ngOnChanges(): void {
    this.taskData = this.task ? { ...this.task } : {
      name: '',
      description: '',
      status: '',
      priority: 1
    };
  }

  constructor(private taskService: TaskService) {}

  submitForm(): void {
    if (this.taskData.id) {
      this.taskService.updateTask(this.taskData).subscribe(() => this.updated.emit());
    } else {
      this.taskService.addTask(this.taskData).subscribe(() => this.updated.emit());
    }
    this.taskData = { name: '', description: '', status: '', priority: 1 };
  }
}
