import { Alert, StyleSheet, Text, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Container } from "./components/container";
import { Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";

type Tile = {
  color: string;
  isOdd: boolean;
};

export default function App() {
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(60);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [tiles, setTiles] = useState<Tile[]>([
    { color: "red", isOdd: false },
    { color: "red", isOdd: false },
    { color: "blue", isOdd: true },
  ]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalRef.current!);
    }
    intervalRef.current = setInterval(() => {
      setSeconds((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [seconds]);

  const handleCorrect = () => {
    setScore(score + 1);
    setSeconds(seconds + 10);
  };

  return (
    <Container>
      <Text style={styles.title}>
        Өөр <Text style={styles.oddTitle}>өнгийг</Text> ол!
      </Text>
      <View style={{ padding: 16, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{seconds} секунд</Text>
        <Text style={styles.score}>Оноо {score}</Text>
      </View>
      <View style={styles.board}>
        {tiles.map((tile, index) => (
          <View style={styles.tileGrid} key={`tile-${index}`}>
            <TouchableWithoutFeedback
              onPress={() => {
                if (tile.isOdd) {
                  handleCorrect();
                }
              }}
            >
              <View style={{ ...styles.tile, backgroundColor: tile.color }}></View>
            </TouchableWithoutFeedback>
          </View>
        ))}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  oddTitle: {
    color: "rgba(0,0,0,0.5)",
  },
  score: {
    color: "#363636",
  },
  board: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: 8,
  },
  tileGrid: {
    width: (Dimensions.get("window").width - 32) / 3,
  },
  tile: {
    width: "100%",
    height: 0,
    paddingBottom: "100%",
    backgroundColor: "red",
    borderRadius: 10,
  },
});
