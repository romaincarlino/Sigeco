import React, {Component} from 'react';
import {BackHandler, Alert, FlatList, View, TouchableOpacity, ToastAndroid} from 'react-native';
import ListItem_TestsList from '../components/ListItem_TestsList';
import Images from '../constants/Images';
import NavBar from '../components/NavBar';

class TestsList extends Component {

    static navigationOptions = {header: null};

    params = this.props.navigation.state.params;

    constructor(props) {
        super(props);
        this.state = {
            tests: null,
            contenu_tests: null,
            points_cle: null,
            login: null,
            password: null,
        }
    }

    componentDidMount() {
        this.setState({
            tests: this.params.tests,
            contenu_tests: this.params.contenu_tests,
            points_cle: this.params.points_cle,
            login: this.params.login,
            password: this.params.password,
        })

        //block hardware back button
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        //block hardware back button
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    //block hardware black button
    handleBackButton() {
        return true; //instead of default function for hardware back button
    }


    renderItem(item, index) {
        for (var i = 0; i < this.state.contenu_tests.length; i++) {
            var ct = this.state.contenu_tests[i];
            if (ct.id_test == item.id_test) {
                return (
                    <TouchableOpacity onPress={() => this.onItemClick(item, index)}>
                        <ListItem_TestsList
                            item={item}
                            contenu_test={ct}
                            validateTest={this.validateTest}
                        />
                    </TouchableOpacity>
                );

            }
        }
    }

    onItemClick(item, positionInTests) {
        if (item.fait == '1') {
            Alert.alert(
                'Ce test a été validé',
                'Voulez-vous invalider et modifier ce test?',
                [
                    {
                        text: 'Effacer', onPress: () => {
                            //changer le "fait" et le commentaire
                            tests = this.state.tests;
                            tests[positionInTests].fait = '0';
                            tests[positionInTests].commentaire = '';
                            this.setState({
                                tests: tests
                            });

                            //on remet les points cle a zero
                            for (i = 0; i < this.state.points_cle.length; i++) {
                                point_cle = this.state.points_cle[i];
                                if (point_cle.id_test == item.id_test) {
                                    point_cle.value = null;
                                }
                            }


                        }
                    },
                    {
                        text: 'Modifier', onPress: () => {
                            //changer le "fait"
                            tests = this.state.tests;
                            tests[positionInTests].fait = '0';
                            this.setState({
                                tests: tests
                            });

                            this.goToTestPage(item, positionInTests);
                        }
                    },

                    {text: 'Annuler'},
                ],
            );
        } else {
            this.goToTestPage(item, positionInTests);
        }

    }

    goToTestPage(item, positionInTests) {
        //go to TestPage

        this.props.navigation.navigate('TestPage', {
            positionInTests: positionInTests,
            item: item,
            points_cle: this.state.points_cle,
            tests: this.state.tests,
            contenu_tests: this.state.contenu_tests,
            login: this.state.login,
            password: this.state.password
        })
    }

    sendDatas(context) {
        tab5 = [];
        tab4 = [];

        //on cree les donnees a envoyer
        for (var i = 0; i < context.state.tests.length; i++) {
            test = context.state.tests[i];
            if (test.fait == '1') {
                //complete tab 5
                tab5.push({
                    id: test.id,
                    token: test.token,
                    commentaire: test.commentaire,
                    fait: test.fait
                })

                // complete tab 4
                for (var j = 0; j < context.state.points_cle.length; j++) {
                    point_cle = context.state.points_cle[j];
                    if (point_cle.id_test == test.id_test) {

                        tab4.push({
                            id: test.id,
                            token: test.token,
                            id_point_cle: point_cle.id_point_cle,
                            score: point_cle.value
                        })
                    }
                }
            }
        }

        //mise en forme des donnees
        retour4 = '{\"retour\":' + JSON.stringify(tab4) + '}';
        retour5 = '{\"retour\":' + JSON.stringify(tab5) + '}';

        //envoi des donness

        //tab5
        fetch('https://app.sigeco.fr?', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body:
            "forms[id_client_identification]=" + context.state.login + "&" +
            "forms[pass_identification]=" + context.state.password + "&" +
            "robot=1972&" +
            "tab_mobile=5&" +
            "retour=" + retour5,
        })
            .then((response) => response.text())
            .then((responseText) => {
                //if {message : error} ou fail
                if (responseText.charAt(0) == '{') {
                    ToastAndroid.show('Echec de la synchronisation', ToastAndroid.LONG);
                }
                else {
                    message = JSON.parse(responseText.substring(1)).message;
                    if (message == 'ok') {
                        //tab 4
                        fetch('https://app.sigeco.fr?', {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/x-www-form-urlencoded',
                            }),
                            body:
                            "forms[id_client_identification]=" + context.state.login + "&" +
                            "forms[pass_identification]=" + context.state.password + "&" +
                            "robot=1972&" +
                            "tab_mobile=4&" +
                            "retour=" + retour4,
                        })
                            .then((response) => response.text())
                            .then((responseText) => {
                                //if {message : error} ou fail
                                if (responseText.charAt(0) == '{') {
                                    ToastAndroid.show('Echec de la synchronisation', ToastAndroid.LONG);
                                }
                                else {
                                    message = JSON.parse(responseText.substring(1)).message;
                                    if (message == 'ok') {
                                        ToastAndroid.show('Données synchronisées', ToastAndroid.LONG);

                                        //on supprime les test validés
                                        for (var i = 0; i < context.state.tests.length; i++) {
                                            test = context.state.tests[i];
                                            if (test.fait == '1') {
                                                tests = context.state.tests;
                                                tests.splice(i, 1);
                                                context.setState({
                                                    tests: tests
                                                })
                                            }
                                        }
                                    }
                                    else {
                                        ToastAndroid.show('Echec de la synchronisation', ToastAndroid.LONG);
                                    }
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                    }
                    else {
                        ToastAndroid.show('Echec de la synchronisation', ToastAndroid.LONG);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    back(context) {
        Alert.alert(
            'Déconnexion',
            'Voulez vous vraiment vous déconnecter? Toute sauvegarde non synchronisée sera perdue ',
            [
                {text: 'Oui', onPress: () => context.props.navigation.navigate("Login")},
                {text: 'Non'},
            ],
        );
    }

    render() {
        return (
            <View>
                <NavBar
                    title={'Choisir un Test'}
                    imageFunction={this.sendDatas}
                    context={this}
                    image={Images.cloud}
                    backFunction={this.back}
                />
                <FlatList
                    extraData={this.state}
                    data={this.state.tests}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

const styles = {};

export default TestsList;

