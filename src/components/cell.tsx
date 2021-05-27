import React, { FC, useCallback, useState } from "react";
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
  const [selectSize, setSelectSize] = useState(0);
  const { player, size } = useStore(
    useCallback(s => s.state[position.row][position.col], [position.row, position.col])
  );
  const { play, numbers } = useStore(({ play, playerTurn, playerNumbers }) => ({
    play,
    numbers: playerNumbers[playerTurn],
  }));
  const handleClick = () => play(selectSize, position.row, position.col);
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = e => setSelectSize(parseInt(e.target.value));

  return (
    <div className={classes.root} style={{ backgroundColor: player || undefined }}>
      <select onChange={handleChange} value={selectSize}>
        <option value={0}>0</option>
        {numbers.map(v => (
          <option key={`item-${v}`} value={v}>
            {v}
          </option>
        ))}
      </select>
      {size}
      <button onClick={handleClick}>Ok</button>
    </div>
  );
};

export default Cell;
