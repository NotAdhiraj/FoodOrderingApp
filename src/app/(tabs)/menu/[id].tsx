import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
	const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

	const { addItem } = useCart();

	const router = useRouter();

	const { id } = useLocalSearchParams();

	const product = products.find((p) => p.id.toString() == id);

	const defaultPizzaImage =
		"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

	if (!product) {
		return <Text>Product not found.</Text>;
	}

	const onCart = () => {
		if (!product) {
			return;
		}
		addItem(product, selectedSize);
		router.push("/cart");
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: product?.name }} />
			<Image
				source={{ uri: product?.image || defaultPizzaImage }}
				style={styles.image}
			/>

			<Text>Select Size</Text>
			<View style={styles.sizes}>
				{sizes.map((size) => (
					<Pressable
						key={size}
						style={selectedSize == size ? styles.selectedSize : styles.size}
						onPress={() => setSelectedSize(size)}>
						<Text style={styles.sizeText}>{size}</Text>
					</Pressable>
				))}
			</View>

			<Text style={styles.price}>Price: ${product.price}</Text>

			<Button text='Add to Cart' onPress={onCart} />
		</View>
	);
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
		padding: 10,
	},
	image: {
		width: "100%",
		aspectRatio: 1,
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: "auto",
	},
	sizes: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginVertical: 20,
	},
	size: {
		backgroundColor: "gainsboro",
		width: 50,
		aspectRatio: 1,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	selectedSize: {
		backgroundColor: "lightgreen",
		width: 50,
		aspectRatio: 1,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	sizeText: {
		fontSize: 20,
		fontWeight: "500",
	},
});
