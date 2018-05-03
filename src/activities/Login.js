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
            isLoading: 3,
            tests: null,
            contenu_tests: null,
            points_cle: null,
        };
    }

    tryLogin() {
        this.setState({
            isLoading: 0,
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
                        isLoading: 3,
                    });
                    ToastAndroid.show('Les identifiants ne sont pas corrects', ToastAndroid.SHORT);
                }
                else {
                    this.getTests();
                    this.getContenuTests();
                    this.getPointCles();

                    this.goToTests();

                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    //get tests (tab_mobile = 1)
    getTests() {
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
                    this.getTests();
                }
                else {
                    responseText = responseText.substring(1);
                    json = JSON.parse(responseText);
                    this.setState({
                        isLoading: this.state.isLoading + 1,
                        tests: json.tests
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    //get contenu_tests (tab_mobile = 2)
    getContenuTests() {
        fetch('https://app.sigeco.fr', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body:
            "forms[id_client_identification]=" + this.state.login + "&" +
            "forms[pass_identification]=" + this.state.password + "&" +
            "robot=1972&" +
            "tab_mobile=2",
        })
            .then((response) => response.text())
            .then((responseText) => {
                //if {message : error}
                if (responseText.charAt(0) == '{') {
                    this.getContenuTests();
                }
                else {
                    responseText = responseText.substring(1);
                    json = JSON.parse(responseText);
                    this.setState({
                        isLoading: this.state.isLoading + 1,
                        contenu_tests: json.contenu_tests,
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    //get tests (tab_mobile = 1)
    getPointCles() {
        fetch('https://app.sigeco.fr', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body:
            "forms[id_client_identification]=" + this.state.login + "&" +
            "forms[pass_identification]=" + this.state.password + "&" +
            "robot=1972&" +
            "tab_mobile=3",
        })
            .then((response) => response.text())
            .then((responseText) => {
                //if {message : error}
                if (responseText.charAt(0) == '{') {
                    this.getPointCles();
                }
                else {
                    responseText = responseText.substring(1);
                    json = JSON.parse(responseText);

                    this.setState({
                        isLoading: this.state.isLoading + 1,
                        points_cle: json.points_cle
                    })


                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    goToTests() {
        if(this.state.isLoading<3) {
            console.log(this.state.isLoading);
            window.setTimeout(() => this.goToTests(), 100);
        } else {
            this.props.navigation.navigate('TestsList', {
                    refresh: this.refreshFunction.bind(this),
                    tests: this.state.tests,
                    contenu_tests: this.state.contenu_tests,
                    points_cle: this.state.points_cle,
                }
            );
        }
    }

    refreshFunction() {
        this.setState({
            login: '',
            password: '',
            isLoading: false,
        })
    }

    render() {

        if (this.state.isLoading < 3) {
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