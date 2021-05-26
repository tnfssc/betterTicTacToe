import zustand from "zustand";

export type Player = "blue" | "red" | null;

export interface Store {
  state: { size: number; player: Player }[][];
  resetState: (width?: number, height?: number) => void;
  play: (player: Player, size: number, row: number, col: number) => void;
  totalRows: () => number;
  totalColumns: () => number;
  defaultNumbers: () => number[];
  playerNumbers: (player: Player) => void;
}

const useStore = zustand<Store>((set, get) => ({
  state: Array(3)
    .fill(0)
    .map(() =>
      Array(3)
        .fill(0)
        .map(() => ({ size: 0, player: null }))
    ),
  resetState: (width: number = 3, height: number = 3) => {
    if (width < 1 || height < 1) throw new Error("Width or Height cannot be less than 1");
    set({
      state: Array(height)
        .fill(0)
        .map(() =>
          Array(width)
            .fill(0)
            .map(() => ({ size: 0, player: null }))
        ),
    });
  },
  // TODO
  play: (player: Player, size: number, row: number, col: number) => {
    set(s => ({
      state: s.state.map((r, i) => (i !== row ? r : r.map((c, i) => (i !== col ? c : { player, size })))),
    }));
  },
  totalRows: () => get().state.length,
  totalColumns: () => get().state[0].length,
  defaultNumbers: () => {
    const { totalColumns, totalRows } = get();
    return Array(Math.ceil((totalColumns() * totalRows()) / 2)).map((_, i) => i + 1);
  },
  playerNumbers: (player: Player) => {
    const { defaultNumbers: d, state } = get();
    return d().filter(v =>
      state.reduce((t, v) => [...t, ...v], []).find(a => (a.player !== player ? true : a.size !== v))
    );
  },
}));

export default useStore;
