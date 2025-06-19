import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import DarkModeButton from "./DarkModeButton";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function Navbar() {
  return (
    <Box
      className=" w-full py-5 px-10 flex justify-between"
      sx={{ borderBottom: 1, borderColor: "background.level2" }}
    >
      <a href="/" className="flex ">
        <h1 className=" text-2xl mr-2"> ✈️</h1>
        <Typography level="h3">BusinessTrips</Typography>
      </a>

      <div className="flex gap-2">
        <Link href="/calendar" underline="none">
          <IconButton color="neutral">
            <CalendarMonthIcon />
          </IconButton>
        </Link>
        <DarkModeButton />
      </div>
    </Box>
  );
}
