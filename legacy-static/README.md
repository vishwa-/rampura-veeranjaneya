# Legacy Static Website

This folder contains the original static HTML pages from before the project's migration to Next.js 14 App Router.

The active application is entirely driven by Next.js in:
- \/app\ (App Router pages & API routes)
- \/components\ (React UI components)
- \/public\ (Static assets served by Next.js)

URL requests to any \.html\ extension (e.g. \/sevas.html\, \/temple.html\) are automatically redirected to clean Next.js routes (\/sevas\, \/temple\) via \
ext.config.mjs\.
