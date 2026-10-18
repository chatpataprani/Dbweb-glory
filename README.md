# Dbweb Glory

Guild-glory panel: customers buy credits by UPI, launch a guild, and the bot accounts do the rest.

## Run
    pip install -r requirements.txt
    python app.py            # serves on $PORT (default 20333)

## Environment variables
See `.env.example`. Required: `UPI_ID`, `ADMIN_PASSWORD`. Set `DATA_DIR` to a persistent disk, otherwise users/payments are lost on every restart.

## How UPI payments work
1. Customer picks credits → gets a QR / "Open UPI app" link and an order ID.
2. Customer pays, then enters the 12-digit UTR from their UPI app.
3. You open **Admin → Payments**, check the money arrived in your bank/UPI app, and press **Approve**. Credits are added once.

## Pages
`/` home · `/login` · `/client` customer dashboard · `/admin` admin · `/bot` bot panel (admin only)

## Bot accounts
Add Free Fire guest accounts in **Admin → Bots** (UID + password).

## Contact
lumenomore@hotmail.com
