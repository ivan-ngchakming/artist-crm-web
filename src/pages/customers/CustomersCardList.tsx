import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

const CustomersCardList = ({ customers }: any) => {
  return (
    <Box>
      {customers.map((x: any) => (
        <Box key={x} m={2}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography>Ng Chak Ming, Ivan</Typography>
                <Typography>ivan.ng.chak.ming@gmail.com</Typography>
                <Typography>ivan0313_</Typography>
                <Typography>Active</Typography>
                <Typography>Feb 27, 2022</Typography>
                <Typography textAlign="right">{x}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default CustomersCardList;
