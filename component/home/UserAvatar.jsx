import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "../../util/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { LOGO_IMAGE } from "../../constants/images";
import { router } from "expo-router";
import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
import { colors } from "../../constants";
import ExpoImage from "../shared/ExpoImage";

export default function UserAvatar() {
  const { userAvatar, userName } = useContext(userAuthContext);
  const [loading, setLoading] = useState(true);
  const [myImage, setMyImage] = useState(null);

  useEffect(() => {
    if (userAvatar) {
      const image = cld.image(userAvatar);
      image.resize(
        thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
      );
      setMyImage(image);
    } else {
      setMyImage(null);
    }
    setLoading(false); // Set loading to false after processing the image
  }, [userAvatar]);

  return (
    <View style={styles.avatarContainer}>
      <View style={styles.imageContainer}>
        {loading ? (
          <ActivityIndicator
            animating={loading}
            color={colors.primary}
            size="small"
          />
        ) : (
          <Pressable onPress={() => router.push("/(profile)/profile")}>
            {myImage ? (
              <AdvancedImage
                cldImg={myImage}
                style={styles.image}
                onLoadEnd={() => setLoading(false)}
              />
            ) : (
              <ExpoImage image={LOGO_IMAGE} style={styles.image} />
            )}
          </Pressable>
        )}
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Hi.. </Text>
        <Text>{userName || "No Name"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    marginLeft: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  userInfo: {
    alignItems: "flex-start",
    alignSelf: "flex-end",
  },
  userName: {
    fontWeight: "bold",
  },
});

// import {
//   ActivityIndicator,
//   Image,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import React, { useContext, useState } from "react";
// import { AdvancedImage } from "cloudinary-react-native";
// import { cld } from "../../util/cloudinary";
// import { thumbnail } from "@cloudinary/url-gen/actions/resize";
// import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
// import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
// import { LOGO_IMAGE } from "../../constants/images";
// import { router } from "expo-router";
// import { userAuthContext } from "../../provider/userAuth/userAuthProvider";
// import { colors } from "../../constants";
// import ExpoImage from "../shared/ExpoImage";

// export default function UserAvatar() {
//   const { userAvatar, userName } = useContext(userAuthContext);
//   const [loading, setLoading] = useState(true);
//   console.log({ userAvatar, userName });
//   let myimage;
//   if (userAvatar) {
//     myimage = cld.image(userAvatar);
//     myimage.resize(
//       thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
//     );
//   }
//   // if (!myimage) {
//   //   setLoading(false);
//   // }

//   return (
//     <View style={styles.avatarContainer}>
//       {loading && (
//         <View style={styles.imageContainer}>
//           <ActivityIndicator
//             animating={loading}
//             color={colors.primary}
//             size="small"
//           />
//           {/* <Image source={{ uri: LOGO_IMAGE }} style={styles.image} /> */}
//         </View>
//       )}
//       {!loading && (
//         <Pressable onPress={() => router.push("/(profile)/profile")}>
//           <View style={styles.imageContainer}>
//             {myimage ? (
//               <AdvancedImage
//                 cldImg={myimage}
//                 style={styles.image}
//                 onLoadEnd={() => setLoading(false)}
//               />
//             ) : (
//               <ExpoImage image={LOGO_IMAGE} style={styles.image} />
//             )}
//           </View>
//         </Pressable>
//       )}
//       <View
//         style={{
//           alignItems: "start",
//           alignSelf: "flex-end",
//         }}
//       >
//         <Text style={{ fontWeight: "bold" }}>Hi.. </Text>
//         <Text>{userName || "No Name"}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   avatarContainer: {
//     marginLeft: 10,
//     alignItems: "center",
//     flexDirection: "row",
//     gap: 10,
//   },
//   imageContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 50,
//     overflow: "hidden",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 0.5,
//   },
//   image: {
//     width: 40,
//     height: 40,
//     borderRadius: 50,
//   },
// });
