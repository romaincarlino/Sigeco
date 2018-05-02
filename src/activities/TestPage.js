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
            isLoading: true,
            points_cle: null,
        }
    }

    componentWillMount() {
        var points_cle_test = [];

        for (var i = 0; i < this.params.points_cle.length; i++) {
            var point_cle = this.params.points_cle[i];
            if (point_cle.id_test == this.params.id_test) {
                points_cle_test.push(point_cle);
            }
        }

        this.setState({
            isLoading:false,
            points_cle: points_cle_test
        })
    }

    renderItem(item) {
        return (
            <ListItem_TestPage
                item={item}
            />
        );
    }

    validateTest() {
        this.props.validateTest(this.params.id_test);
        this.props.navigation.navigate("TestsList");
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
            <View>
                <NavBar
                    title={this.params.title}
                    imageFunction={null}
                    image={Images.done}
                    nav={this.props.navigation}
                    backTitlePage={'TestsList'}/>
                <ScrollView>
                    <View style={styles.titleView}>
                        <Text style={styles.point}>Point</Text>
                        <Text style={styles.expectedResult}>Resultat attendu</Text>
                        <Text style={styles.validate}>Atteint</Text>
                    </View>
                    <FlatList
                        data={this.state.points_cle}
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