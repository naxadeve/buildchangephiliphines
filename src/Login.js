import React, { Component } from 'react';
import {
	AsyncStorage,
	Image,
	Alert,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

class Login extends Component {

	constructor() {
		super();
		this.state = {
			username: null,
			password: null
		};
	}

	async onValueChange(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} catch (error) {
			console.log(error.message);
		}
	}


	userLogin() {
		if (this.state.username && this.state.password) {
			//change the url
			fetch('http://kc.naxa.com.np//users/api/get-auth-token/', {
				method: "POST",
				// change the properties of header if required usually not required
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					//change the name of the properties email_or_username and password as per api
					email_or_username: this.state.username,
					password: this.state.password,
				})
			})
			.then((response) => response.json())
			.then((responseData) => {
// change the argument of the function if you want to store the token value under any other key name
				this.onValueChange('token', responseData.token);
				Alert.alert('Login Success!');
//change the scene
				Actions.Homepage();
			})
			.catch((error) => console.log(error))

			.done();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Image
						source={require('../app_images/construction.png')}
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
