import { StyleSheet, TouchableOpacity, Text } from "react-native";

const FilterButton = ({ setFilter, text, selectedFilter }) => {
    const clicked = selectedFilter === text;
    return (
        <TouchableOpacity
            style={clicked ? styles.filterSelected : styles.filter}
            onPress={() => {
                setFilter(text);
            }}>
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    filterSelected: {
        borderRadius: 30,
        height: 40,
        width: 80,
        justifyContent: 'center',
        alignItems: "center",
        color: "white",
        backgroundColor: '#9360e3'
    },
    filter: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 30,
        height: 40,
        width: 80,
        justifyContent: 'center',
        alignItems: "center",
        color: "white"
    },
    text: {
        fontSize: 13,
        color: 'white',
    },
})

export default FilterButton