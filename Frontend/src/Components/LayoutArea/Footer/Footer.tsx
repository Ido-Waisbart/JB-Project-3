import "./Footer.css";
import { Container, Typography } from "@mui/material";

export function Footer() {
    return (
        <Container className="Footer">
			<Typography variant="body1">Made by Ido Waisbart.</Typography>
			<Typography variant="body2"><b>Did you know?</b> This app's name is a reference to a popular chiptune-rock album by Slime Girls.</Typography>
        </Container>
    );
}
