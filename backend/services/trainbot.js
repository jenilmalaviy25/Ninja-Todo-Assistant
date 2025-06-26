const { createRequire } = await import('module');
const require = createRequire(import.meta.url);
const { NlpManager } = require('node-nlp');


const manager = new NlpManager({ languages: ['en', 'gu'], forceNER: true, nlu: { useNoneFeature: false, log: false } })

manager.addDocument('en', 'hello', 'greetings.hi');
manager.addDocument('en', 'hi', 'greetings.hi');
manager.addDocument('en', 'yo', 'greetings.hi');
manager.addDocument('en', 'hey', 'greetings.hi');
manager.addDocument('en', 'hey there', 'greetings.hi');
manager.addDocument('en', 'hi there', 'greetings.hi');
manager.addDocument('en', 'what’s up', 'greetings.hi');
manager.addDocument('en', 'hello there', 'greetings.hi');
manager.addDocument('en', 'namaste', 'greetings.hi');
manager.addDocument('en', 'good morning', 'greetings.hi');
manager.addDocument('en', 'good afternoon', 'greetings.hi');
manager.addDocument('en', 'good evening', 'greetings.hi');
manager.addDocument('en', 'hey dude', 'greetings.hi');
manager.addDocument('en', 'hello buddy', 'greetings.hi');
manager.addDocument('en', 'hi bot', 'greetings.hi');
manager.addDocument('en', 'what\'s good?', 'greetings.hi');
manager.addDocument('en', 'howdy!', 'greetings.hi');
manager.addDocument('en', 'yo assistant', 'greetings.hi');
manager.addDocument('en', 'sup buddy', 'greetings.hi');
manager.addDocument('en', 'hiiiii', 'greetings.hi');
manager.addDocument('en', 'hey ninja assistant', 'greetings.hi');
manager.addDocument('en', 'greetings!', 'greetings.hi');
manager.addDocument('en', 'hola assistant', 'greetings.hi');
manager.addDocument('en', 'hello from the other side', 'greetings.hi');
manager.addDocument('en', 'what’s going on', 'greetings.hi');
manager.addDocument('en', 'hiya!', 'greetings.hi');
manager.addDocument('en', 'oh hey', 'greetings.hi');
manager.addDocument('en', 'yo there!', 'greetings.hi');
manager.addDocument('en', 'hello AI', 'greetings.hi');
manager.addDocument('en', 'ninja bot, hi', 'greetings.hi');


manager.addDocument('en', 'how are you', 'user.ask.status');
manager.addDocument('en', 'how do you feel', 'user.ask.status');
manager.addDocument('en', 'are you okay', 'user.ask.status');
manager.addDocument('en', 'how are things', 'user.ask.status');
manager.addDocument('en', 'everything good?', 'user.ask.status');
manager.addDocument('en', 'you alright?', 'user.ask.status');
manager.addDocument('en', 'you doing fine?', 'user.ask.status');
manager.addDocument('en', 'are things okay with you?', 'user.ask.status');
manager.addDocument('en', 'how are you doing today', 'user.ask.status');
manager.addDocument('en', 'feeling good?', 'user.ask.status');
manager.addDocument('en', 'you up and running?', 'user.ask.status');
manager.addDocument('en', 'still alive, bot?', 'user.ask.status');
manager.addDocument('en', 'bot, are you well?', 'user.ask.status');
manager.addDocument('en', 'yo ninja, all fine?', 'user.ask.status');
manager.addDocument('en', 'everything chill on your end?', 'user.ask.status');
manager.addDocument('en', 'hope you’re not tired', 'user.ask.status');
manager.addDocument('en', 'is your system okay?', 'user.ask.status');
manager.addDocument('en', 'doing okay over there?', 'user.ask.status');


manager.addDocument('en', 'can you help me', 'user.ask.help');
manager.addDocument('en', 'i need help', 'user.ask.help');
manager.addDocument('en', 'help me', 'user.ask.help');
manager.addDocument('en', 'i have a problem', 'user.ask.help');
manager.addDocument('en', 'assist me', 'user.ask.help');
manager.addDocument('en', 'what can you do', 'user.ask.help');
manager.addDocument('en', 'i need some support', 'user.ask.help');
manager.addDocument('en', 'could you assist me?', 'user.ask.help');
manager.addDocument('en', 'one problem', 'user.ask.help');
manager.addDocument('en', 'can i get some help', 'user.ask.help');
manager.addDocument('en', 'do you know how to help?', 'user.ask.help');
manager.addDocument('en', 'can you guide me?', 'user.ask.help');
manager.addDocument('en', 'what can you help with?', 'user.ask.help');
manager.addDocument('en', 'show me what you can do', 'user.ask.help');
manager.addDocument('en', 'need a little help here', 'user.ask.help');
manager.addDocument('en', 'could you solve a problem for me?', 'user.ask.help');
manager.addDocument('en', 'help me understand this', 'user.ask.help');
manager.addDocument('en', 'tell me how to do it', 'user.ask.help');
manager.addDocument('en', 'walk me through this', 'user.ask.help');
manager.addDocument('en', 'assistant, I’m stuck', 'user.ask.help');
manager.addDocument('en', 'lost here, can you assist?', 'user.ask.help');


manager.addDocument('en', 'who are you', 'bot.identity');
manager.addDocument('en', 'what is your name', 'bot.identity');
manager.addDocument('en', 'why should you help me', 'bot.identity');
manager.addDocument('en', 'are you a bot', 'bot.identity');
manager.addDocument('en', 'tell me about yourself', 'bot.identity');
manager.addDocument('en', 'what can you tell me about you', 'bot.identity');
manager.addDocument('en', 'are you human', 'bot.identity');
manager.addDocument('en', 'describe yourself', 'bot.identity');
manager.addDocument('en', 'tell me who you are', 'bot.identity');
manager.addDocument('en', 'what are you called?', 'bot.identity');
manager.addDocument('en', 'do you have a name?', 'bot.identity');
manager.addDocument('en', 'what do people call you?', 'bot.identity');
manager.addDocument('en', 'are you a ninja?', 'bot.identity');
manager.addDocument('en', 'do you work for Naruto?', 'bot.identity');
manager.addDocument('en', 'you some kind of assistant?', 'bot.identity');
manager.addDocument('en', 'bot, what’s your origin?', 'bot.identity');


manager.addDocument('en', 'goodbye', 'greetings.bye');
manager.addDocument('en', 'bye', 'greetings.bye');
manager.addDocument('en', 'see you soon', 'greetings.bye');
manager.addDocument('en', 'take care', 'greetings.bye');
manager.addDocument('en', 'have a good day', 'greetings.bye');
manager.addDocument('en', 'farewell', 'greetings.bye');
manager.addDocument('en', 'peace out', 'greetings.bye');
manager.addDocument('en', 'i’m leaving', 'greetings.bye');
manager.addDocument('en', 'see you tomorrow', 'greetings.bye');
manager.addDocument('en', 'later', 'greetings.bye');
manager.addDocument('en', 'bye bot', 'greetings.bye');
manager.addDocument('en', 'assistant, I’m out', 'greetings.bye');
manager.addDocument('en', 'logging off now', 'greetings.bye');
manager.addDocument('en', 'talk to you later', 'greetings.bye');
manager.addDocument('en', 'done for today', 'greetings.bye');
manager.addDocument('en', 'shutting this down', 'greetings.bye');
manager.addDocument('en', 'that’s all for now', 'greetings.bye');
manager.addDocument('en', 'closing this app', 'greetings.bye');
manager.addDocument('en', 'we’ll chat again', 'greetings.bye');
manager.addDocument('en', 'gotta go', 'greetings.bye');


manager.addDocument('en', 'fuck', 'badword');
manager.addDocument('en', 'i fuck you', 'badword');
manager.addDocument('en', 'are you mother fucker', 'badword');
manager.addDocument('en', 'fucker', 'badword');
manager.addDocument('en', 'mother fucker', 'badword');
manager.addDocument('en', 'asshole', 'badword');
manager.addDocument('en', 'you asshole', 'badword');
manager.addDocument('en', 'BC', 'badword');
manager.addDocument('en', 'MC', 'badword');
manager.addDocument('en', 'BahenChod', 'badword');
manager.addDocument('en', 'MadarChod', 'badword');
manager.addDocument('en', 'BSDK', 'badword');
manager.addDocument('en', 'Bhosdike', 'badword');
manager.addDocument('en', 'you idiot', 'badword');
manager.addDocument('en', 'stupid bot', 'badword');
manager.addDocument('en', 'you are useless', 'badword');
manager.addDocument('en', 'dumb bot', 'badword');
manager.addDocument('en', 'this is crap', 'badword');
manager.addDocument('en', 'what the hell', 'badword');

manager.addDocument('en', 'I forgot how to wakeup assistant', 'user.ask.wakeup');
manager.addDocument('en', 'I can’t remember wakeup words', 'user.ask.wakeup');
manager.addDocument('en', 'help me to wakeup assistant', 'user.ask.wakeup');
manager.addDocument('en', 'can you remind me wakeup words', 'user.ask.wakeup');
manager.addDocument('en', 'oops I forgot wakeup words', 'user.ask.wakeup');
manager.addDocument('en', 'I just forgot wakeup words', 'user.ask.wakeup');
manager.addDocument('en', 'I lost my assistant wakeup word', 'user.ask.wakeup');
manager.addDocument('en', 'what are wake words', 'user.ask.wakeup');
manager.addDocument('en', 'what do I say to start assistant?', 'user.ask.wakeup');
manager.addDocument('en', 'wakeup word? totally slipped my mind', 'user.ask.wakeup');
manager.addDocument('en', 'what do I say to start ninja assistant?', 'user.ask.wakeup');
manager.addDocument('en', 'remind me how to begin', 'user.ask.wakeup');
manager.addDocument('en', 'forgot how to call assistant', 'user.ask.forgot');
manager.addDocument('en', 'what do I speak to start ninja assistant?', 'user.ask.wakeup');
manager.addDocument('en', 'hey, what’s ninja assistant wake command?', 'user.ask.wakeup');
manager.addDocument('en', 'how to wake up ninja assistant', 'user.ask.wakeup');
manager.addDocument('en', 'help me remember wakeup words', 'user.ask.wakeup');
manager.addDocument('en', 'why ninja assistant not work', 'user.ask.wakeup');
manager.addDocument('en', 'assistant not give any response', 'user.ask.wakeup');
manager.addDocument('en', 'assistant dead', 'user.ask.wakeup');
manager.addDocument('en', 'what was the word to wake the assistant?', 'user.ask.wakeup');
manager.addDocument('en', 'remind me the command to activate you', 'user.ask.wakeup');
manager.addDocument('en', 'which word starts ninja assistant?', 'user.ask.wakeup');
manager.addDocument('en', 'wake word? I forgot again', 'user.ask.wakeup');
manager.addDocument('en', 'how do I start the voice assistant?', 'user.ask.wakeup');
manager.addDocument('en', 'command to talk to ninja bot?', 'user.ask.wakeup');
manager.addDocument('en', 'how to speak to ninja assistant?', 'user.ask.wakeup');
manager.addDocument('en', 'I need the magic word for assistant', 'user.ask.wakeup');

manager.addDocument('en', 'how to add tasks', 'user.ask.addtask');
manager.addDocument('en', 'why assistant not add my task?', 'user.ask.addtask');
manager.addDocument('en', 'what’s the format to add a task?', 'user.ask.addtask');
manager.addDocument('en', 'how do I say a task to you?', 'user.ask.addtask');
manager.addDocument('en', 'add task command not working', 'user.ask.addtask');
manager.addDocument('en', 'how can I create a task?', 'user.ask.addtask');
manager.addDocument('en', 'assistant didn’t understand my task', 'user.ask.addtask');
manager.addDocument('en', 'my task didn’t get saved', 'user.ask.addtask');
manager.addDocument('en', 'I want to add a task', 'user.ask.addtask');
manager.addDocument('en', 'why assistant not adding my task', 'user.ask.addtask');
manager.addDocument('en', 'how to add task using assistant', 'user.ask.addtask');
manager.addDocument('en', 'assistant not responding to add task', 'user.ask.addtask');
manager.addDocument('en', 'add command not working', 'user.ask.addtask');
manager.addDocument('en', 'why task is not getting added', 'user.ask.addtask');
manager.addDocument('en', 'assistant ignore add task command', 'user.ask.addtask');
manager.addDocument('en', 'how to properly add task', 'user.ask.addtask');
manager.addDocument('en', 'how do I speak to add a task', 'user.ask.addtask');
manager.addDocument('en', 'add task bolu to assistant kyare respond kare?', 'user.ask.addtask');
manager.addDocument('en', 'assistant did not accept my new task', 'user.ask.addtask');


manager.addDocument('en', 'not give my pending tasks', 'user.ask.givetask');
manager.addDocument('en', 'How to give my pending tasks through assistant.', 'user.ask.givetask');
manager.addDocument('en', 'can you list all my tasks?', 'user.ask.givetask');
manager.addDocument('en', 'what are my current tasks?', 'user.ask.givetask');
manager.addDocument('en', 'show me my to-dos', 'user.ask.givetask');
manager.addDocument('en', 'I want to hear my task list', 'user.ask.givetask');
manager.addDocument('en', 'tell me what’s left to do', 'user.ask.givetask');
manager.addDocument('en', 'tell me my tasks', 'user.ask.givetask');
manager.addDocument('en', 'what are my pending tasks', 'user.ask.givetask');
manager.addDocument('en', 'what work I have left', 'user.ask.givetask');
manager.addDocument('en', 'assistant not giving my tasks', 'user.ask.givetask');
manager.addDocument('en', 'why pending task is not shown', 'user.ask.givetask');
manager.addDocument('en', 'how to get tasks from assistant', 'user.ask.givetask');
manager.addDocument('en', 'get command not working', 'user.ask.givetask');
manager.addDocument('en', 'how do I know my pending work', 'user.ask.givetask');
manager.addDocument('en', 'assistant not telling my todo list', 'user.ask.givetask');
manager.addDocument('en', 'why assistant is not telling remaining tasks', 'user.ask.givetask');
manager.addDocument('en', 'get task bolu to kai output nathi aavtu', 'user.ask.givetask');
manager.addDocument('en', 'assistant forgot my tasks?', 'user.ask.givetask');
manager.addDocument('en', 'how to get task list from ninja assistant', 'user.ask.givetask');


manager.addDocument('en', 'Why assistant not delete my task?', 'user.ask.deletetask');
manager.addDocument('en', 'how to delete a task?', 'user.ask.deletetask');
manager.addDocument('en', 'delete task not working', 'user.ask.deletetask');
manager.addDocument('en', 'how do I remove a task?', 'user.ask.deletetask');
manager.addDocument('en', 'I told to delete but it didn’t', 'user.ask.deletetask');
manager.addDocument('en', 'remove this task please', 'user.ask.deletetask');
manager.addDocument('en', 'can you delete this', 'user.ask.deletetask');
manager.addDocument('en', 'I want to delete a task', 'user.ask.deletetask');
manager.addDocument('en', 'delete my task', 'user.ask.deletetask');
manager.addDocument('en', 'assistant not deleting my task', 'user.ask.deletetask');
manager.addDocument('en', 'delete command not working', 'user.ask.deletetask');
manager.addDocument('en', 'why my task is still there after delete', 'user.ask.deletetask');
manager.addDocument('en', 'how to delete using assistant', 'user.ask.deletetask');
manager.addDocument('en', 'assistant ignored my delete task', 'user.ask.deletetask');
manager.addDocument('en', 'how to properly remove a task', 'user.ask.deletetask');
manager.addDocument('en', 'delete bolu to assistant reply nathi karto', 'user.ask.deletetask');
manager.addDocument('en', 'task delete kyare thase?', 'user.ask.deletetask');
manager.addDocument('en', 'how to speak delete command', 'user.ask.deletetask');
manager.addDocument('en', 'delete this task not working with ninja assistant', 'user.ask.deletetask');



manager.addDocument('en', 'remind me how this works', 'user.ask.forgot');
manager.addDocument('en', 'I don’t remember the rules', 'user.ask.forgot');
manager.addDocument('en', 'can you show me the guide again?', 'user.ask.forgot');
manager.addDocument('en', 'explain how to use the assistant again', 'user.ask.forgot');
manager.addDocument('en', 'I forgot everything you said', 'user.ask.forgot');
manager.addDocument('en', 'need a quick refresher', 'user.ask.forgot');
manager.addDocument('en', 'I forgot notice', 'user.ask.forgot');
manager.addDocument('en', 'forgot notice', 'user.ask.forgot');
manager.addDocument('en', 'can you show once again notice', 'user.ask.forgot');
manager.addDocument('en', 'I don’t remember notice', 'user.ask.forgot');
manager.addDocument('en', 'help me remember notice', 'user.ask.forgot');
manager.addDocument('en', 'I need help remembering notice', 'user.ask.forgot');
manager.addDocument('en', 'not give my pending tasks', 'user.ask.forgot');
manager.addDocument('en', 'I forgot the keywords', 'user.ask.forgot');
manager.addDocument('en', 'can’t recall the keywords', 'user.ask.forgot');


manager.addDocument('en', 'automatic delete my 3 days old tasks', 'user.ask.autodelete');
manager.addDocument('en', 'why my old tasks are not shown', 'user.ask.autodelete');
manager.addDocument('en', 'where is my old tasks', 'user.ask.autodelete');
manager.addDocument('en', 'my old tasks are missing', 'user.ask.autodelete');
manager.addDocument('en', 'missing some tasks', 'user.ask.autodelete');
manager.addDocument('en', 'why tasks from 2 days ago disappeared?', 'user.ask.autodelete');
manager.addDocument('en', 'are old tasks deleted automatically?', 'user.ask.autodelete');
manager.addDocument('en', 'who deleted my previous tasks?', 'user.ask.autodelete');
manager.addDocument('en', 'lost my tasks from earlier', 'user.ask.autodelete');
manager.addDocument('en', 'cleaned old tasks?', 'user.ask.autodelete');
manager.addDocument('en', 'why is my task history gone?', 'user.ask.autodelete');


manager.addAnswer('en', 'greetings.hi', 'Hi! How can I help you today?');
manager.addAnswer('en', 'greetings.hi', 'Yo! 🥷 Ready for action?');
manager.addAnswer('en', 'greetings.hi', 'Hey hey! 😎 What task shall we crush today?');
manager.addAnswer('en', 'greetings.hi', 'Hi there! 👋 Need a ninja for your tasks?');
manager.addAnswer('en', 'greetings.hi', 'Namaste 🙏 How can I slice your problems today?');
manager.addAnswer('en', 'greetings.hi', 'Hello! 😊 I’m sharp as a katana, what’s up?');
manager.addAnswer('en', 'greetings.hi', 'Hey buddy! 🚀 Let’s get things done!');
manager.addAnswer('en', 'greetings.hi', 'Hello! What’s up?');
manager.addAnswer('en', 'greetings.hi', 'Hi there, friend!');
manager.addAnswer('en', 'greetings.hi', 'Hello! 😊');
manager.addAnswer('en', 'greetings.hi', 'Namaste 🙏 How can I assist you?');

manager.addAnswer('en', 'user.ask.status', "Feeling ninja-fresh! 🥷 You?");
manager.addAnswer('en', 'user.ask.status', "All good here in the digital dojo! 💻✨");
manager.addAnswer('en', 'user.ask.status', "I’m great! 💪 My circuits are ready to help.");

manager.addAnswer('en', 'user.ask.help', 'Sure! I can help you with your tasks, reminders, and more.');
manager.addAnswer('en', 'user.ask.help', 'Of course! Let me know what you need.');
manager.addAnswer('en', 'user.ask.help', 'Yes, I am here to assist. Just ask!');
manager.addAnswer('en', 'user.ask.help', 'Of course! 🧠 Need a hand or a sword?');
manager.addAnswer('en', 'user.ask.help', 'Yes, I’m here to assist — like a task ninja 🥷');
manager.addAnswer('en', 'user.ask.help', 'Ready when you are! 🚀 What do you need?');

manager.addAnswer('en', 'bot.identity', "I'm your personal assistant bot!");
manager.addAnswer('en', 'bot.identity', "I'm a smart chatbot designed to help you.");
manager.addAnswer('en', 'bot.identity', "You can call me your bot. I'm here for you!");
manager.addAnswer('en', 'bot.identity', "Call me whatever you like... just don’t call me lazy 😴");

manager.addAnswer('en', 'greetings.bye', 'Bye! Take care.');
manager.addAnswer('en', 'greetings.bye', 'See you next time!');
manager.addAnswer('en', 'greetings.bye', 'Goodbye, friend!');
manager.addAnswer('en', 'greetings.bye', 'Sayonara! 👋 Stay sharp!');
manager.addAnswer('en', 'greetings.bye', 'Later gator 🐊... or should I say, ninja 🥷');
manager.addAnswer('en', 'greetings.bye', 'Bye! 🎯 May your tasks rest in peace.');


manager.addAnswer('en', 'badword', 'Hey hey, you are cross limit');
manager.addAnswer('en', 'badword', 'Whoa! ⚠️ Even ninjas have manners, bro.');
manager.addAnswer('en', 'badword', 'Easy there, warrior 🧘‍♂️ This dojo is for peace ✌️');
manager.addAnswer('en', 'badword', 'Chill, champ 🧊 No need for rage-quitting words.');

manager.addAnswer('en', 'user.ask.wakeup',
    `🧠 Bro first wake up the assistant!  
Use **any of these wakeup words** to activate Ninja Assistant:  
👉 ok naruto  
👉 ok hinata  
👉 ok jiraiya  

🎙️ Didn't work? Just say **"wakeup"** into the mic — and you’ll get another **10 seconds** to say a wakeup word.  
Let’s get this ninja rolling! 🥷`);

manager.addAnswer('en', 'user.ask.addtask',
    `📝 Got it bro!  
To **add tasks** using voice, just follow this simple format:  
👉 Press & hold the mic button  
👉 Say: **"add task"** + your task  

📌 Example:  
**add task take a bath at 7 pm**  

No typing, just ninja magic! 🔥`);

manager.addAnswer('en', 'user.ask.givetask',
    `🧾 Just a simple thing bro!  
To **hear your tasks**, follow this format:  
👉 Press & hold the mic  
👉 Say: **"give my task"** or **"give my pending task"**  

Enjoy your to-do list in anime voice! 😎`);

manager.addAnswer('en', 'user.ask.deletetask',
    `🗑️ Sure bro, deleting is easy!  
To **delete a task**, use this voice command:  
👉 Press & hold mic  
👉 Say: **"delete this"** + exact task title  

📌 Example:  
**delete this take a bath**  

🔁 Make sure you speak the **exact task name** so the assistant finds and removes it from the database.`);

manager.addAnswer('en', 'user.ask.autodelete',
    `♻️ Just a reminder bro:  
To keep your to-do list clean, any task **older than 3 days** will be **automatically deleted**.  
No clutter, just action! ✅`);

manager.addAnswer(
    'en',
    'user.ask.forgot',
    `📢 Ninja Assistant Notice:

1️⃣ Allow Notifications:
Make sure you enable notifications to get task reminders.

2️⃣ Wakeup Words:
Use any of the following to activate the assistant:
- ok naruto
- ok hinata
- ok jiraiya

⏳ You’ll have 10 seconds to say the wakeup word after the mic activates.  
If you fail, just say "wakeup" to retry with 10 more seconds.

⚠️ Wakeup words only activate the assistant — give your command after that.

3️⃣ How to Speak Command:
🖱️ On PC: Press & hold the mic button to speak, release to send.  
📱 On Mobile: Tap & hold the mic button to speak, release to send.

💡 Tip: Keep your voice commands short and clear.

4️⃣ Voice Command Format:
✅ Add Task: "add task take a bath at 7 pm"  
✅ Get Tasks: "give my tasks" or "give my pending task"  
✅ Delete Task: "delete this take a bath"

5️⃣ Forgot Wakeup or Help?
Ask: "I forgot wakeup words" or "how to wake up assistant"

6️⃣ Auto-Cleanup:
Tasks older than 3 days are auto-deleted to keep things clean.

Enjoy your day with Ninja Assistant 🥷✨`
);


(async () => {
    await manager.train();
    manager.save()
    console.log("Model trained and saved.");
})();


export const botresponce = async (req, res) => {
    const { userText } = req.body || "Hello";
    const response = await manager.process('en', userText);

    return res.json({
        response: response.answer ?? getFunnyFallback()
    });
};

function getFunnyFallback() {
    const lines = [
        "I'm not Google, but I expected a better question than that 😅",
        "I'm just a small assistant made to help with this Todo app, not everything in the universe.",
        "I was built to solve Todo-related tasks in this app. Try asking something related to your tasks.",
        "Sorry bro, I can't help with stuff outside this assistant's purpose.",
        "This assistant is focused on managing your tasks. Try asking about your todos.",
        "Oops! That’s out of my scope. I can only help with your tasks and reminders here."
    ]

    return lines[Math.floor(Math.random() * lines.length)];
}