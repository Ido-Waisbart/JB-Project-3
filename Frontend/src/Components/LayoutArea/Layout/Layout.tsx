import { Stack } from "@mui/material";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import { Footer } from "../Footer/Footer";

export function Layout() {
    return (
        <Stack spacing={2} className="Layout" sx={{ paddingTop: "5vh" }}>
            <header>
                <Header />
            </header>

            <nav>
                <Menu />
            </nav>

            <main>
                <Routing />
            </main>

            <footer>
                <Footer />
            </footer>
        </Stack>
    );
}
