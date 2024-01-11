/**
 * An array of routes that can be accessible to the public
 * @type {string[]}
 */

export const publicRoute = [
  "/",
  "/animes",
  "/animes/anime/",
  "/mangas",
  "/mangas/manga/",
  "/lightnovels",
  "/lightnovels/lightnovel/",
  "/auth/new-verification",
  "/auth/new-password",
]

/**
 * An array of routes that are used authentication
 * @type {string[]}
 */
export const authRoute = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
]

/**
 * The prefix for authentication routes
 * @type {string}
 */
export const apiAuthPrelix = "/api/auth"

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/"