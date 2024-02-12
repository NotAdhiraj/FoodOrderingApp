import { Image, Pressable, StyleSheet } from "react-native";
import Colors from "@/src/constants/Colors";

import { Text, View } from "@/src/components/Themed";
import { Product } from "../types";

import { Link } from "expo-router";

export const defaultPizzaImage =
	"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
	product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<Link href={`/menu/${product.id}`} asChild>
			<Pressable style={styles.container}>
				<Image
					source={{ uri: product.image || defaultPizzaImage }}
					style={styles.image}
					resizeMode='contain'
				/>
				<Text style={styles.title}>{product.name}</Text>
				<Text style={styles.price}>${product.price}</Text>
			</Pressable>
		</Link>
	);
};

export default ProductListItem;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: "white",
		borderRadius: 10,
		flex: 1,
		maxWidth: "50%",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},

	price: {
		fontSize: 17,
		fontWeight: "bold",
		color: Colors.light.tint,
		textAlign: "center",
	},
	image: {
		width: "100%",
		aspectRatio: 1,
	},
});
