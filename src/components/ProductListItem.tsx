import { Image, StyleSheet } from "react-native";
import Colors from "@/src/constants/Colors";

import { Text, View } from "@/src/components/Themed";
import { Product } from "../types";

const defaultPizzaImage =
	"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
	product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: product.image || defaultPizzaImage }}
				style={styles.image}
			/>
			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	);
};

export default ProductListItem;

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
