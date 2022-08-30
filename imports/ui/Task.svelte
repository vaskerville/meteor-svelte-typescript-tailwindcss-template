<script lang="ts">
  export let task: any;

  const toggleChecked = () => Meteor.call('tasks.setIsChecked', task._id, !task.isChecked);

  const deleteThisTask = () => Meteor.call('tasks.remove', task._id);
</script>

<li>
  <input type="checkbox" readonly checked={!!task.isChecked} on:click={toggleChecked} />
  <span class="text-2xl bg-red-300">{task.text}</span>
  <button class="delete" on:click={deleteThisTask}>&times;</button>
</li>
