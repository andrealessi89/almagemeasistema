import { useState } from "react";
import { createContext } from "react";
import { useMemo } from "react";

export const PlayersContext = createContext();

const PlayersProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);

    const value = useMemo(() => ({
        players,
        setPlayers,
      }),
      [
        players,
        setPlayers,
      ]);

    return(
        <PlayersContext.Provider value={value}>
            {children}
        </PlayersContext.Provider>
    )
}

export default PlayersProvider;