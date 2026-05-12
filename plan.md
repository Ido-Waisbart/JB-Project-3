Plan:
√   Remove PNPM
√   Reinstall NPM packages
√   Test to make sure PNPM removal works
√   Fix Likes appearing over only 9 cards correctly, carrying over to the next 9 cards
√   Fix filters not working (At least, VIEW LIKED doesn't render the cards as "liked" - The badge is gray instead of purple)
⋯    Entering "edmonAdmin" instead of proper email stops you from logging in, but doesn't pop up a notif. An issue of validation?
        UPDATE: This seems to pop a notif on Edge, but not Firefox. what then?
√   Send updated .env's to laptop
→   Reverse date order is allowed. (9.4.2026 - 1.4.2026)
    Populate database:
        Add some vacations that were in the past, for the sake of testing the filters
        Add some dummy users
        Add some likes from a few more users, for data and graph variety
√   Fix MCP Server's ngrok mcpServerUrl (How..?)
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