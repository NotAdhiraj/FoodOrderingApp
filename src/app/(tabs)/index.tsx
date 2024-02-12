import { Image, StyleSheet } from "react-native";
import Colors from "@/src/constants/Colors";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import products from "@/assets/data/products";

const product = products[1];

export default function TabOneScreen() {
	return (
		<View style={styles.container}>
			<Image source={{ uri: product.image }} style={styles.image} />
			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: "white",
		borderRadius: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},

	price: {
		fontSize: 17,
		fontWeight: "bold",
		color: Colors.light.tint,
	},
	image: {
		width: "100%",
		aspectRatio: 1,
	},
});
