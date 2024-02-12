import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { forwardRef } from "react";
import Colors from "../constants/Colors";

type ButtonProps = {
	text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
	({ text, ...pressableProps }, ref) => {
		return (
			<Pressable ref={ref} {...pressableProps} style={styles.container}>
				<Text style={styles.text}>{text}</Text>
			</Pressable>
		);
	}
);

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: Colors.light.tint,
		borderRadius: 100,
		marginVertical: 10,
		alignItems: "center",
		color: "white",
	},

	text: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
});
export default Button;
