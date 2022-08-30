<script lang="ts">
  import { TasksCollection } from '/imports/db/TasksCollection';
  import { Meteor } from 'meteor/meteor';
  import Task from './Task.svelte';
  import TaskForm from './TaskForm.svelte';
  import LoginForm from './LoginForm.svelte';

  let hideCompleted = false;
  const setHideCompleted = (value: boolean) => {
    hideCompleted = value;
  };

  const hideCompletedFilter = { isChecked: { $ne: true } };

  let incompleteCount;
  let pendingTasksTitle = '';
  let tasks: any[] = [];

  let user: Meteor.User | null = null;

  let isLoading = true;
  const handler = Meteor.subscribe('tasks');

  $m: {
    user = Meteor.user();

    if (user) {
      isLoading = !handler.ready();

      const userFilter = { userId: user._id };
      const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

      tasks = TasksCollection.find(hideCompleted ? pendingOnlyFilter : userFilter, { sort: { createdAt: -1 } }).fetch();

      incompleteCount = TasksCollection.find(pendingOnlyFilter).count();

      pendingTasksTitle = `${incompleteCount ? ` (${incompleteCount})` : ''}`;
    }
  }
  const logout = () => Meteor.logout();
</script>

<div class="app">
  <header>
    <div class="app-bar">
      <div class="app-header">
        <h1 class="text-3xl text-indigo-800">📝️ To Do List {pendingTasksTitle}</h1>
      </div>
    </div>
  </header>

  <div class="main">
    {#if user}
      <div class="user" on:click={logout}>
        {user.username} 🚪
      </div>
      <TaskForm />

      <div class="filter">
        <button on:click={() => setHideCompleted(!hideCompleted)}>
          {hideCompleted ? 'Show All' : 'Hide Completed'}
        </button>
      </div>

      {#if isLoading}
        <div class="loading">loading...</div>
      {/if}
      <ul class="tasks">
        {#each tasks as task (task._id)}
          <Task {task} />
        {/each}
      </ul>
    {:else}
      <LoginForm />
    {/if}
  </div>
</div>
