import React, {Component} from 'react';
import {ActivityIndicator, FlatList, View, Text, TouchableHighlight} from 'react-native';
import ListItem_TestsList from '../components/ListItem_TestsList';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import NavBar from '../components/NavBar';

class TestsList extends Component {

    static navigationOptions = {
        header: null,
    };


    params = this.props.navigation.state.params;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: 0,
            tests: null,
            contenu_tests: null,
            points_cle: null,

        }
    }

    componentDidMount() {
        this.getTests();
        this.getContenuTests();
        this.getPointCles();
        //this.params.refresh();
    }

    //get tests (tab_mobile = 1)
    getTests() {
        fetch('https://app.sigeco.fr', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body:
            "forms[id_client_identification]=testmobile&" +
            "forms[pass_identification]=tbrtdEUSQ!37&" +
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
            "forms[id_client_identification]=testmobile&" +
            "forms[pass_identification]=tbrtdEUSQ!37&" +
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
            "forms[id_client_identification]=testmobile&" +
            "forms[pass_identification]=tbrtdEUSQ!37&" +
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
                        isLoading: this.state.isLoading++,
                        points_cle: json.points_cle
                    })


                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    renderItem(item) {
        for (var i = 0; i < this.state.contenu_tests.length; i++) {
            var ct = this.state.contenu_tests[i];
            if (ct.id_test == item.id_test) {
                if (item.fait == '1') {
                    return (
                        <ListItem_TestsList
                            item={item}
                            contenu_test={ct}
                            validateTest={this.validateTest}
                        />
                    );
                } else {
                    return (
                        <TouchableHighlight onPress={() => this.onItemClick(item)}>
                            <ListItem_TestsList
                                item={item}
                                contenu_test={ct}
                                validateTest={this.validateTest}
                            />
                        </TouchableHighlight>
                    );
                }
            }
        }
    }

    onItemClick(item) {
        this.props.navigation.navigate('TestPage', {
            id_test: item.id_test,
            title: item.Nom_prenom + " - " + item.Titre_du_test,
            points_cle: this.state.points_cle,

        });
    }

    sendDatas() {
        alert('Fonction pas encore implementee');
    }

    validateTest(id_test) {

    }

    render() {

        if (this.state.isLoading < 2) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }


        return (
            <View>
                <NavBar
                    title={'Choisir un Test'}
                    imageFunction={this.sendDatas}
                    image={Images.cloud}
                    nav={this.props.navigation}
                    backTitlePage={'Login'}/>
                <FlatList
                    data={this.state.tests}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={item => item.id}
                />

            </View>
        );
    }
}

const styles = {};

export default TestsList;

