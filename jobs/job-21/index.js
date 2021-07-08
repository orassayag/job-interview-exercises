function yo(yeah) {
    return new Promise((resolve => settimeout(resolve, yeah));
}

/* 1. How would you call the function and the parameter ?
   2. How would you implement it ?
   3. What is the different between == and === ?
   4. In flexbox, what is the different between justify - content and align - items ?
   5. In CSS, that is the difference between position relative, absolute, and fixed ?

   6. In react, how would you implement useSideEffect ? explain.
    if(condition) {
       useSideEffect(() => {
       }, [])
    }

OR

     useSideEffect(() => {
       if (condition) {
       }
     }, [])

7. Did you ever used custom hooks ? */

//========================

const users = {
    1: {
        name: 'Tim Berners-Lee',
        id: 1,
        email: 'tlee@www.com',
        teams: []
    },
    2: {
        name: 'Brendan Eich',
        id: 2,
        email: 'beich@moz.com',
        teams: [1, 3]
    },
    3: {
        name: 'Ryan Dahl',
        id: 3,
        email: 'rdahl@oden.com',
        teams: [1, 2, 4]
    },
    4: {
        name: 'Douglas Crockford',
        id: 4,
        email: 'dcrock@yahoo.com',
        teams: [1, 5, 6]
    }
};

const msg = {
    text: 'Hey all! Are you coming to Denoland?',
    sender: 3,
    mentions: {
        users: [1],
        teams: [3, 4]
    }
};

function sendNotification(text, email) {
    console.log(`Sending mail to - ${email}`);
}

const sendTeamMessage = (msg) => {
    const sentMessageUserIds = {};
    const { text, mentions } = msg;
    const { users as usersMsg, teams } = mentions;
    usersMsg.map(user => {
        sendNotification(text, user.email);
        sentMessageUserIds[user.id] = user.id;
    };

    for (let i = 0; i < users.length; i++) {
        const user =
        }

    for (let i = 0; i < teams.length; i++) { // o(t)
        const teamId = teams[i];
        const teamUsers = new Set(users.filter(u => // o(u)
            u.teams.indexOf(teamId) > -1).map(u => u.id) //o(t) => o(t^2*u)
        );
        teamUsers.forEach(u =>
            sendNotification(text, user.email)
        );
    }

    // Second try.
    for (let i = 0; i < teams.length; i++) {
        const teamId = teams[i];
        for (let y = 0; y <
        }
}

sendTeamMessage(msg);