import React, {Component} from 'react';
import {Alert, ActivityIndicator, FlatList, View, Text, TouchableHighlight} from 'react-native';
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
        }
    }

    componentDidMount() {
        this.setState({
            tests: this.params.tests,
            contenu_tests: this.params.contenu_tests,
            points_cle: this.params.points_cle,
        })
    }

    renderItem(item) {
        for (var i = 0; i < this.state.contenu_tests.length; i++) {
            var ct = this.state.contenu_tests[i];
            if (ct.id_test == item.id_test) {
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

    onItemClick(item) {
        //go to TestPage
        this.props.navigation.navigate('TestPage', {
            id_test: item.id_test,
            title: item.Nom_prenom + " - " + item.Titre_du_test,
            points_cle: this.state.points_cle,
            tests: this.state.tests,
            contenu_tests: this.state.contenu_tests,
        })
    }

    sendDatas() {
        alert('Fonction pas encore implementee');
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
                    data={this.state.tests}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

const
    styles = {};

export default TestsList;

