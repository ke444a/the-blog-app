import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { CustomContainer } from "./CustomContainer";

const FooterLink = ({ children }: { children: string }) => {
    return (
        <Link
            variant="body1"
            color="inherit"
            underline="hover"
            sx={(theme) => ({
                cursor: "pointer",
                marginX: 1.5,
                [theme.breakpoints.down("md")]: {
                    fontSize: "0.8em",
                },
            })}
            href="#"
        >
            {children}
        </Link>
    );
};

const Footer = () => {
    return (
        <Box
            sx={(theme) => ({
                display: "flex",
                padding: theme.spacing(4, 0),
                mt: "auto",
                backgroundColor: "footer.main",
            })}
        >
            <CustomContainer>
                <FooterLink>&copy; 2023</FooterLink>
                <FooterLink>Twitter</FooterLink>
                <FooterLink>LinkedIn</FooterLink>
                <FooterLink>Email</FooterLink>
                <FooterLink>RSS Feed</FooterLink>
                <FooterLink>Add to Feedly</FooterLink>
            </CustomContainer>
        </Box>
    );
};

export default Footer;
