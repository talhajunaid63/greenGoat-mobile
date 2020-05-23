import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Header, Icon } from "react-native-elements";


export default class PrivacyPolicyScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={"#089D37"}
          leftComponent={
            <Icon
              name="menu"
              color="#fff"
              onPress={() => this.props.navigation.openDrawer()}
            />
          }
          centerComponent={{
            text: 'Privacy Policy',
            style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
          }}
        />
        <ScrollView style={{ flex: 1 }}>

          <Text style={styles.heading}>Last updated: March 31, 2020.</Text>
          <Text style={styles.heading}>User Agreement and Terms of Service</Text>
          <Text style={styles.heading}>Statement of User Rights (Privacy Policy) and Responsibilities </Text>
          <Text style={styles.paragraph}>
            This Statement of User Rights and Responsibilities ("Statement," "Terms") covers terms of service that governs our relationship with users and all those
  who share data with greenGoat (“We”, “Us”, “Our”, or “The Site”). By using or accessing The Site, you agree to this Statement, as updated from time to
  time in accordance with Section 6 below.
        </Text>
          <Text style={styles.heading}>1. Privacy</Text>
          <Text style={styles.paragraph}>
            We do not and will not share your information with anyone, whether they are a paid or unpaid associate. You acknowledge that you understand
and acknowledge our internal / application use of your data (described here and in “Privacy Policy” below).
</Text>

          <Text style={styles.heading}>2. Sharing your Content</Text>
          <Text style={styles.paragraph}>

            <Text >You own all the content or information you post on The Site or email Us.{"\n"}
              <Text style={{ fontWeight: "bold", }}>a</Text>.
                         For content that is covered by intellectual property rights, like photos and videos (IP content), you specifically grant us a non-exclusive,transferable, sub-licensable, royalty-free, worldwide license to use any IP content that you post on or about Us (IP License).
                        This IP License ends when you delete your IP content or your account unless your content has been shared with others, and they have not deleted it.
                        {"\n"}<Text style={{ fontWeight: "bold", }}>b</Text>. When you delete IP content, it may persist in backup copies for a reasonable period (but will not be available to others).
                        {"\n"}<Text style={{ fontWeight: "bold", }}>c</Text>. No one outside of your login will be able to see your information or content you shared.
                        {"\n"}<Text style={{ fontWeight: "bold", }}>d</Text>. We always appreciate your feedback or other suggestions about Us, but you understand that we may use your feedback or suggestions without any obligation to compensate you for them (just as you have no obligation to offer them).
                        {"\n"}<Text style={{ fontWeight: "bold", }}>e</Text>. We discourage you to provide any sensitive information on our platform. Financial data related to your property is held at estimated, not appraised, value. We do not share any financial information not already available in public forums with other entities.
          </Text>
          </Text>
          <Text style={styles.heading}>3. Safety</Text>
          <Text style={styles.paragraph}>
            <Text >We do our best to keep The Site safe, but we cannot guarantee it. To help us safeguard our information and yours, you commit:
              {"\n"}
              <Text style={{ fontWeight: "bold", }}>a</Text>.
              You will not post unauthorized commercial communications (such as spam) on The Site.
              {"\n"}<Text style={{ fontWeight: "bold", }}>b</Text>.You will not collect other users' content or information, or otherwise access The Site, using automated means (such as harvesting bots,
robots, spiders, or scrapers).
                        {"\n"}<Text style={{ fontWeight: "bold", }}>c</Text>.You will not upload viruses or other malicious code.
                        {"\n"}<Text style={{ fontWeight: "bold", }}>d</Text>.You will not solicit login information or access an account belonging to someone else
                        {"\n"}<Text style={{ fontWeight: "bold", }}>e</Text>. You will not post inflammatory content. “Inflammatory” defined as anything threatening, salacious, inciting violence; or contains nudity or
graphic or gratuitous violence

{"\n"}<Text style={{ fontWeight: "bold", }}>f</Text>. You will not use The Site or Us to do anything unlawful, misleading, malicious, or discriminatory.
{"\n"}<Text style={{ fontWeight: "bold", }}>g</Text>. You will not do anything that could disable, overburden, or impair the proper working or appearance of The Site, such as a denial of service attack or interference with page rendering or other greenGoat functionality.
{"\n"}<Text style={{ fontWeight: "bold", }}>h</Text>. You will not facilitate or encourage any violations of this Statement or our policies
          </Text>
          </Text>
          <Text style={styles.heading}>4. Registration and Account Security</Text>
          <Text style={styles.paragraph}>
            We respect other people’s rights and will ask you to do the same. To that end, you agree that:
          {"\n"}
            <Text style={{ fontWeight: "bold", }}>a</Text>. You will not post content or take any action on The Site that infringes or violates someone else's rights or otherwise violates the law. This
includes third party accounts, or accounts set up representing property belonging to another legal entity.
{"\n"}
            <Text style={{ fontWeight: "bold", }}>b</Text>. You will not post anything on The Site which can be later claimed as intellectual property.
            {"\n"}
            <Text style={{ fontWeight: "bold", }}>c</Text>. We will remove any content or posts on The Site if we believe that they violate this Statement or our policies.
              {"\n"}
            <Text style={{ fontWeight: "bold", }}>d</Text>. If we remove content seemed to be the intellectual property of another party, and you believe we removed it by mistake, you will have an
opportunity to appeal.
{"\n"}
            <Text style={{ fontWeight: "bold", }}>e</Text>. Repeated intellectual property infringement will result in our disabling the account(s) involved.
              {"\n"}
            <Text style={{ fontWeight: "bold", }}>f</Text>. You will not use our copyrights or any confusingly similar marks, except with our prior written permission.
              {"\n"}
            <Text style={{ fontWeight: "bold", }}>g</Text>. You cannot collect other people’s information using The Site. If you collect or give your information on The Site we won’t be responsible for
any abuse of that information.
{"\n"}
            <Text style={{ fontWeight: "bold", }}>h</Text>. You will not send email invitations to non-users without their consent
</Text>
          <Text style={styles.heading}>5. Protecting other people’s rights</Text>
          <Text style={styles.paragraph}>
            We respect other people’s rights and will ask you to do the same. To that end, you agree that:
            {"\n"}
            <Text style={{ fontWeight: "bold", }}>a</Text>. You will not post content or take any action on The Site that infringes or violates someone else's rights or otherwise violates the law. This
  includes third party accounts, or accounts set up representing property belonging to another legal entity.
  {"\n"}
            <Text style={{ fontWeight: "bold", }}>b</Text>. You will not post anything on The Site which can be later claimed as intellectual property.
  {"\n"}
            <Text style={{ fontWeight: "bold", }}>c</Text>. We will remove any content or posts on The Site if we believe that they violate this Statement or our policies.
  {"\n"}
            <Text style={{ fontWeight: "bold", }}>d</Text>. If we remove content seemed to be the intellectual property of another party, and you believe we removed it by mistake, you will have an
  opportunity to appeal.
  {"\n"}
            <Text style={{ fontWeight: "bold", }}>g</Text>. Repeated intellectual property infringement will result in our disabling the account(s) involved.
  {"\n"}
            <Text style={{ fontWeight: "bold", }}>f</Text>. You will not use our copyrights or any confusingly similar marks, except with our prior written permission.
  {"\n"}
            <Text style={{ fontWeight: "bold", }}>g</Text>. You cannot collect other people’s information using The Site. If you collect or give your information on The Site we won’t be responsible for
  any abuse of that information.
  {"\n"}  <Text style={{ fontWeight: "bold", }}>h</Text>. You will not send email invitations to non-users without their consent.
</Text>
          <Text style={styles.heading}>6. Amendments</Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: "bold", }}>a</Text>. We’ll notify you before we make changes to these terms and give you the opportunity to review and comment on the revised terms before
continuing to use our Services.
{"\n"}
            <Text style={{ fontWeight: "bold", }}>b</Text>. If we make changes to policies, guidelines or other terms referenced in or incorporated by this Statement, we may provide notice on the
Site and App’s Policy Page.
{"\n"}
            <Text style={{ fontWeight: "bold", }}>c</Text>. Your continued use of The Site, following notice of the changes to our terms, policies or guidelines, constitutes your acceptance of our
amended terms, policies or guidelines
</Text>
          <Text style={styles.heading}>7. Termination</Text>
          <Text style={styles.paragraph}>
            If you violate the letter or spirit of this Statement, or otherwise create risk or possible legal exposure for us, we can stop providing all or part of
  The Site services to you. We will notify you by email or at the next time you attempt to access your account.
</Text>
          <Text style={styles.heading}>8. Disputes</Text>
          <Text style={styles.paragraph}>
            {"\n"}
            <Text style={{ fontWeight: "bold", }}>a</Text>. If anyone brings a claim against us related to your actions, content or information on The Site, you will indemnify and hold us harmless from
  and against all damages, losses, and expenses of any kind (including reasonable legal fees and costs) related to such claim. Although we
  provide rules for user conduct, we do not control or direct users' actions on The Site and are not responsible for the content or information
  users transmit or share on The Site. We are not responsible for any offensive, inappropriate, obscene, unlawful or otherwise objectionable
  content or information you may encounter on The Site. We are not responsible for the conduct, whether online or offline, of any user of
  The Site.
  {"\n"}
            <Text style={{ fontWeight: "bold", }}>b</Text>. We try to keep the site up, bug-free and safe, but users use the site at their own risk. We are providing services “as is”, without any
  expressed or implied warranties. These include, but are not limited to, warranties of appraised financial value, fitness for a particular
  purpose, deductibility of donated items, or non-infringement. We do not guarantee that the site will always be safe, secure, or error-free or
  that the site will always function without disruptions, delays, or imperfections. greenGoat is not responsible for the actions, content,
  information, or data of third parties. By agreeing, you release us, our directors, officers, employees, and agents from any claims or
  damages, known and unknown, arising out of or in any way connected with any claim you have against any such third parties.
</Text>
          <Text style={styles.heading}>9. Definitions</Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: "bold", }}>a</Text>. By "Us", “We”, or” The Site” we mean the features and services we make available, including through (a) our website at
www.greengoat.org, www.greengoat.com, and any other greenGoat branded or co-branded websites (including sub-domains, international
versions, widgets, and mobile versions); (b) our Platform; (c) social plugins such as the Like button, the Share button and other similar
offerings; and (d) other media, brands, products, services, software (such as a toolbar), devices, or networks now existing or later
developed. We reserve the right to designate, in its sole discretion, that certain of our brands, products, or services are governed by
separate terms and not this Statement.
{"\n"}
            <Text style={{ fontWeight: "bold", }}>b</Text>. By "Platform" we mean a set of APIs and services (such as content) that enable others, including application developers and website
operators, to retrieve data from The Site or provide data to us.
{"\n"}
            <Text style={{ fontWeight: "bold", }}>c</Text>. By "information" we mean facts and other information about you, including actions taken by users and non-users who interact with Us.
            {"\n"}
            <Text style={{ fontWeight: "bold", }}>d</Text>. By "content" we mean anything you or other users post, provide or share using The Site.
            {"\n"}
            <Text style={{ fontWeight: "bold", }}>e</Text>. By "data" or "user data" or "user's data" we mean any data, including a user's content or information that you or third parties can retrieve
from The Site or provide to The Site through Platform.
{"\n"}
            <Text style={{ fontWeight: "bold", }}>f</Text>. By "post" we mean post on The Site or otherwise make available by using The Site.            {"\n"}
            <Text style={{ fontWeight: "bold", }}>g</Text>. By "use" we mean use, run, copy, publicly perform or display, distribute, modify, translate, and create derivative works of.
            {"\n"}
            <Text style={{ fontWeight: "bold", }}>h</Text>. By "application" or “app” we mean any application or website that uses or accesses Platform, as well as anything else that receives or has
received data from us. If you no longer access Platform but have not deleted all data from us, the term application will apply until you
delete the data
</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.heading}>10.</Text>
            This Agreement is not designed by a legal entity. We used Terms of Service agreement of UniRoot’s as a guideline and design this document to fit
the site purpose.
          </Text>


        </ScrollView>

      </View>
    );
  }
}

PrivacyPolicyScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="ios-paper" type="ionicon" style={{ fontSize: 20 }} />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    // color: "#089D37",
    marginVertical: 5,
    paddingHorizontal: 10,
    // textAlign: "center"
  },

  paragraph: {
    padding: 10,
    fontSize: 20,
    justifyContent: "center"
  }
});
