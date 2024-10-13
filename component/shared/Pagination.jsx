// import React from 'react';
import PropTypes from 'prop-types';
import colors from '@constants/colors';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        onPress={handlePreviousPage}
        disabled={currentPage === 1}
        style={[styles.button, currentPage === 1 && styles.disabledButton]}
        activeOpacity={0.7}
        accessibilityLabel="Previous Page"
        accessibilityRole="button">
        <Text style={styles.text}>Previous</Text>
      </TouchableOpacity>

      <Text style={styles.pageIndicator}>{`Page ${currentPage} of ${totalPages}`}</Text>

      <TouchableOpacity
        onPress={handleNextPage}
        disabled={currentPage === totalPages}
        style={[styles.button, currentPage === totalPages && styles.disabledButton]}
        activeOpacity={0.7}
        accessibilityLabel="Next Page"
        accessibilityRole="button">
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

// // Define prop types
// Pagination.propTypes = {
//   currentPage: PropTypes.number.isRequired,
//   totalPages: PropTypes.number.isRequired,
//   setCurrentPage: PropTypes.func.isRequired,
// };

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: colors.white,
  },
  pageIndicator: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.backgroundColor,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    height: 40,
    width: 100,
  },
  text: {
    color: colors.primary,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  disabledButton: {
    backgroundColor: colors.mutedForeground, // Change to a muted color when disabled
  },
});

export default Pagination;
