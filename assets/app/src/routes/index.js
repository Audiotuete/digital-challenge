import SignUpScreen from '../screens/SignUpScreen'
import JoinChallengeScreen from '../screens/JoinChallengeScreen'

import TheNavbar from '../components/navbar/TheNavbar'
import TheFooter from '../components/footer/TheFooter'


export const routes = [
  { path: '/', components: { default: JoinChallengeScreen, footer: TheFooter }},
  { path: '/signup', components: { default: SignUpScreen, footer: TheFooter }},
  // { path: '/login', components: {default: Login, footer: TheFooter }}, 
  // { path: '/joinchallenge', components: {default: ChallengeCodeScreen, footer: TheFooter }},

  // { path: '/register', components: {default: RegisterUserScreen, footer: TheFooter }},

  // { path: '/joinproject', components: {default: JoinProjectScreen, footer: TheFooter}},
  // { path: '/createproject', components: {default: CreateProjectScreen, footer: TheFooter}},

  // { path: '/taskfeed', components: {default: TaskFeedScreen, footer: TheFooter }},
  // { path: '/task:id', components: {default: TaskScreen, footer: TheFooter }},

  // { path: '/projectsettings', components: {default: ProjectSettingsScreen, footer: TheFooter}}, 
  // { path: '/usersettings', components: {default: UserSettingsScreen, footer: TheFooter}}, 

]