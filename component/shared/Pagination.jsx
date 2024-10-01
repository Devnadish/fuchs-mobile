// Pagination.js
import colors from "@constants/colors";
import React from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        onPress={handlePreviousPage}
        disabled={currentPage === 1}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>Previous</Text>
      </TouchableOpacity>

      <Text
        style={styles.pageIndicator}
      >{`Page ${currentPage} of ${totalPages}`}</Text>

      <TouchableOpacity
        onPress={handleNextPage}
        disabled={currentPage === totalPages}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: colors.white,
  },
  pageIndicator: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.backgroundColor,
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    height: 40,
    width: 100,
  },
  text: {
    color: colors.primary,
    fontSize: 14,
    textTransform: "capitalize",
  },
});

export default Pagination;