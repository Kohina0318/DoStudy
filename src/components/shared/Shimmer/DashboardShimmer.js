import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { styles } from '../../../assets/css/ShimmerCSS/DashboardShimmerStyle';

export default function DashboardShimmer() {
    return (
        <SkeletonPlaceholder>
            <View style={{ ...styles.containerMain }}>

                <View style={styles.mrTop} />

                <View style={{ ...styles.mrg }}>
                    <View style={{ ...styles.mainHeading }}>
                        <View style={{ ...styles.headingLine }} />
                        <View style={{ ...styles.headingbutton }} />
                    </View>
                    <View style={{ ...styles.listContainer }}>
                        <View style={{ ...styles.categoryCircle }} />
                        <View style={{ ...styles.categoryCircle }} />
                        <View style={{ ...styles.categoryCircle }} />
                        <View style={{ ...styles.categoryCircle }} />
                    </View>
                </View>

                <View style={styles.mrTop} />

                <View style={{ ...styles.mrg }}>
                    <View style={{ ...styles.mainHeading }}>
                        <View style={{ ...styles.headingLine }} />
                        <View style={{ ...styles.headingbutton }} />
                    </View>
                    <View style={{ ...styles.listContainer }}>
                        <View style={{ ...styles.brandBox }} />
                        <View style={{ ...styles.brandBox }} />
                        <View style={{ ...styles.brandBox }} />
                    </View>
                </View>

                <View style={styles.mrTop} />

                <View style={{ ...styles.mrg }}>
                    <View style={{ ...styles.mainHeading }}>
                        <View style={{ ...styles.headingLine }} />
                        <View style={{ ...styles.headingbutton }} />
                    </View>
                    <View style={{ ...styles.listContainer }}>
                        <View style={{ ...styles.productBox }}>
                            <View style={{ ...styles.productImage }} />
                            <View style={{ ...styles.productLine }} />
                            <View style={{ ...styles.productLine1 }} />
                        </View>
                        <View style={{ ...styles.productBox }}>
                            <View style={{ ...styles.productImage }} />
                            <View style={{ ...styles.productLine }} />
                            <View style={{ ...styles.productLine1 }} />
                        </View>
                    </View>
                </View>

                <View style={styles.mrTop10} />

                <View style={{ ...styles.mrg }}>
                    <View style={{ ...styles.mainHeading }}>
                        <View style={{ ...styles.headingLine }} />
                        <View style={{ ...styles.headingbutton }} />
                    </View>
                    <View style={{ ...styles.listContainer }}>
                        <View style={{ ...styles.productBox }}>
                            <View style={{ ...styles.productImage }} />
                            <View style={{ ...styles.productLine }} />
                            <View style={{ ...styles.productLine1 }} />
                        </View>
                        <View style={{ ...styles.productBox }}>
                            <View style={{ ...styles.productImage }} />
                            <View style={{ ...styles.productLine }} />
                            <View style={{ ...styles.productLine1 }} />
                        </View>
                    </View>
                </View>

            </View>
        </SkeletonPlaceholder>
    );
};