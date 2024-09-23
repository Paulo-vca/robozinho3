// import { Button } from "@/components/Button"
// import { useAuth, useUser } from "@clerk/clerk-expo"
// import {Text, View, StyleSheet, Image} from "react-native"
// import { SignIn } from '@clerk/clerk-expo/web'

// export default function Home(){
//     const {user} = useUser()
//     const {signOut} = useAuth()

//     return(
//         <View style={style.container}>
//             <Image source={{uri: user?.imageUrl}} style={style.image}/>
//             <Text style={style.text}>{user?.fullName}</Text>
//             <Button icon="exit" title="Sair" onPress={() => signOut ()}/>
//         </View>
//     )

// }

// const style = StyleSheet.create({
//     container:{
//         flex:1,
//         padding:32,
//         justifyContent: "center",
//         alignItems:"center",
//         gap:12,
//     },
//     text:{
//         color:"#fff",
//         fontSize: 18,
//         fontWeight:"bold"
//     },
//     image:{
//         width:92,
//         height:92,
//         borderRadius:12
//     }


// })