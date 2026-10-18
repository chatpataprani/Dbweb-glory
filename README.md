# Dbweb Glory

Guild-glory panel: customers buy credits by UPI, launch a guild, and the bot accounts do the rest.

## Run locally

```bash
pip install -r requirements.txt
python app.py
``

The web dashboard listens on `0.0.0.0` and uses `PORT`, then `SERVER_PORT`, then `20333` as its port fallback.

## Deploy on a Pterodactyl VPS

1. Create a Python server in your Pterodactyl panel and allocate a port.
2. Upload the repository files or clone the repository into the server's working directory. If Git is available in the container, run:
   ```bash
   git clone https://github.com/chatpataprani/Dbweb-glory.git .
   ```
   If the panel's container does not include Git, upload the repository archive instead.
3. Set the startup command to `python app.py`.
4. Set the installation/build command to `pip install -r requirements.txt` (or install the requirements once from the console).
5. Make sure the panel exposes the allocated port as `SERVER_PORT` or `PORT`. The app binds to `0.0.0.0`.
6. Configure the environment variables below in the panel. Do not put real passwords or API keys in GitHub.
7. Start the server and check the console for the dashboard URL/port.

### Updating from GitHub

For a Git-based install, stop the server, run `git pull` in the repository directory, then start it again. If Git is unavailable, upload the updated files through the panel's file manager. Do not run `git clone` into a non-empty directory.

## Environment variables

See `.env.example`. Set at least:

- `UPI_ID`: UPI address used to create payment instructions.
- `ADMIN_PASSWORD`: a long, unique admin password.
- `ADMIN_USERNAME`: admin login name.
- `DATA_DIR`: persistent writable directory for user/payment data, if your host provides one.

Optional: `GUILD_API_KEY`, `UPI_NAME`, `BASIC_PRICE_INR`, `PREMIUM_PRICE_INR`, `BRAND_NAME`, and `DEV_EMAIL`.

**Persistence matters:** point `DATA_DIR` at a directory that survives restarts/reinstalls. Without it, data files are stored in the app's current working directory and may be lost if the host resets the server.

## Run on Render

The existing `render.yaml` provides a Render web-service configuration. Import the repository in Render and set the required secret environment variables in the dashboard. A persistent disk and always-on service may require a paid plan.

## How UPI payments work

1. Customer picks credits → gets a QR / "Open UPI app" link and an order ID.
2. Customer pays, then enters the 12-digit UTR from their UPI app.
3. Admin opens **Admin → Payments**, checks that the money arrived in the bank/UPI app, then presses **Approve**. Credits are added once.

## Pages

`/` home · `/login` · `/client` customer dashboard · `/admin` admin · `/bot` bot panel (admin only)

## Bot accounts

Add Free Fire guest accounts in **Admin → Bots** (UID + password). Only use accounts you own or are authorized to manage.

## Contact

lumenomore@hotmail.com
