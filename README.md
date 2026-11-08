# Walima Invitation

A white-themed, single-page invitation website for the Walima reception.

- **Date:** Tuesday, 29 December 2026
- **Time:** 8:00 PM (PKT)
- **Venue:** Zam Zam Diamond Hall, Thatta
- **Couple:** Tashkeen & Anusha

## Features

- "Open Invitation" welcome card
- Bismillah, invitation text and a Nikah dua
- Live countdown to the event
- Event detail cards, Google Maps directions and embedded map
- "Add to Calendar" button (downloads an `.ics` file with a 1-day reminder)
- Responsive layout for phones and desktops

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Publish with GitHub Pages

In the repository settings, go to **Pages**, choose **Deploy from a branch**, select the branch and `/ (root)`, and save. The site will be live at `https://<username>.github.io/Walima-Invite/`.

## Customising

Wording and colours live in `index.html` and `styles.css` (colour tokens at the top under `:root`). Event times are in `script.js`.
