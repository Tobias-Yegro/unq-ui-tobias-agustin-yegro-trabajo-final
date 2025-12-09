import { useEffect, useState } from "react";
import { fetchDifficulties } from "../services/api";

export function useDifficulties() {
  const [difficulties, setDifficulties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchDifficulties();
        setDifficulties(data);
      } catch (err) {
        setError("Error al cargar las dificultades");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { difficulties, loading, error };
}
