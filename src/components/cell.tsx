import React, { FC, useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

import { useDrag } from "react-use-gesture";

import useStore, { Player } from "../stores/main";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    aspectRatio: "1",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100px",
    maxHeight: "128px",
    minWidth: "100px",
    maxWidth: "128px",
    transition: "box-shadow 200ms",
    cursor: "grab",
  },
  underglow: {
    boxShadow: "0px 0px 10px grey",
    cursor: "grabbing",
  },
  red: {
    backgroundColor: "red",
  },
  blue: {
    backgroundColor: "blue",
  },
  text: {
    fontSize: "3rem",
    fontFamily: "Consolas",
    color: "#FFF",
    userSelect: "none",
  },
});

const Cell: FC<{ position: { row: number; col: number } }> = ({ position }) => {
  const classes = useStyles();
  const { player, size } = useStore(
    useCallback(s => s.state[position.row][position.col], [position.row, position.col])
  );
  useEffect(() => setSelectSize(size), [size]);
  const { play, maxNumber, numbers } = useStore(({ play, maxNumber, playerNumbers, playerTurn }) => ({
    play,
    maxNumber,
    numbers: playerNumbers[playerTurn],
  }));
  const [selectSize, setSelectSize] = useState(size);
  const [pressed, setPressed] = useState(false);
  const bindDrag = useDrag(({ down, movement: [_, my] }) => {
    if (!down) {
      handleClick();
      setPressed(false);
    } else {
      setPressed(true);
      const v = Math.floor(my / 50);
      if (v <= 0) return;
      if (v > maxNumber()) return;
      if (v <= size) return;
      if (!numbers.includes(v)) return;
      setSelectSize(v);
    }
  });
  const handleClick = () => {
    if (selectSize <= size) return setSelectSize(size);
    play(selectSize, position.row, position.col);
  };
  return (
    <div
      className={clsx(classes.root, {
        [classes.underglow]: pressed,
        [classes.blue]: player === Player.Blue,
        [classes.red]: player === Player.Red,
      })}
      {...bindDrag()}>
      <span className={classes.text}>{selectSize}</span>
    </div>
  );
};

export default Cell;
