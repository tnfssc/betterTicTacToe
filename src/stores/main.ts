import zustand from "zustand";

export const enum Player {
  Blue = "blue",
  Red = "red",
  Null = "null",
}

export interface Store {
  state: { size: number; player: Player }[][];
  playerTurn: Player.Blue | Player.Red;
  playerNumbers: Record<Player.Blue | Player.Red, number[]>;
  resetState: (width?: number, height?: number) => void;
  play: (size: number, row: number, col: number) => void;
}

const naturalNumbers = (noOfNumbers: number) =>
  Array(noOfNumbers)
    .fill(0)
    .map((_, i) => i + 1);

const useStore = zustand<Store>(set => ({
  state: Array(3).fill(Array(3).fill({ size: 0, player: Player.Null })),
  playerTurn: Player.Blue,
  playerNumbers: {
    blue: naturalNumbers(3 * 3 - 1),
    red: naturalNumbers(3 * 3 - 1),
  },
  resetState: (width: number = 3, height: number = 3) => {
    if (width < 1 || height < 1) throw new Error("Width or Height cannot be less than 1");
    set({
      state: Array(height).fill(Array(width).fill({ size: 0, player: Player.Null })),
      playerTurn: Player.Blue,
      playerNumbers: {
        blue: naturalNumbers(width * height - 1),
        red: naturalNumbers(width * height - 1),
      },
    });
  },
  play: (size: number, row: number, col: number) =>
    set(({ state, playerTurn, playerNumbers }) => {
      if (!playerNumbers[playerTurn].includes(size))
        throw new Error(`This number is already used up! ${size}, ${playerTurn}`);
      return {
        state: state.map((r, i) => (i !== row ? r : r.map((c, i) => (i !== col ? c : { player: playerTurn, size })))),
        playerTurn: playerTurn === Player.Blue ? Player.Red : Player.Blue,
        playerNumbers: {
          ...playerNumbers,
          [playerTurn]: playerNumbers[playerTurn].filter(v => v !== size),
        },
      };
    }),
}));

export default useStore;
