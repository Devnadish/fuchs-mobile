import { StyleSheet, View } from 'react-native';
// import React from 'react';
import { Skeleton } from 'moti/skeleton';
import { SkeletonCommonProps } from '@styles/globalStyle';
import { colors } from '@constants';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

export default function SkeletonBody({
  loading,
  howMany = 1,
  height = 250,
  width = '100%',
  radius = 8,
}) {
  return (
    <View style={styles.skeletonContainer}>
      {Array.from({ length: howMany }).map((_, index) => (
        <Skeleton
          key={`skeleton-body-${index}-${Date.now()}`} // Unique key
          height={height}
          width={width}
          radius={radius}
          show={loading}
          {...SkeletonCommonProps}
        />
      ))}
    </View>
  );
}

// PropTypes validation for SkeletonBody component
// SkeletonBody.propTypes = {
//   loading: PropTypes.bool.isRequired, // Validate loading prop (required)
//   howMany: PropTypes.number, // Validate howMany prop (optional)
//   height: PropTypes.number, // Validate height prop (optional)
//   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Validate width prop (optional)
//   radius: PropTypes.number, // Validate radius prop (optional)
// };

export function SkeletonBodyRow({ loading, howMany = 1, height = 250, width = '100%' }) {
  return (
    <View style={styles.rowDirection}>
      {Array.from({ length: howMany }).map((_, index) => (
        <View
          style={{
            width: width,
            height: height,
          }}
          key={`skeleton-body-row-${index}-${Date.now()}`}>
          <Skeleton
            colorMode={'light'}
            width={'100%'}
            height={height}
            show={loading}
            {...SkeletonCommonProps}
          />
        </View>
      ))}
    </View>
  );
}

// PropTypes validation for SkeletonBodyRow component
// SkeletonBodyRow.propTypes = {
//   loading: PropTypes.bool.isRequired, // Validate loading prop (required)
//   howMany: PropTypes.number, // Validate howMany prop (optional)
//   height: PropTypes.number, // Validate height prop (optional)
//   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Validate width prop (optional)
//   radius: PropTypes.number, // Validate radius prop (optional)
// };

const styles = StyleSheet.create({
  skeletonContainer: {
    padding: 10,
    gap: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    flexWrap: 'wrap',
    flexGrow: 1,
    backgroundColor: colors.backgroundColor,
  },
  rowDirection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    flexGrow: 1,
  },
});
