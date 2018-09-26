import RegisterUserScreen from '../screens/RegisterUserScreen'
import EnterChallengeScreen from '../screens/EnterChallengeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterProjectScreen from '../screens/RegisterProjectScreen'
import TaskFeedScreen from '../screens/TaskFeedScreen'
import TaskScreen from '../screens/TaskScreen'



import TheNavbar from '../components/navbar/TheNavbar'
import TheFooter from '../components/footer/TheFooter'


export const routes = [
  { path: '/', components: { default: EnterChallengeScreen}},
  { path: '/login', components: {default: LoginScreen}}, 

  { path: '/registeruser', components: {default: RegisterUserScreen }},
  { path: '/registerproject', components: {default: RegisterProjectScreen}},

  { path: '/taskfeed', components: {default: TaskFeedScreen}},
  { path: '/task', name:'task', components: {default: TaskScreen }, props:true},

  // { path: '/projectsettings', components: {default: ProjectSettingsScreen, footer: TheFooter}}, 
  // { path: '/usersettings', components: {default: UserSettingsScreen, footer: TheFooter}}, 
]