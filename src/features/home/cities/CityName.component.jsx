import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  Divider,
  IconButton,
  Link,
  ListItem,
  ListItemText,
} from "@mui/material";

const CityName = ({ name, removeCityHandler }) => {
  return (
    <>
      <ListItem
        sx={{
          pl: 0,
        }}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => removeCityHandler(name)}
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
        }
      >
        <Link href={`/weather?cityName=${name}`}>
          <ListItemText
            sx={{
              fontWeight: "bold",
            }}
            primary={name}
          />
        </Link>
      </ListItem>
      <Divider
        variant="inset"
        component="div"
        sx={{
          margin: 0,
        }}
      />
    </>
  );
};

export default CityName;
