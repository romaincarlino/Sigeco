import React, {Component} from 'react';
import {ToastAndroid,ActivityIndicator, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import Colors from '../constants/Colors';
import Images from '../constants/Images';

class Login extends Component {

    static navigationOptions = {title: 'Login', header: null};

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            isLoading: false,
        };
    }

    tryLogin() {
        this.setState({
            isLoading: true,
        });

        fetch('https://app.sigeco.fr', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body:
            "forms[id_client_identification]=" + this.state.login + "&" +
            "forms[pass_identification]=" + this.state.password + "&" +
            "robot=1972&" +
            "tab_mobile=1",
        })
            .then((response) => response.text())
            .then((responseText) => {
                //if {message : error}
                if (responseText.charAt(0) == '{') {
                    this.setState({
                        isLoading: false,
                    });
                    ToastAndroid.show('Les identifiants ne sont pas corrects', ToastAndroid.SHORT);
                }
                else {
                    this.setState({
                        isLoading: false,
                    });
                    this.props.navigation.navigate('TestsList', {refresh: this.refreshFunction.bind(this)});
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    refreshFunction() {
        this.setState({
            login: '',
            password: '',
            isLoading: false,
        })
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Image
                    source={Images.logo}
                    style={styles.logo}
                />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder="Login"
                    placeholderTextColor={Colors.gray}
                    onChangeText={(login) => this.setState({login})}>
                </TextInput>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder="Mot de passe"
                    placeholderTextColor={Colors.gray}
                    secureTextEntry
                    onChangeText={(password) => this.setState({password})}>
                </TextInput>
                <TouchableOpacity style={styles.loginButtonContainer} onPress={this.tryLogin.bind(this)}>
                    <Text style={styles.loginButtonText}>Se connecter</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    container: {
        backgroundColor: Colors.darkgray,
        flex:1,
    },
    logo:{
        width: 100,
        height: 100,
        marginTop:100,
        marginBottom: 70,
        alignSelf:'center'
    },
    input: {
        borderRadius: 5,
        marginRight: 40,
        marginLeft: 40,
        height: 40,
        backgroundColor: 'white',
        marginBottom: 20,
        color: Colors.black,
        paddingHorizontal: 15,
    },
    loginButtonContainer: {
        borderRadius: 5,
        marginRight: 40,
        marginLeft: 40,
        justifyContent: 'center',
        backgroundColor: Colors.blue,
        paddingVertical: 7

    },
    loginButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }

}

export default Login;