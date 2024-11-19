import {PriorityTask, TaskManager, isLowOrCompletedTask, not} from './task.ts';

const user1 = {id: 1, name: 'Alice'};
const user2 = {id: 2, name: 'Bob'};

const taskManager = new TaskManager<PriorityTask>();

taskManager.add({
  title: 'テキストを読む',
  completed: false,
  user: user1,
  priority: 'high',
});

taskManager.add({
  title: '質問表を書く',
  completed: false,
  user: user1,
  priority: 'middle',
});

taskManager.add({
  title: '質問表を確認する',
  completed: false,
  user: user2,
  priority: 'low',
});

taskManager.add({
  title: '問題を作成する',
  completed: false,
  user: user2,
  priority: 'middle',
});

taskManager.completeTask(user1);
taskManager.completeTask('質問表を確認する');

console.log(taskManager.getTasks());
console.log(taskManager.getTasks(not(isLowOrCompletedTask)));
