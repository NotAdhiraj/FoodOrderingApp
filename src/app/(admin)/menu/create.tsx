import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { Stack, useLocalSearchParams } from "expo-router";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";

const CreateProductScreen = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [error, setError] = useState("");
	const [image, setImage] = useState("");

	const { id } = useLocalSearchParams();
	const isUpdating = !!id;

	const resetFields = () => {
		setName("");
		setPrice("");
	};

	const onSubmit = () => {
		if (isUpdating) {
			onUpdate();
		} else {
			onCreate();
		}
	};

	const onCreate = () => {
		if (!validateInput()) {
			return;
		}
		console.warn("Creating Product", name);
		resetFields();
	};
	const onUpdate = () => {
		if (!validateInput()) {
			return;
		}
		console.warn("Updating Product", name);
		resetFields();
	};

	const validateInput = () => {
		setError("");
		if (!name) {
			setError("Name is required");
			return false;
		}
		if (!price) {
			setError("Price is required");
			return false;
		}
		if (isNaN(Number(price))) {
			setError("Price must be a number");
			return false;
		}
		return true;
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const onDelete = () => {
		console.warn("Delete");
	};

	const confirmDelete = () => {
		Alert.alert("Confirm", "Are you sure you want to delete this product?", [
			{ text: "Cancel" },
			{ text: "Delete", style: "destructive", onPress: onDelete },
		]);
	};

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: isUpdating ? "Update" : "Create Pizza",
					animation: "fade",
				}}
			/>

			<Image
				source={{ uri: image || defaultPizzaImage }}
				style={styles.image}
			/>
			<Text onPress={pickImage} style={styles.textButton}>
				Select Image
			</Text>

			<Text style={styles.label}>Name</Text>
			<TextInput
				value={name}
				onChangeText={setName}
				placeholder='Name'
				style={styles.input}
			/>

			<Text style={styles.label}>Price</Text>
			<TextInput
				value={price}
				onChangeText={setPrice}
				placeholder='$9.99'
				style={styles.input}
				keyboardType='numeric'
			/>
			<Text style={{ color: "red" }}>{error}</Text>
			<Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
			{isUpdating && (
				<Text onPress={confirmDelete} style={styles.textButton}>
					Delete
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 10,
	},
	image: {
		width: "50%",
		aspectRatio: 1,
		alignSelf: "center",
	},
	textButton: {
		alignSelf: "center",
		color: Colors.light.tint,
		fontWeight: "bold",
		fontSize: 18,
		marginTop: 10,
	},
	label: {
		color: "gray",
		fontSize: 16,
	},
	input: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 20,
	},
});

export default CreateProductScreen;
