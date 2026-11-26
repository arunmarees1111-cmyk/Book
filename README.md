# My Dear — Two Years of Us

## Open
Open `index.html` in a modern browser. For best video playback on mobile, use a local web server (for example, VS Code Live Server or Acode's preview/server feature), rather than opening the file directly.

## Change the secret code
In `script.js`, edit:
`const SECRET_CODE = "12345678";`
It must be exactly 8 digits. This is an aesthetic passcode gate only—not real security. The code is stored in client-side JavaScript and can be inspected.

## Add your photos and videos
Place files in the folders below and keep the filenames, or update the paths in the `memories` array in `script.js`.

- `images/memory-01.jpg` ... `images/memory-04.jpg` — one photo per memory
- `videos/memory-01.mp4` ... `videos/memory-04.mp4` — one video per memory

Each memory video is set to autoplay (browser-permitted), muted, loop, and inline. The video will start muted because browsers usually block autoplay with sound.

## Customize text
Edit each `title`, `paragraph`, and `caption` in the `memories` array. Edit the `finalLetter` array for the last page. The final page is text-only.

## Folder structure
- `index.html`
- `style.css`
- `script.js`
- `images/`
- `videos/`
