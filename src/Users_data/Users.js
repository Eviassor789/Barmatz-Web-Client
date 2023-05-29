import User from "../User";
const users = new Map();

users.set(
  "Unknown",
  new User({
    Name: "Unknown",
    Password: "lll",
    Nickname: "L",
    Picture: "L-Profile.jpg",
  })
);

users.set(
  "yagami",
  new User({
    Name: "yagami",
    Password: "yyy",
    Nickname: "light",
    Picture: "yagami.jpg",
  })
);

users.set(
  "misa",
  new User({
    Name: "misa",
    Password: "mmm",
    Nickname: "misa-misa",
    Picture: "misa.jpg",
  })
);

users.set(
  "watari",
  new User({
    Name: "watari",
    Password: "www",
    Nickname: "W",
    Picture: "watari.jpg",
  })
);

users.set(
  "matsuda",
  new User({
    Name: "matsuda",
    Password: "mmm",
    Nickname: "touta",
    Picture: "matsuda.jpg",
  })
);

function easy_new_friend(Name1, Name2){
  users.get(Name1).AddNewFriend(Name2);
  users.get(Name2).AddNewFriend(Name1);
}

function easy_msg(from, to, txt, time){
  users.get(to).AddNewMsgFrom(from, txt, time);
  users.get(from).AddNewMsgTo(to, txt, time);
}

console.log(users);
console.log();
console.log();

easy_new_friend("watari", "Unknown");
easy_new_friend("watari", "yagami");

easy_new_friend("matsuda", "misa");
easy_new_friend("matsuda", "Unknown");

easy_new_friend("Unknown", "yagami");

easy_new_friend("misa", "yagami");

easy_msg("Unknown", "watari", "Watari, have you found any new leads on Kira's whereabouts?", "12:30");

easy_msg("watari", "Unknown", "I'm afraid not, L. Our surveillance teams have been working around the clock, but Kira is proving to be elusive.", "12:30");

easy_msg("Unknown", "watari", "It's frustrating. We need to find him before he kills again.", "12:30");

easy_msg("watari", "Unknown", " Agreed. But we must also be cautious. Kira is highly intelligent and capable of outsmarting us at every turn.", "12:30");

easy_msg("Unknown", "watari", "Yes, I know. But we can't afford to sit back and wait for him to make a move. We need to be proactive.", "12:31");

easy_msg("watari", "Unknown", "I understand your urgency, L. But we must also consider the risks involved in taking aggressive actions against Kira.", "12:31");

easy_msg("Unknown", "watari", "I'm well aware of the risks, Watari. But we can't let Kira continue to operate unchecked. Innocent lives are at stake.", "12:31");

easy_msg("watari", "Unknown", "I understand your concern, L. We'll continue to do everything in our power to catch Kira. But we must also be prepared for any eventuality.", "12:31");

easy_msg("Unknown", "watari", "Agreed. We need to stay one step ahead of Kira at all times.", "12:32");

easy_msg("watari", "Unknown", " Indeed. We'll keep working tirelessly until we catch him, L. That's a promise.", "12:33");



easy_msg("yagami", "watari", "Watari, can you provide me with the latest surveillance report on Kira?", "13:42");

easy_msg("watari", "yagami", "Yes, Light. I'll have the report sent to you right away.", "13:42");

easy_msg("yagami", "watari", "Thank you, Watari. We need to stay one step ahead of Kira if we want to catch him.", "13:42");

easy_msg("watari", "yagami", "Agreed, Light. Let's work together to catch Kira and put an end to his reign of terror.", "13:43");



easy_msg("matsuda", "misa", "Hey Misa, I was thinking about your fashion career. Have you given any thought to your next project?", "14:11");

easy_msg("misa", "matsuda", "Yes, I have actually. I've been brainstorming some new ideas for my clothing line.", "14:11");

easy_msg("matsuda", "misa", "That's great to hear. Do you have anything specific in mind?", "14:12");

easy_msg("misa", "matsuda", " Well, I was thinking of creating a new line of dresses that are inspired by Japanese culture. I think it would be a unique and interesting concept.", "14:13");

easy_msg("matsuda", "misa", "I love that idea, Misa. I think it could really take off. Do you have any sketches or designs yet?", "14:13");

easy_msg("misa", "matsuda", "Not yet, but I've been doing some research and gathering inspiration. I'll start working on some designs soon.", "14:13");

easy_msg("matsuda", "misa", "Perfect. And don't forget, we also have that photoshoot coming up for your current line. We need to make sure everything is ready for that.", "14:15");

easy_msg("misa", "matsuda", "Right, I almost forgot about that. I'll make sure to have everything prepared for the shoot. Thanks for reminding me, Matsuda.", "14:15");

easy_msg("matsuda", "misa", "No problem, Misa. As your manager, it's my job to keep everything running smoothly. Let's work together to make your fashion career a huge success.", "14:16");



easy_msg("matsuda", "Unknown", "Hey L, I was wondering if you had any updates on the Kira case.", "15:27");

easy_msg("Unknown", "matsuda", "Matsuda, we are making progress in our investigation. However, I cannot discuss the specifics with you at this time.", "15:27");

easy_msg("matsuda", "Unknown", " I understand, L. I just wanted to make sure that we're doing everything we can to catch Kira.", "15:28");

easy_msg("Unknown", "matsuda", " Of course, Matsuda. We are all working tirelessly to bring Kira to justice. Thank you for your continued dedication to this case.", "15:51");



easy_msg("Unknown", "yagami", "Light, I must speak with you. I have reason to suspect that you may be Kira.", "17:51");

easy_msg("yagami", "Unknown", "And what reason is that, L?", "17:51");

easy_msg("Unknown", "yagami", " Your actions and behavior align with Kira's patterns. You are exceptionally intelligent, and you have access to information that would be valuable to Kira.", "17:51");

easy_msg("yagami", "Unknown", "That's quite a leap, L. Being intelligent and having information doesn't make me Kira.", "17:51");

easy_msg("Unknown", "yagami", "Agreed, but there's more to it than that. You were the one who discovered the Death Note, and you have a strong motivation to rid the world of criminals.", "17:51");

easy_msg("yagami", "Unknown", "I see your point, but I could also argue that those are just coincidences. And even if they weren't, it doesn't prove that I'm Kira.", "17:51");

easy_msg("Unknown", "yagami", "True, but there's another piece of evidence that's hard to ignore. Your father is the head of the National Police Agency, which gives you an unprecedented level of access to information about the Kira case.", "17:51");

easy_msg("yagami", "Unknown", "I can't help who my father is, L. And even if I did have access to information, that doesn't mean I'm Kira. You're still grasping at straws.", "17:51");

easy_msg("Unknown", "yagami", "I disagree. All of these pieces of evidence together point to you being Kira. But I am a rational person, and I need concrete proof before I make any accusations.", "17:51");

easy_msg("yagami", "Unknown", "And what do you plan to do to get that proof, L?", "17:52");

easy_msg("Unknown", "yagami", "I will continue to monitor your actions closely. If you are Kira, you will eventually make a mistake. And when you do, I will be there to catch you.", "17:51");

easy_msg("yagami", "Unknown", " I see. Well, I hope you find what you're looking for, L. Because I assure you, I am not Kira.", "17:52");

easy_msg("Unknown", "yagami", "Light, I know our last conversation was tense, but I wanted to speak to you about something else.", "18:11");

easy_msg("yagami", "Unknown", "What is it, L?", "18:11");

easy_msg("Unknown", "yagami", "I've been thinking about my legacy and what will happen after I'm gone. And I've decided that I want you to be my successor.", "18:11");

easy_msg("yagami", "Unknown", "Me? Why would you choose me, L?", "18:11");

easy_msg("Unknown", "yagami", "You have all the qualities I'm looking for in a successor. Intelligence, intuition, and a strong sense of justice. I think you could continue the work I've started and make the world a better place.", "18:11");

easy_msg("yagami", "Unknown", "L, I'm honored that you would consider me for such an important role. I share your passion for justice and making the world a better place, and I would be proud to continue your legacy.", "18:11");

easy_msg("yagami", "Unknown", "Lets catch this murderer!", "18:12");




easy_msg("misa", "yagami", " Light, it's been weeks since we last went on a date. Don't you miss spending time with me?", "19:21");

easy_msg("yagami", "misa", "Misa, we've been over this before. I have other things to focus on right now.", "19:27");

easy_msg("misa", "yagami", "But I feel like I'm not a priority in your life anymore. Can't we just go out tonight?", "19:27");

easy_msg("yagami", "misa", "I'm sorry, Misa, but I can't. There's something I need to take care of. Maybe another time.", "19:33");






export default users;
