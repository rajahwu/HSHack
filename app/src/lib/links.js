const links = [
  { title: "home", pathname: "/", auth: false },
  { title: "login", pathname: "login", auth: false },
  { title: "register", pathname: "register", auth: false },
  { title: "dashboard", pathname: "dashboard", auth: true },
  { title: "profile", pathname: "profile", auth: true },
  { title: "settings", pathname: "settings", auth: true },
  { title: "signout", pathname: "signout", auth: true },
];

export { links };
