# PowerNotes for the web

PowerNotes as a website: the same "Playful Pop" note app as the iPad version, with subjects, rich text, Apple Pencil drawing, tags and search. It runs in any modern browser and works well on an iPad in Safari.

It's plain HTML, CSS and JavaScript, with no build step and no packages to install.

## Run it on your computer (localhost)

You need [Node.js](https://nodejs.org) 18 or later.

```sh
cd powernotes
node server.js
```

Then open **http://localhost:5173** in your browser. Press Ctrl+C to stop it.

- To use another port: `PORT=8080 node server.js`
- The server also prints an address like `http://192.168.1.20:5173`. Any device on the same Wi-Fi, such as your iPad, can open that address.
- No Node? From the `public` folder, `python3 -m http.server 5173` works too.

## Live site

Every push to `main` publishes the `public` folder to GitHub Pages: **https://mdadammdazwar-boop.github.io/PowerNotes/**

To use your own domain later, add it under the repository's Settings > Pages > Custom domain, and add the DNS records GitHub shows there.

## Put it somewhere else

The `public` folder is the whole website. Upload it to any static host, for example GitHub Pages, Netlify or Cloudflare Pages. There is nothing to build: point the host at `public` and it's done.

On an iPad, open the site in Safari, tap Share, then **Add to Home Screen**. It then opens full screen with its own icon, and keeps working offline.

## Where notes are saved

Notes are saved in the browser's local storage, on that one device and in that one browser. They don't sync between devices. Clearing Safari's website data deletes them. "Reset to sample notes" at the bottom of the sidebar puts back the starter notes.

## What's where

| Path | What it is |
|---|---|
| `public/index.html` | The page |
| `public/css/styles.css` | Every design token (colors for light and dark mode, radii, borders, shadows) at the top, then the styles |
| `public/js/app.js` | The app: data and sample notes, sidebar, note list, editor, drawing, menus and shortcuts |
| `public/sw.js` | Keeps the app working offline. Change `VERSION` in it whenever you change a file. |
| `public/manifest.webmanifest`, `public/icons/` | The name and icon for Add to Home Screen |
| `server.js` | A tiny local web server with no dependencies |

## Things the web can't do like the iPad app

- **Apple Pencil double-tap** isn't available to websites. Switch pen and eraser in the drawing toolbar instead.
- **⌘N and ⌘F** may be taken by Safari itself. ⌘B, ⌘I, ⌘U and ⌘⌫ work.
- **Dragging notes onto subjects** works with a mouse or trackpad. On touch, long-press a note and choose a subject under "Move to".
