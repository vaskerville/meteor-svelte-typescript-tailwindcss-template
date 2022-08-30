import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function publishTasks(): any {
  return TasksCollection.find({ userId: this.userId });
});

