const links = [
  { title: "home", pathname: "/", auth: false },
  { title: "login", pathname: "login", auth: false },
  { title: "register", pathname: "register", auth: false },
  { title: "dashboard", pathname: "dashboard", auth: true },
  { title: "call-log", pathname: "call-log", auth: true },
  { title: "chat", pathname: "chat", auth: true },
  { title: "signout", pathname: "signout", auth: true },
];

export { links };
