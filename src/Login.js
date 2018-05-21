import React, { Component } from 'react';
import {
	AsyncStorage,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

class Login extends Component {

	constructor() {
		super();
		this.state = {
			username: 'arun@bc',
			password: '@naxa123'
		};
	}

	async onValueChange(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} catch (error) {
			console.log(error.message);
		}
	}

	async onUserIdChange(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} catch (error) {
			console.log(error.message);
		}
	}


	userLogin() {
		if (this.state.username && this.state.password) {

			console.log(this.state);
			const body = {};
			body.username = this.state.username;
			body.password = this.state.password;


			const req = {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify({
				  username: this.state.username,
				  password: this.state.password,
				}),
			  };

			console.log(req);


			//change the url
			fetch('http://139.59.67.104:4001/core/api/api-token-auth/', req)
			.then((response => {
				console.log(this.state.username.concat(' ', this.state.password));
				console.log(response.json());
				if (response.ok) {
					return response;
				} 
			
				Alert.alert('Failed to login');
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
			}))
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData);
				this.onValueChange('token', responseData.token);
				this.onUserIdChange('user_id', responseData.user_id);
											// 				try {
											//   const value = await AsyncStorage.getItem(');
											//   if (value !== null){
											//     // We have data!!
											//     console.log(value);
											//   }
											// } catch (error) {
											//   // Error retrieving data
											// }
				Actions.Successful_Login({ type: 'replace' });
			})
			.catch((error) => console.log(error))

			.done();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Image
						source={require('../app_images/buildchange.jpeg')}
						style={styles.image}
				/>
				<View style={styles.form}>
					<TextInput
						editable
						onChangeText={(username) => this.setState({ username })}
						placeholder='Email'
						ref='username'
						returnKeyType='next'
						style={styles.inputText}
						value={this.state.username}
					/>
					<TextInput
						
						editable
						onChangeText={(password) => this.setState({ password })}
						placeholder='Password'
						ref='password'
						returnKeyType='next'
						secureTextEntry
						style={styles.inputText}
						value={this.state.password}
					/>
					<TouchableOpacity
						style={styles.buttonWrapper}
						onPress={this.userLogin.bind(this)}
					>
						<Text style={styles.buttonText}>
							Login
						</Text>
					</TouchableOpacity>

				</View>
			</View>
		);
	}
}

export default Login;
