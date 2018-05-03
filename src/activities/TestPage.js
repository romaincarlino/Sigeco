import React, {Component} from 'react';
import {ScrollView, ActivityIndicator, TouchableHighlight, FlatList, TextInput, Text, View, Button} from 'react-native';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import ListItem_TestPage from '../components/ListItem_TestPage';
import NavBar from '../components/NavBar';

class TestPage extends Component {

    params = this.props.navigation.state.params;

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            tests: null,
            contenu_tests: null,
            points_cle: null,
            points_cle_test: null,

        }
    }

    componentDidMount() {

        //Take only point_cle associate with the test
        var points_cle_test = [];

        for (var i = 0; i < this.params.points_cle.length; i++) {
            var point_cle = this.params.points_cle[i];
            if (point_cle.id_test == this.params.id_test) {
                points_cle_test.push(point_cle);
            }
        }

        this.setState({
            tests: this.params.tests,
            contenu_tests: this.params.contenu_tests,
            points_cle: this.params.points_cle,
            points_cle_test: points_cle_test
        })
    }

    renderItem(item) {
        return (
            <ListItem_TestPage
                item={item}
            />
        );
    }

    back(context) {
        context.props.navigation.navigate("TestsList", {
            points_cle: context.state.points_cle,
            tests: context.state.tests,
            contenu_tests: context.state.contenu_tests,
        });
    }

    validateTest(context) {
        //context.props.navigation.navigate("TestsList");
        alert("fct pas encore implementee");
    }

    render() {
        return (
            <View>
                <NavBar
                    title={this.params.title}
                    imageFunction={this.validateTest}
                    image={Images.doneWhite}
                    context={this}
                    backFunction={this.back}/>
                <ScrollView>
                    <View style={styles.titleView}>
                        <Text style={styles.point}>Point</Text>
                        <Text style={styles.expectedResult}>Resultat attendu</Text>
                        <Text style={styles.validate}>Atteint</Text>
                    </View>
                    <FlatList
                        data={this.state.points_cle_test}
                        renderItem={({item}) => this.renderItem(item)}
                        keyExtractor={item => item.id_point_cle}
                    />
                    <Text style={styles.comment}>Commentaires</Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        multiline={true}
                        style={styles.input}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    titleView: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
    },
    point: {
        flex: 2,
        color: Colors.black,
        fontWeight: 'bold'
    },
    expectedResult: {
        flex: 6,
        color: Colors.black,
        fontWeight: 'bold'
    },
    validate: {
        flex: 3,
        color: Colors.black,
        fontWeight: 'bold'
    },
    comment: {
        color: Colors.black,
        fontWeight: 'bold',
        margin: 10,
    },
    input: {
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        height: 100,
        marginBottom: 100,
    }


};

export default TestPage;