import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/styles";

import { useDrag } from "react-use-gesture";

import useStore, { Player } from "../stores/main";
import clsx from "clsx";
import ContextMenu from "./contextmenu";
import { ItemProps } from "react-contexify";

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
    transition: "box-shadow 200ms, background-color 200ms",
    cursor: "grab",
    touchAction: "none",
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
  const { play, numbers, playerTurn } = useStore(({ play, maxNumber, playerNumbers, playerTurn }) => ({
    play,
    maxNumber,
    numbers: playerNumbers[playerTurn],
    playerTurn,
  }));
  const [selectSize, setSelectSize] = useState(size);
  const [pressed, setPressed] = useState(false);
  const bindDrag = useDrag(({ down, movement: [_, my] }) => {
    const v = Math.floor(my / 50);
    if (!down) {
      setPressed(false);
      if (size === 0 && selectSize === 0 && player === Player.Null) return play(selectSize, position.row, position.col);
      if (numbers.includes(selectSize) && selectSize > size) play(selectSize, position.row, position.col);
    } else {
      setPressed(true);
      if (numbers.includes(v) && v >= size) setSelectSize(v);
    }
  });
  const menuItems = useMemo<ItemProps[]>(
    () => numbers.map(num => ({ children: num, style: { fontFamily: "Consolas" } })),
    [numbers]
  );
  return (
    <span>
      <ContextMenu
        menuItems={menuItems}
        className={clsx(classes.root, {
          [classes.underglow]: pressed,
          [classes.blue]: player === Player.Blue || (pressed && playerTurn === "blue"),
          [classes.red]: player === Player.Red || (pressed && playerTurn === "red"),
        })}
        {...bindDrag()}>
        <span className={classes.text}>{selectSize}</span>
      </ContextMenu>
    </span>
  );
};

export default Cell;
