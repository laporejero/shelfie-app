import { StyleSheet, Text, View, Image } from 'react-native'
import Logo from '../assets/img/logo_light.png'

const Home = () => {
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.img} />
            <Text style={styles.title}>The Number 1</Text>
            <Text style={{ marginTop: 10, marginBottom: 30 }}>
                Reading List App
            </Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        marginVertical: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
})