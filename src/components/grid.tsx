import React, { FC, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useKey, useToggle } from "rooks";
import useStore, { Player } from "../stores/main";
import Cell from "./cell";
import clsx from "clsx";

import confirm from "./confirm";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    transition: "background-color 200ms",
  },
  backgroundBlue: {
    backgroundColor: "#00054c",
  },
  backgroundRed: {
    backgroundColor: "#4c0000",
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
  const playerTurn = useStore(s => s.playerTurn);
  const winner = useStore(s => s.winner);
  const resetState = useStore(s => s.resetState);
  const [confirming, toggleConfirming] = useToggle(false);
  useEffect(() => {
    if (winner !== Player.Null) {
      if (confirming) return;
      toggleConfirming(true);
      confirm(`The winner is ${winner} player! Restart game?`).then(t => {
        toggleConfirming(false);
        if (t) resetState(width, height);
      });
    }
  }, [winner]);
  useKey(["r", "R"], () => {
    if (confirming) return;
    toggleConfirming(true);
    confirm("Reset?").then(t => {
      toggleConfirming(false);
      if (t) resetState(width, height);
    });
  });
  return (
    <div
      className={clsx(classes.root, {
        [classes.backgroundBlue]: playerTurn === "blue",
        [classes.backgroundRed]: playerTurn === "red",
      })}>
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
