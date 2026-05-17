import { Container, Typography } from "@mui/material";
import { UserMenu } from "../../UserArea/UserMenu/UserMenu";

export function Header() {
    return (
        <Container className="Header">
            <UserMenu />
			<Typography variant="h3">Waisbart's Vacation Wasteland</Typography>
        </Container>
    );
}
