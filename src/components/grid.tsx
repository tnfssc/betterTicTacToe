import React, { FC, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useKey } from "rooks";
import useStore from "../stores/main";
import Cell from "./cell";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cell: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: "1",
  },
});

const Grid: FC<{ width?: number; height?: number }> = ({ height = 3, width = 3 }) => {
  const classes = useStyles();
  const resetState = useStore(s => s.resetState);
  useKey("r", () => resetState(width, height));
  return (
    <div className={classes.root}>
      {Array(height)
        .fill(0)
        .map((_, row) => (
          <div className={classes.row} key={`row-${row}`}>
            {Array(width)
              .fill(0)
              .map((_, col) => (
                <div className={classes.cell} key={`col-${col}`}>
                  <Cell position={{ col, row }} />
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default Grid;