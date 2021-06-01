import zustand, { UseStore } from "zustand";

export const enum Player {
  Blue = "blue",
  Red = "red",
  Null = "null",
}

export interface Store {
  state: { size: number; player: Player }[][];
  winner: Player;
  playerTurn: Player.Blue | Player.Red;
  playerNumbers: Record<Player.Blue | Player.Red, number[]>;
  resetState: (width?: number, height?: number) => void;
  determineWinner: () => Player;
  maxNumber: () => number;
  play: (size: number, row: number, col: number) => void;
}

const wholeNumbers = (noOfNumbers: number) =>
  Array(noOfNumbers + 1)
    .fill(0)
    .map((_, i) => i);

const endGame = (state: Store["state"]): Player => {
  let primaryDiagCount = 0;
  let secondaryDiagCount = 0;
  for (let i = 0; i < state.length; i++) {
    if (state[i][0].player !== Player.Null && state[i].every(cell => state[i][0].player === cell.player))
      return state[i][0].player; // Row check
    if (state[0][i].player !== Player.Null && state.every(row => state[0][i].player === row[i].player))
      return state[0][i].player; // Column check
    if (state[0][0].player !== Player.Null && state[i][i].player === state[0][0].player) primaryDiagCount++; // Primary diagonal check
    if (
      state[0][state.length - 1].player !== Player.Null &&
      state[i][state.length - 1 - i].player === state[0][state.length - 1].player
    )
      secondaryDiagCount++; // Secondary diagonal check
  }
  if (primaryDiagCount === state.length) return state[0][0].player;
  if (secondaryDiagCount === state.length) return state[0][state.length - 1].player;
  return Player.Null;
};

const createTicTacToeStore = (initialWidth: number = 3, initialHeight: number = 3) =>
  zustand<Store>((set, get) => ({
    state: Array(initialHeight).fill(Array(initialWidth).fill({ size: 0, player: Player.Null })),
    winner: Player.Null,
    playerTurn: Player.Blue,
    playerNumbers: {
      blue: wholeNumbers(initialHeight + initialWidth),
      red: wholeNumbers(initialHeight + initialWidth),
    },
    determineWinner: () => endGame(get().state),
    maxNumber: () => get().state.length * get().state[0].length - 1,
    resetState: (width: number = initialWidth, height: number = initialHeight) => {
      if (width < 1 || height < 1) throw new Error("Width or Height cannot be less than 1");
      if (width !== height) throw new Error("Width must be equal to Height");
      set({
        state: Array(height).fill(Array(width).fill({ size: 0, player: Player.Null })),
        playerTurn: Player.Blue,
        playerNumbers: {
          blue: wholeNumbers(get().maxNumber()),
          red: wholeNumbers(get().maxNumber()),
        },
        winner: Player.Null,
      });
    },
    play: (size: number, row: number, col: number) => {
      if (get().winner !== Player.Null) return;
      set(({ state, playerTurn, playerNumbers }) => {
        if (!playerNumbers[playerTurn].includes(size))
          throw new Error(`This number is already used up! ${size}, ${playerTurn}`);
        if (
          !(state[row][col].size === 0 && size === 0 && state[row][col].player === Player.Null) &&
          state[row][col].size >= size
        )
          throw new Error(
            `Cannot overrule a bigger number! Pos: (${row},${col}), Size: ${state[row][col].size}, New: ${size}`
          );
        return {
          state: state.map((r, i) => (i !== row ? r : r.map((c, i) => (i !== col ? c : { player: playerTurn, size })))),
          playerTurn: playerTurn === Player.Blue ? Player.Red : Player.Blue,
          ...(size !== 0
            ? {
                playerNumbers: {
                  ...playerNumbers,
                  [playerTurn]: playerNumbers[playerTurn].filter(v => v !== size),
                },
              }
            : { playerNumbers }),
        };
      });
      const winner = get().determineWinner();
      if (winner !== Player.Null) set({ winner });
    },
  }));

const useStore = createTicTacToeStore(4, 4);

export default useStore;
