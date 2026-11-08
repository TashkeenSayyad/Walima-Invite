# Walima Invitation

A white-themed, single-page invitation website for the Walima reception.

- **Date:** Tuesday, 29 December 2026
- **Time:** 8:00 PM (PKT)
- **Venue:** Zam Zam Lawn, Thatta
- **Couple:** Tashkeen & Anusha

## Features

- Premium gold-foil styling with English translations under all Arabic & Urdu text
- Desi shaadi-card styling: marigold garlands, Mughal arch, paisley (kairi) motifs, jaali pattern, Urdu text
- "Open Invitation" card with a T&A seal and a rose & marigold petal shower
- Bismillah, invitation text and a Nikah dua
- Live countdown to the event
- Event detail cards, Google Maps directions and embedded map
- "Add to Calendar" button (downloads an `.ics` file with a 1-day reminder)
- Personal greeting per guest via the link (`?to=Ahmed+Family`)
- Urdu / English switch (floating button, remembered per visitor; `?lang=ur` opens in Urdu)
- WhatsApp RSVP button with a pre-filled message (after setting a number)
- Optional hosts line and background music
- WhatsApp/social link preview image (`og-image.png`) and gold favicon
- Responsive layout for phones and desktops

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Publish with GitHub Pages

In the repository settings, go to **Pages**, choose **Deploy from a branch**, select the branch and `/ (root)`, and save. The site will be live at `https://<username>.github.io/Walima-Invite/`.

## Settings

Open `script.js`; the `CONFIG` block at the top controls:

| Setting | What it does |
|---|---|
| `rsvpWhatsApp` | WhatsApp number for RSVPs, digits only in international format (e.g. `923001234567`). Empty hides the button. |
| `hosts` / `hostsUrdu` | Optional "Hosted by …" line under the names (and its Urdu version). Empty hides it. |
| `music` | Audio file next to `index.html` (default `music.mp3`). Add the file to enable the music button; music starts when the card is opened. |

## Personal links for each guest

Add `?to=` with the guest's name to the link (use `+` for spaces):

```
https://tashkeensayyad.github.io/Walima-Invite/?to=Ahmed+Family
```

The welcome card then says "Dear Ahmed Family", and the RSVP message includes the name. Add `&lang=ur` to open the invitation in Urdu.

## Link preview image

`og-image.png` is shown when the link is shared on WhatsApp/Facebook. Its URL in `index.html` assumes the site is published at `https://tashkeensayyad.github.io/Walima-Invite/`; update the `og:url` and `og:image` tags if it lives elsewhere. To regenerate it, open `tools/og-image.html` at 1200×630 and take a screenshot.

## Customising

Wording and colours live in `index.html` and `styles.css` (colour tokens at the top under `:root`). Urdu versions of texts are in the `data-ur` attributes. Event times are in `script.js`.
