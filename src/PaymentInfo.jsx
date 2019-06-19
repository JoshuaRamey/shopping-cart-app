import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    // minWidth: 650
  }
}));

export default function PaymentInfo(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Subtotal
            </TableCell>
            <TableCell align="right">{props.subtotal.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Tax
            </TableCell>
            <TableCell align="right">
              {(props.subtotal * 0.1).toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Total
            </TableCell>
            <TableCell align="right">
              {(props.subtotal * 0.1 + props.subtotal).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
