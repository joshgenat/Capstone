import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import colors from "../config/colors";

const data = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    {
      data: [1, 4, 5, 2, 15, 3, 2],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: colors.light,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: colors.light,
  backgroundGradientToOpacity: 0,
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => colors.primary,
  labelColor: (opacity = 1) => colors.dark,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "1",
    stroke: colors.dark,
  },
};

const screenWidth = Dimensions.get("window").width;

function AppBarChart(props) {
  return (
    <View>
      <LineChart
        data={data}
        width={screenWidth} // from react-native
        height={180}
        yAxisSuffix="h"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        style={{
          marginVertical: 8,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    alignContent: "center",
  },
  graphStyle: {},
});

export default AppBarChart;
