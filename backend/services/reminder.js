import schedule, { cancelJob } from 'node-schedule'
import { Task } from '../models/task.model.js';
import { getMessaging } from 'firebase-admin/messaging';
import { initializeApp, cert } from 'firebase-admin/app';
import serviseAccount from "../fd.json" with { type: 'json' }

initializeApp({
    credential: cert(serviseAccount),
});

export const sendNotification = (task, user) => {
    const message = {
        notification: {
            title: 'Task Reminder',
            body: task,
        },
        token: user.deviceToken
    };


    getMessaging().send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
};




export const scheduleReminder = (id, task, time, user) => {
    try {
        const reminderDate = new Date(time)

        const jobname = task
        schedule.scheduleJob(jobname, reminderDate, async function () {
            let count = 0
            const maxDuration = 5
            const internal = setInterval(() => {
                sendNotification(task, user)
                count += 1
                if (count > maxDuration) {
                    cancelJob(jobname)
                    clearInterval(internal)
                }
            }, 10000)
            await Task.findByIdAndUpdate(id, { $set: { reminded: true } })
        })
    } catch (error) {
        console.error('Error scheduling reminder:', err)
    }
}