Plan:
√   Remove PNPM
√   Reinstall NPM packages
√   Test to make sure PNPM removal works
√   Fix Likes appearing over only 9 cards correctly, carrying over to the next 9 cards
√   Fix filters not working (At least, VIEW LIKED doesn't render the cards as "liked" - The badge is gray instead of purple)
⋯    Entering "edmonAdmin" instead of proper email stops you from logging in, but doesn't pop up a notif. An issue of validation?
        UPDATE: This seems to pop a notif on Edge, but not Firefox. what then?
    Reverse date order is allowed. (9.4.2026 - 1.4.2026)
    Populate database:
        Add some vacations that were in the past, for the sake of testing the filters
        Add some dummy users
        Add some likes from a few more users, for data and graph variety
    Fix MCP Server's ngrok mcpServerUrl (How..?)
        Make sure to install ngrok for Windows on Swordbox:
            https://dashboard.ngrok.com/get-started/setup/windows
        Run `npm install --global ngrok`
        Run `ngrok config add-authtoken 3Dc4IGRYWv5UCMjVJnlZI02bok3_Smp9fLCRREvpWE3yL6E8`
            (With token granted by ngrok's website)

        Steps to run ngrok server:
        1. Run backend.
        2. Login via postman to any user.
        3. `ngrok http 4000` in any terminal to connect an ngrok MCP server instance to the backend.
        4. Use given URL (F.E., https://mobile-overlabor-clergyman.ngrok-free.dev/api/vacations) in Postman
        5. ?
        6. Profit
    Make sure that Add Vacation works correctly
    Implement missing edit vacation
√   Implement missing delete vacation
    (Optional?) Update README.md as needed
    (Optional?) Test JWT Expiration
    Go through all // TODO's
    Docker containerization
	Validate Postman Export
	(W.I.P) Finalize Exported Database Data
    Submit app to Sylla
    Upload project to LinkedIn
    Update webdev resume with this project and its URL