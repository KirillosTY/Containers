

db.createUser({
  user: 'adminMeIn',
  pwd: 'adminIsIn',
  roles: [
    {
      role: 'dbOwner',
      db: 'BlogsAndUsers',
    },
  ],
});


db.users.insert({ username: 'testeri123k', name: "first tester was here", password:"testeri123k" });


