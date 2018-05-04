import React, {Component} from 'react';
import {Alert, ActivityIndicator, FlatList, View, Text, TouchableOpacity} from 'react-native';
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
                    {text: 'Oui', onPress: () => {
                            //changer le "fait"
                            item.fait = '0';
                            this.state.tests[positionInTests].fait = '0';

                            this.goTotestPage(item, positionInTests);
                        }
                    },
                    {text: 'Non'},
                ],
            );
        } else {
            this.goTotestPage(item, positionInTests);
        }

    }

    goTotestPage(item, positionInTests) {
        //go to TestPage
        this.props.navigation.navigate('TestPage', {
            positionInTests: positionInTests,
            item: item,
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
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

const styles = {};

export default TestsList;

