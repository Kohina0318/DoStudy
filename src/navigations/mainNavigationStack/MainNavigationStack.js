import * as React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../../navigations/NavigationDrw/NavigationService';
import { isDarkMode } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import Dashboard from '../../screens/dashboard/Dashboard';
import Splash from '../../screens/intro/Splash';
import DrawerNavigation from '../drawer/DrawerNavigation';
import Subjects from '../../screens/classes/Subjects';
import BookCategory from '../../screens/classes/Category/Topics/BookCategory'
import Content from '../../screens/contain/Content';
import ContentDetail from '../../screens/contain/contain-detail/ContentDetail';
import Classes from '../../screens/classes/Classes';
import SubjectCategory from '../../screens/classes/Category/SubjectCategory';
import Profile from '../../screens/profile/Profile';
import Support from '../../screens/support/Support';
import SignIn from '../../screens/auth/SignIn';
import SignUp from '../../screens/auth/SignUp';
import ForgotPswd from '../../screens/auth/ForgotPassword/ForgotPswd';
import EditProfile from '../../screens/profile/EditProfile';
import ChangePswd from '../../screens/profile/ChangePswd';
import VerifyOtp from '../../screens/auth/VerifyOtp';
import VerifyOtpForgotPswd from '../../screens/auth/ForgotPassword/VerifyOtpForgotPswd';
import ChangePswdByForgot from '../../screens/auth/ForgotPassword/ChangePswdByForgot';
import MemberShip from '../../screens/MemberShip/MemberShip';
import FullVideoContainDetail from '../../screens/contain/contain-detail/FullVideoContainDetail';
import FullPdfContainDetail from '../../screens/contain/contain-detail/FullPdfContainDetail';
import VideoCategory from '../../screens/classes/Category/Topics/VideoCategory';
import QuestionandExamCategory from '../../screens/classes/Category/Topics/QuestionandExamCategory';
import Result from '../../screens/result/Result';
import EnglishBooks from '../../screens/englishBooks/EnglishBooks';
import HindiBooks from '../../screens/hindiBooks/HindiBooks';
import Discussion from '../../screens/discussion/Discussion';
import DiscussionTopic from '../../screens/discussion/DiscussionTopic';
import CreateDiscussion from '../../screens/discussion/CreateDiscussion';


function MainNavigationStack(props) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      theme={isDarkMode ? DarkTheme : DefaultTheme}
      ref={navigationRef}>
      <Stack.Navigator headerShown={false}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Header"
          component={Header}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Classes"
          component={Classes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Subjects"
          component={Subjects}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubjectCategory"
          component={SubjectCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookCategory"
          component={BookCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoCategory"
          component={VideoCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuestionandExamCategory"
          component={QuestionandExamCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Content"
          component={Content}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ContentDetail"
          component={ContentDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FullVideoContainDetail"
          component={FullVideoContainDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FullPdfContainDetail"
          component={FullPdfContainDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePswd"
          component={ChangePswd}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Support"
          component={Support}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPswd"
          component={ForgotPswd}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyOtpForgotPswd"
          component={VerifyOtpForgotPswd}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePswdByForgot"
          component={ChangePswdByForgot}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MemberShip"
          component={MemberShip}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Result"
          component={Result}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnglishBooks"
          component={EnglishBooks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HindiBooks"
          component={HindiBooks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Discussion"
          component={Discussion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DiscussionTopic"
          component={DiscussionTopic}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateDiscussion"
          component={CreateDiscussion}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigationStack;
