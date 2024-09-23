// import { useEffect, useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import * as WebBrowser from "expo-web-browser"
// import * as Liking from "expo-linking"
// import { useOAuth } from "@clerk/clerk-expo";
// import { Button } from "@/components/Button";


// WebBrowser.maybeCompleteAuthSession()


// export default function SignIn() {
//   const [isLoading, setIsLoading] = useState(false)

//   const googleOAuth = useOAuth ({strategy:"oauth_google"})

//   async function onGoogleSignIn(){
//     try{
//       setIsLoading(true)

//       const redirectUrl = Liking.createURL("/")

//       const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl })

//       if(oAuthFlow.authSessionResult?.type === "success"){
//         if(oAuthFlow.setActive){
//           await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId })
//         }
//       } else {
//         setIsLoading(false)
//       }

//     } catch (error) {
//     console.log(error)
//     setIsLoading(false)
//   }


//   useEffect(() => {
//     WebBrowser.warmUpAsync()


//     return () => {
//       WebBrowser.coolDownAsync()
//     }
//   },[])


//   return (
//     <View style={style.container}>
//         <Text style={style.title}>Entrar</Text>
//         <Button 
//           icon="logo-google" 
//           title="Entrar com Google" 
//           onPress={onGoogleSignIn} 
//           isLoading={isLoading}                                                                                      
//           />
//     </View>
//   )
// }


// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     gap: 12,
//     height: 50,
//     margin: 20,
//   },
//   title:{
//     color:"#fff",
//     fontSize: 22,
//     fontWeight: "bold",
//   },
// })}