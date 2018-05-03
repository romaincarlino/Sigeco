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
            tests: this.state.tests,
            contenu_tests: this.state.contenu_tests,

        });
    }

    sendDatas() {
        alert('Fonction pas encore implementee');
    }

    back(context){
        context.props.navigation.navigate("Login");
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

const styles = {};

export default TestsList;

