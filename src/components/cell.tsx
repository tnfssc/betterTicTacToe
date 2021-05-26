import React, { FC, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import useStore from "../stores/main";

const useStyles = makeStyles({
  root: {
    aspectRatio: "1",
    cursor: "pointer",
  },
});

const Cell: FC<{ position: { row: number; col: number } }> = ({ position }) => {
  const classes = useStyles();
  const { player, size } = useStore(
    useCallback(s => s.state[position.row][position.col], [position.row, position.col])
  );
  const play = useStore(s => s.play);
  const handleClick = () => play("blue", 5, position.row, position.col);

  return (
    <div className={classes.root} style={{ backgroundColor: player || undefined }} onClick={handleClick}>
      {size}
    </div>
  );
};

export default Cell;
