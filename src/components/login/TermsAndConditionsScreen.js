import React from 'react';
import { ScrollView, Image, SafeAreaView, StyleSheet, Text, Pressable,TextInput, TouchableOpacity, View, Modal, Button } from "react-native";

function TermsAndConditionsScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
        <Text style={styles.MainHeader}>Terms of Service</Text>
        <Text style={styles.subtitle}>
        {'\n'} 
        Welcome to RunAnyWhere!{'\n\n'}
        These terms and conditions outline the rules and regulations for the use of the RunAnyWhere application, developed by NTU students. By accessing this app, we assume you accept these terms and conditions. Do not continue to use RunAnyWhere if you do not agree to all of the terms and conditions stated on this page.{'\n\n'}
        <Text style={styles.Header}>A. License</Text>
        {'\n'}
        Unless otherwise stated, RunAnyWhere and/or its licensors own the intellectual property rights for all material on RunAnyWhere. All intellectual property rights are reserved. You may access this from RunAnyWhere for your own personal use subjected to restrictions set in these terms and conditions.{'\n\n'}
        <Text style={styles.Header}>B. Restrictions</Text>   
        {'\n'}
        You must not:{'\n'}
        1. Republish material from RunAnyWhere{'\n'}
        2. Sell, rent or sub-license material from RunAnyWhere{'\n'}
        3. Reproduce, duplicate or copy material from RunAnyWhere{'\n'}
        4. Redistribute content from RunAnyWhere{'\n\n'}
        <Text style={styles.Header}>C. Hyperlinking to our Content</Text>
        {'\n'}
        The following organizations may link to our app without prior written approval:{'\n\t'}
        1.Government agencies{'\n\t'}
        2.Search engines{'\n\t'}
        3.News organizations{'\n\t'}
        4.Online directory distributors{'\n\n'}
        These organizations may link to our home page, to publications, or to other app information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.
        {'\n\n'}
        <Text style={styles.Header}> D. Privacy Policy</Text>{'\n'}
        Your privacy is important to us. It is RunAnyWhere's policy to respect your privacy regarding any information we may collect from you across our app. For more detailed information, please refer to our Privacy Policy section below. {'\n\n'}
        <Text style={styles.Header}>E. Governing Law</Text>
        {'\n'}
        These terms and conditions are governed by and construed in accordance with the laws of Singapore and you irrevocably submit to the exclusive jurisdiction of the courts in that location.{'\n\n'}
        <Text style={styles.Header}>F. Changes</Text>
        {'\n'}
        We reserve the right, at our sole discretion, to modify or replace these terms at any time. By continuing to access or use our app after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the app.{'\n\n'}

        <Text style={styles.MainHeader}>Privacy Policy</Text>
        {'\n'}
        Your privacy is important to us. It is RunAnyWhere's policy to respect your privacy regarding any information we may collect while operating our app. This Privacy Policy applies to RunAnyWhere (hereinafter, "us", "we", or "RunAnyWhere"). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the app.{'\n\n'}
        
        <Text style={styles.Header}>A. Information We Collect</Text>
        {'\n'}
        We only collect personal information that is relevant to the purpose of our app. This information allows us to provide you with a customized and efficient experience. We collect the following types of information from our users:{'\n\n'}
        1. Personal Information: When registering for the app, you may be asked to enter your name, email address, mailing address, phone number, or other details to help you with your experience.{'\n\n'}
        2. Device Information: We may collect information about the device you are using to access our app, including the hardware model, operating system version, unique device identifiers, and mobile network information.{'\n\n'}
        3. Usage Information: We may collect information about how you use our app, such as the pages you visit, the features you use, and the actions you take.{'\n\n'}

        <Text style={styles.Header}>B. How We Use Information</Text>
        {'\n'}
        We may use the information we collect from you in the following ways:{'\n\n'}
        1. To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.{'\n\n'}
        2. To improve our app in order to better serve you.{'\n\n'}
        3. To allow us to better service you in responding to your customer service requests.{'\n\n'}
        4. To administer a contest, promotion, survey or other app feature.{'\n\n'}
        5. To send periodic emails regarding your order or other products and services.
        {'\n\n'}

        <Text style={styles.MainHeader}>Contact Us</Text>
        
        {'\n'}
        If you have any questions about this Privacy Policy or our practices, please contact us at: {'\t'} [rwu006@e.ntu.edu.sg]{'\n\n\n\n\n\n\n\n'}
        </Text>
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  MainHeader: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 15,
    marginLeft: 30,
    marginRight: 25,
    marginBottom: 5,
    fontFamily: 'Baskerville-Bold',
    textAlign: 'center',
    fontStyle: 'italic', 
    textDecorationLine: 'underline'
  },
  
  Header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 25,
    marginBottom: 0,
    fontFamily: 'Baskerville-Bold',
    textAlign: 'left'
  },

  subtitle:{
      color: 'grey',
      fontSize: 14,
      marginTop: 0,
      marginLeft: 30,
      marginRight: 25,
      marginBottom: 5,
      textAlign: 'justify'
  },
  registerText: {
      fontSize: 16,
      fontWeight: '800',
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Arial'
  },
});


export default TermsAndConditionsScreen;
