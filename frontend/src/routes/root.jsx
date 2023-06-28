import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <Box>
     <Button>
        <Link to={`..`}>Nice</Link>
     </Button>
    </Box>
  )
}