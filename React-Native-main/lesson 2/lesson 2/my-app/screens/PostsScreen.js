import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";



class PostsScreen extends React.Component{

    constructor(props){
        super(props);

        this.state={
            posts:[],

        };
    }


    async componentDidMount(){
        try{
            const response= await fetch("https://jsonplaceholder.typicode.com/posts");
            const jsonData = await response.json();

            this.setState({posts:jsonData});


        }catch(error){
            console.log("Error fetching posts;",error)
        }

    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=>(
                        <View style={styles.post}>
                            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                            <Text style={styles.body} numberOfLines={4}>{item.body}</Text>
                        </View>
                    )}
                >

                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#fff'
    },
    post: {
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        // Android elevation / iOS shadow
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0d47a1',
        marginBottom: 6,
        letterSpacing: 0.2,
        textTransform: 'capitalize',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 6,
        backgroundColor: '#e8f0fe'
    },
    body: {
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
        marginTop: 6,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#f7f8fa'
    }
});

export default PostsScreen;