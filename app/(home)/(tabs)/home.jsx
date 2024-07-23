import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import React, { useContext, useState } from "react";
import StanderView from "../../../components/shared/StanderView";
import ServiceCard from "../../../components/service/ServiceCard";
import { UserLocationContext } from "../../../provider/UserLocationProvider/UserLocationProvider";
import { useTranslation } from "react-i18next";
import i18next, { languageResources } from "../../../services/i18next";
import languageList from "../../../services/languageList";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LanguageContext } from "../../../provider/languageProvider/languageProvider";
// import RNRestart from "react-native-restart";

const Home = () => {
  const [show, setShow] = useState(false);
  const { location } = useContext(UserLocationContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();
  const changeLang = async (languageParam) => {
    setLanguage(languageParam);
    await AsyncStorage.setItem("lang", languageParam);
    setShow(false);
  };

  return (
    // <Text>{language}</Text>
    <StanderView>
      <Modal
        visible={show}
        onRequestClose={() => setShow(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View>
          <FlatList
            data={Object.keys(languageList)}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => changeLang(item)}>
                <Text>{languageList[item].nativeName}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <Button title="Close" onPress={() => setShow(false)} />
      </Modal>
      <View>
        <TouchableOpacity
          onPress={() => {
            setShow(true);
          }}
        >
          <Text>Change Language</Text>
        </TouchableOpacity>
        <Text>{t("test")}</Text>
      </View>
      <ServiceCard location={location} />
    </StanderView>
  );
};

export default Home;
