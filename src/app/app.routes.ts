import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: "register",
    loadChildren: () =>
      import("src/app/auth/auth.routes").then((m) => m.registerRoute),
  },
  {
    path: "login",
    loadChildren: () =>
      import("src/app/auth/auth.routes").then((m) => m.loginRoute),
  },
  // {
  //   path: "",
  //   loadChildren: () =>
  //     import("src/app/globalFeed/globalFeed.routes").then((m) => m.routes),
  // },
  {
    path: "feed",
    loadChildren: () =>
      import("src/app/yourFeed/yourFeed.routes").then((m) => m.routes),
  },
];
