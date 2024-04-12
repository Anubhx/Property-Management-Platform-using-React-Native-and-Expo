import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';

enum Strategy {
  Google = 'oauth_google',
  Github = 'oauth_github',
  Facebook = 'oauth_facebook',
}

const LoginPage = () => {
  // Assuming useWarmUpBrowser is properly defined and imported
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: Strategy.Google });
  const { startOAuthFlow: githubAuth } = useOAuth({ strategy: Strategy.Github });
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: Strategy.Facebook });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleBackPress();
        return true; // Prevent default behavior (exiting the app)
      }
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      "Login Required",
      "Please log in to continue.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Github]: githubAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        if (setActive) {
          setActive({ session: createdSessionId });
        }
        router.back();
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={{ position: 'absolute', top: 20, right: 20 }}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <TextInput autoCapitalize="none" placeholder="Email" style={[defaultStyles.inputField, styles.inputField]} />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.separatorView}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.separatorLine} />
      </View>

      <View style={styles.authOptionsContainer}>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Github)}>
          <Ionicons name="logo-github" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Github</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    padding: 26,
  },
  inputField: {
    marginBottom: 30,
  },
  separatorView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  separatorLine: {
    flex: 1,
    borderBottomColor: Colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separatorText: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 16,
    marginHorizontal: 10, // Adjusted for proper spacing
  },
  authOptionsContainer: {
    // gap property removed, replaced with margin in btnOutline for spacing
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 20, // Added for spacing between buttons
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
    marginLeft: 10, // Added for spacing between icon and text
  },
});

export default LoginPage;
