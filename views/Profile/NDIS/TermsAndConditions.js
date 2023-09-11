import React from 'react'
import { useState,useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import { CheckBox } from 'react-native-elements';
import { Ionicons } from "@expo/vector-icons";
import styles from '../ProfileSetting/profile.style';
import { FONT } from '../../../constants';
const { height, width } = Dimensions.get("window");

const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: 8,
      width: "92%",
      maxHeight: "80%",
      overflow:'hidden'
    },
    text: {
      fontSize: 16,
    },
  });

const TermsAndConditions = () => {
    
    const [modalVisible4, setModalVisible4] = useState(false);
    const [checked, setChecked] = useState(false);
    const toggleCheckbox = () => {
        setChecked(!checked);
      };

  return (
    <SafeAreaView>
         <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            setModalVisible4(false);
            setChecked(false)
          }}>
          <View style={styles2.modalContainer}>
            <View style={styles2.modalContent}>
              <ScrollView>
                <View className="flex-row justify-between p-2" style={{ backgroundColor: '#10AFB9' }}>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#FFFFFF",
                      fontSize: 18,
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    Terms and Conditions
                  </Text>
                  <Ionicons
                    size={30}
                    name="close-outline"
                    style={{ color: "#FFFFFF" }}
                    onPress={() => setModalVisible4(false)}
                  />
                </View>
                <View className="p-4">
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 14,
                      alignItems: "center",
                      marginBottom: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Please read these terms and conditions carefully before using Our Service.
                  </Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    Interpretation and Definitions</Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 14,
                      alignItems: "center",
                      marginBottom: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Interpretation</Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 14,
                      alignItems: "center",
                      marginBottom: 10,
                      fontWeight: "bold"
                    }}
                  >
                    Definitions</Text>
                  <Text
                    className="text-md font-popMedium"
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    For the purposes of these Terms and Conditions:</Text>
                  <View className="gap-2 ml-1 pr-2">
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Application means the software program provided by the Company downloaded by You on any electronic device, named MyCareteam.Online</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Application Store means the digital distribution service operated and developed by Apple Inc. (Apple App Store) or Google Inc. (Google Play Store) in which the Application has been downloaded.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Account means a unique account created for You to access our Service or parts of our Service.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Country refers to: Victoria, Australia</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Four Square Venture Holdings , 3 Bravo Loop, Pakenham, Victoria, 3810.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Content refers to content such as text, images, or other information that can be posted, uploaded, linked to or otherwise made available by You, regardless of the form of that content.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Feedback means feedback, innovations or suggestions sent by You regarding the attributes, performance or features of our Service.Service refers to the Application.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Terms and Conditions (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Third-party Social Media Service means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</Text></View>
                    <Text className='font-popMedium' >Acknowledgment</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs'> These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs'> Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs'> By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs'> You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs'> Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.</Text></View>
                    <Text className='font-popMedium' >User Accounts</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service. You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a Third-Party Social Media Service.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than You without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.</Text></View>
                    <Text className='font-popMedium' >Content</Text>
                    <Text className='font-popMedium' >Your Right to Post Content</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Our Service allows You to post Content. You are responsible for the Content that You post to the Service, including its legality, reliability, and appropriateness.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > By posting Content to the Service, You grant Us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of Your rights to any Content You submit, post or display on or through the Service and You are responsible for protecting those rights. You agree that this license includes the right for Us to make Your Content available to other users of the Service, who may also use Your Content subject to these Terms.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > You represent and warrant that: (i) the Content is Yours (You own it) or You have the right to use it and grant Us the rights and license as provided in these Terms, and (ii) the posting of Your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > The Company is not responsible for the content of the Service's users. You expressly understand and agree that You are solely responsible for the Content and for all activity that occurs under your account, whether done so by You or any third person using Your account.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > You may not transmit any Content that is unlawful, offensive, upsetting, intended to disgust, threatening, libelous, defamatory, obscene or otherwise objectionable. Examples of such objectionable Content include, but are not limited to, the following:</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Unlawful or promoting unlawful activity.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Defamatory, discriminatory, or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, national/ethnic origin, or other targeted groups.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Spam, machine – or randomly – generated, constituting unauthorized or unsolicited advertising, chain letters, any other form of unauthorized solicitation, or any form of lottery or gambling.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Containing or installing any viruses, worms, malware, trojan horses, or other content that is designed or intended to disrupt, damage, or limit the functioning of any software, hardware or telecommunications equipment or to damage or obtain unauthorized access to any data or other information of a third person.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Infringing on any proprietary rights of any party, including patent, trademark, trade secret, copyright, right of publicity or other rights.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Impersonating any person or entity including the Company and its employees or representatives.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Violating the privacy of any third person.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > False information and features.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > The Company reserves the right, but not the obligation, to, in its sole discretion, determine whether or not any Content is appropriate and complies with these Terms, refuse or remove this Content. The Company further reserves the right to make formatting and edits and change the manner of any Content. The Company can also limit or revoke the use of the Service if You post such objectionable Content. As the Company cannot control all content posted by users and/or third parties on the Service, you agree to use the Service at your own risk. You understand that by using the Service You may be exposed to content that You may find offensive, indecent, incorrect or objectionable, and You agree that under no circumstances will the Company be liable in any way for any content, including any errors or omissions in any content, or any loss or damage of any kind incurred as a result of your use of any content.</Text></View>
                    <Text className='font-popMedium' >Content Backups</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Although regular backups of Content are performed, the Company does not guarantee there will be no loss or corruption of data.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Corrupt or invalid backup points may be caused by, without limitation, Content that is corrupted prior to being backed up or that changes during the time a backup is performed.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > The Company will provide support and attempt to troubleshoot any known or discovered issues that may affect the backups of Content. But You acknowledge that the Company has no liability related to the integrity of Content or the failure to successfully restore Content to a usable state.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > You agree to maintain a complete and accurate copy of any Content in a location independent of the Service.</Text></View>
                    <Text className='font-popMedium' >Copyright Policy</Text>
                    <Text className='font-popMedium' >Intellectual Property Infringement</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > We respect the intellectual property rights of others. It is Our policy to respond to any claim that Content posted on the Service infringes a copyright or other intellectual property infringement of any person.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > If You are a copyright owner, or authorized on behalf of one, and You believe that the copyrighted work has been copied in a way that constitutes copyright infringement that is taking place through the Service, You must submit Your notice in writing to the attention of our copyright agent via email at{" "}</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > You may be held accountable for damages (including costs and attorneys' fees) for misrepresenting that any Content is infringing Your copyright.</Text></View>
                    <Text>DMCA Notice and DMCA Procedure for Copyright Infringement Claims</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright's interest.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > A description of the copyrighted work that You claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Identification of the URL or other specific location on the Service where the material that You claim is infringing is located.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Your address, telephone number, and email address.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > A statement by You that You have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > A statement by You, made under penalty of perjury, that the above information in Your notice is accurate and that You are the copyright owner or authorized to act on the copyright owner's behalf.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' >You can contact our copyright agent via email at{" "} Upon receipt of a notification, the Company will take whatever action, in its sole discretion, it deems appropriate, including removal of the challenged content from the Service.</Text></View>
                    <Text>Intellectual Property</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors.</Text></View>
                    <Text>Your Feedback to Us</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > You assign all rights, title and interest in any Feedback You provide the Company. If for any reason such assignment is ineffective, You agree to grant the Company a non-exclusive, perpetual, irrevocable, royalty free, worldwide right and license to use, reproduce, disclose, sub-license, distribute, modify and exploit such Feedback without restriction.</Text></View>
                    <Text>Links to Other Websites</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</Text></View>
                    <Text>Termination</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > We may terminate or suspend Your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Upon termination, Your right to use the Service will cease immediately. If You wish to terminate Your Account, You may simply discontinue using the Service.</Text></View>
                    <Text>Limitation of Liability</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall beo the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but noto, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }}>•</Text><Text className='font-popMedium text-xs' > Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In theseach party's liability will be limited to the greatest extent permitted by law.</Text></View>
                    <Text className='font-popMedium' > &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, theon its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or
                      reliability standards or be error free or that any errors or defects
                      can or will be corrected.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > Without limiting the foregoing, neither the Company nor any of the
                      company's provider makes any representation or warranty of any kind,
                      express or implied: (i) as to the operation or availability of the
                      Service, or the information, content, and materials or products
                      included thereon; (ii) that the Service will be uninterrupted or
                      error-free; (iii) as to the accuracy, reliability, or currency of any
                      information or content provided through the Service; or (iv) that the
                      Service, its servers, the content, or e-mails sent from or on behalf
                      of the Company are free of viruses, scripts, trojan horses, worms,
                      malware, timebombs or other harmful components. </Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > Some jurisdictions do not allow the exclusion of certain types of
                      warranties or limitations on applicable statutory rights of a
                      consumer, so some or all of the above exclusions and limitations may
                      not apply to You. But in such a case the exclusions and limitations
                      set forth in this section shall be applied to the greatest extent
                      enforceable under applicable law.</Text></View>
                    <Text>Governing Law</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > The laws of the Country, excluding its conflicts of law rules, shall
                      govern this Terms and Your use of the Service. Your use of the
                      Application may also be subject to other local, state, national, or
                      international laws.</Text></View>
                    <Text>Disputes Resolution</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > If You have any concern or dispute about the Service, You agree to
                      first try to resolve the dispute informally by contacting the Company.</Text></View>
                    <Text>For European Union (EU) Users</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > If You are a European Union consumer, you will benefit from any
                      mandatory provisions of the law of the country in which you are
                      resident in.</Text></View>
                    <Text>United States Legal Compliance</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > You represent and warrant that (i) You are not located in a country
                      that is subject to the United States government embargo, or that has
                      been designated by the United States government as a &quot;terrorist
                      supporting&quot; country, and (ii) You are not listed on any United
                      States government list of prohibited or restricted parties.</Text></View>
                    <Text>Severability and Waiver</Text>
                    <Text>Severability</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > If any provision of these Terms is held to be unenforceable or
                      invalid, such provision will be changed and interpreted to accomplish
                      the objectives of such provision to the greatest extent possible under
                      applicable law and the remaining provisions will continue in full
                      force and effect.</Text></View>
                    <Text>Waiver</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > Except as provided herein, the failure to exercise a right or to
                      require performance of an obligation under these Terms shall not
                      effect a party's ability to exercise such right or require such
                      performance at any time thereafter nor shall the waiver of a breach
                      constitute a waiver of any subsequent breach.</Text></View>
                    <Text>Translation Interpretation</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > These Terms and Conditions may have been translated if We have made
                      them available to You on our Service. You agree that the original
                      English text shall prevail in the case of a dispute.</Text></View>
                    <Text>Changes to These Terms and Conditions</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > We reserve the right, at Our sole discretion, to modify or replace
                      these Terms at any time. If a revision is material We will make
                      reasonable efforts to provide at least 30 days' notice prior to any
                      new terms taking effect. What constitutes a material change will be
                      determined at Our sole discretion.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > By continuing to access or use Our Service after those revisions
                      become effective, You agree to be bound by the revised terms. If You
                      do not agree to the new terms, in whole or in part, please stop using
                      the website and the Service.</Text></View>
                    <Text>Contact Us</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > If you have any questions about these Terms and Conditions, You can
                      contact us:</Text></View>
                    <Text> By email:{" "}</Text>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > To the maximum extent permitted by applicable fav, in no event shall
                      the Company of ts supplies be liable for any special, incidental,
                      indirect, or consequential damages whatsoever (including, but not
                      limited to, damages for loss of profit, loss of data or other
                      information, for business interruption, for personal injury, loss of
                      privacy arising out of or in any way related to the use of or inabilty
                      to use the Service, third-party software andor third-party hardware
                      used with the Service, of otherwise in connection with any provision
                      of this Terms), even i the Company or any supplier has been advised of
                      the possibilty of such damages and even i the remedy fais of its
                      essential purpose.</Text></View>
                    <View className="flex-row"><Text style={{ marginRight: 4, fontWeight: "bold" }} >•</Text><Text className='font-popMedium text-xs' > Some states do not allow the exclusion of implied warranties or
                      limitation of ability for incidental or consequential damages, which
                      means that some of the above limitations may not apply. In these
                      states, each partys liability will be limited to the greatest extent
                      permitted by law.</Text></View>
                  </View>
                  <CheckBox
                    title="I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS AGREEMENT BY
                      READING IT BEFORE ACCEPTING THE TERMS AND CONDITIONS"
                    checked={checked}
                    onPress={toggleCheckbox}
                  />
                </View>
                {(checked) ?
                  <TouchableOpacity
                    onPress={() => setModalVisible4(false)}
                    style={[
                      styles.btnPrimary,
                      {
                        width: width * 0.8,
                        alignSelf: "center",
                        marginVertical: height * 0.02,
                      },
                    ]}>
                    <Text
                      style={styles.btnTxt}
                    >
                      Accept
                    </Text>
                  </TouchableOpacity> :
                  <TouchableOpacity
                    onPress={() => setModalVisible4(false)}
                    disabled={true}
                    style={[
                      styles.btnDisable,
                      {
                        width: width * 0.8,
                        alignSelf: "center",
                        marginVertical: height * 0.02,
                      },
                    ]}>
                    <Text
                      style={styles.btnTxt}
                    >
                      Accept
                    </Text>
                  </TouchableOpacity>
                }
              </ScrollView>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  )
}

export default TermsAndConditions