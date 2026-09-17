# Yun Sol’s Birthday Adventure ♡

A mobile-first static website with no backend or build step.

## Preview locally

You can double-click `index.html`. For a preview that behaves more like the live site, open a terminal in this folder and run:

```powershell
npx serve .
```

Then open the local address it shows (usually `http://localhost:3000`).

## Edit the site

- Dinner and concert details are in the labeled `CONFIG` object near the top of `script.js`.
- Change the dinner location in `CONFIG.dinnerLocation`.
- The final letter is labeled `FINAL_BIRTHDAY_MESSAGE` in `script.js`.
- Screen text is in `index.html`.
- Colors and layout are in `styles.css`.
- Images are organized under `assets`.

## Publishing status

This version is permanently unlocked and opens directly on the birthday adventure. No date or testing switch needs to be changed before publishing.

## Deploy to Vercel

1. Put this `birthday-surprise` folder in a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Choose **Other** as the framework preset. Leave the build command empty and use `.` as the output directory.
4. Select **Deploy**.

To update the live site without changing its link, edit the same repository and push the changes. Vercel redeploys the existing project automatically.
