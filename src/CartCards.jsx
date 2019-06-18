import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 350,
    textAlign: "center",
    margin: 10
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function CartCards(props) {
  const classes = useStyles();

  return props.shoppingCart.map(item => {
    return (
      <Card key={item.image} className={classes.card}>
        <CardContent>
          <img className={"productImage"} src={item.image} alt={item.name} />
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {item.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            ${item.price} (excluding tax)
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Quantity: {item.quantity}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => props.removeFromCart(item)}>
            Remove from cart
          </Button>
        </CardActions>
      </Card>
    );
  });
}
