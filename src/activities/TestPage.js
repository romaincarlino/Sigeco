import React, {Component} from 'react';
import {
    Alert,
    ScrollView,
    ActivityIndicator,
    TouchableHighlight,
    FlatList,
    TextInput,
    Text,
    View,
    Button
} from 'react-native';
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
            commentaire: null,
            tests: null,
            contenu_tests: null,
            points_cle: null,
            points_cle_test: null,

        }
    }

    componentDidMount() {
        //Separate point_cle associated with the test
        var points_cle_test = [];

        for (var i = 0; i < this.params.points_cle.length; i++) {
            var point_cle = this.params.points_cle[i];
            if (point_cle.id_test == this.params.item.id_test) {
                points_cle_test.push(point_cle);
            }
        }

        //get commentaire
        //commentaire1 = this.params.commentaire !== undefined ? this.params.commentaire : '';

        if (this.params.tests[this.params.positionInTests].commentaire == undefined) {
            this.params.tests[this.params.positionInTests]['commentaire'] = '';
        }

        this.setState({
            commentaire: this.params.tests[this.params.positionInTests].commentaire,
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

    backToTestsList(context) {

        //charger les nouvelles donnees
        context.state.tests[context.params.positionInTests].commentaire = context.state.commentaire;

        context.props.navigation.navigate("TestsList", {
            points_cle: context.state.points_cle,
            tests: context.state.tests,
            contenu_tests: context.state.contenu_tests,
        });
    }


    validateTest(context) {
        //changer le "fait"
        context.state.tests[context.params.positionInTests].fait = '1';

        //changer de page et envoyer donnees modifiees
        context.backToTestsList(context);
    }

    render() {
        return (
            <View>
                <NavBar
                    title={this.params.item.Nom_prenom + " - " + this.params.item.Titre_du_test}
                    imageFunction={this.validateTest}
                    image={Images.doneWhite}
                    context={this}
                    backFunction={this.backToTestsList}/>
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
                        onChangeText={(commentaire) => {
                            this.setState({commentaire})
                        }}>
                        {this.state.commentaire}
                    </TextInput>
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
        marginLeft: 10,
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
        textAlignVertical: 'top',
    }


};

export default TestPage;