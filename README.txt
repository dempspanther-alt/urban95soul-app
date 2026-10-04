URBAN 95 SOUL — WORKING APP BUILD v2

Included:
- Live radio player with automatic backup stream fallback
- Persistent mini player
- Home, Shows, Request, and More screens
- Eight official show graphics
- Corrected title: The Chill Zone — Thomas Moore, Curator
- Tap-to-enlarge show/schedule graphics
- Installable Progressive Web App (PWA) support
- Offline caching of the app shell and show artwork (live audio still requires internet)
- Media Session metadata for supported phone lock-screen/media controls
- Urban 95 Soul app icon
- Station website link

Run locally through a web server (not by double-clicking index.html) so the service worker/install feature can operate.
Example: python -m http.server 8080
Then open http://localhost:8080/Urban95Soul_App/

Next native-release work can add Android/iOS packaging, station social links, a connected request submission endpoint, and live song metadata if the stream provider exposes it.
