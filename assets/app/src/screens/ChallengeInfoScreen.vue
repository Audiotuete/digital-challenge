
<template>
  <div>
    <Whitespace/>
    <Heading :level='1'>
      Challenge Infos
    </Heading>
  <div class='info-container'>
    <div class='info-header'><i class='info-header-icon fa fa-calendar-check-o
'/><span class='info-header-title'>Termine</span></div>
      <div  class='info-dates'>
        <div v-for='challengedate in aChallenge.challengedateSet' :key="challengedate.id" class='info-date-item'>
          <span class='date'>{{challengedate.eventDate | moment("0d.MM.YYYY")}}</span> 
          <span class='dates-title'>{{challengedate.eventName}}</span>
          <span class='start-time'>{{challengedate.eventStartTime.slice(0, -3)}} - </span>
          <span class='start-time'>{{challengedate.eventEndTime.slice(0, -3)}} Uhr</span>
        </div>
      </div>
    <!-- <Whitespace/> -->
    <div class='info-header'><i class='info-header-icon fa fa-user-circle-o' aria-hidden='true'/><span class='info-header-title'>Ansprechpartner*innen</span></div>
      <div class='info-contact' v-for='contactInfo in aChallenge.contactInfo' :key="contactInfo.username">
        <div> <!--  Flex Container Start  -->
          <div class='info-contacts-item info-contacts-item__name'>{{contactInfo.username}}</div>
          <div class='info-contacts-item'>
            <span class='info-text'><img class='info-box-icon' src=''> {{contactInfo.phone}}</span>
          </div> 
          <div class='info-contacts-item info-contacts-item__no-top-margin'>
            <span class='info-text'><img class='info-box-icon' src=''> {{contactInfo.email}}</span>
          </div>
        </div> <!--  Flex Container End  -->
      </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueMoment from 'vue-moment'

Vue.use(VueMoment)

import Heading from '../components/atoms/Heading'
import Whitespace from '../components/layout/Whitespace'

import A_CHALLENGE from '../graphql/challenges/aChallenge.gql'

export default {
  name: 'challenge-info-screen',
  components: {
    Heading,
    Whitespace
  },
  data () {
    return {
      aChallenge: []
    }
  },
  apollo: {
    aChallenge: {
      query: A_CHALLENGE,
      variables() {
        return {
          challengeCode: '66kid'
        } 
      },
      fetchPolicy: 'network-only',

    }
  },
  methods: {

  }
}

</script>

<style scoped lang='scss'>

  .info-container {
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
  }

  .info-header {
    font-size: .75rem;
    font-weight: 600;
    padding-bottom: 0.5rem;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    border-bottom: 1px solid #cccccc;

    .info-header-title {
      margin: 0 0.5rem 0 0.5rem;
    }

    .info-header-icon {
      color: $colorPrimary;
      font-size: 1rem;
      padding-left: 0.4rem;
    }
  }

.info-dates {
  font-size: .85rem;
  margin: 0.5rem 0.65rem 1.5rem 0.65rem;

  .info-date-item{
    display: flex;
    margin-top: .5rem;
    color: #333;

    &__bold {
      font-weight: 700;
    }
    &__no-top-margin {
      margin-top: 0
    }

    .dates-title {
      flex: 1;
      font-weight: 600;
      text-align: left;
      padding-left: 1rem;
    }
  }
}

.info-contact {
  display: flex;
  justify-content: space-between;
  font-size: .85rem;
  margin: 0.5rem 0.65rem 1.5rem 0.65rem;

  .info-contacts-item{
    display: flex;
    margin-top: .5rem;
    color: #333;

    &__name {
      font-weight: 800;
      margin-top: 0
    }
    &__no-top-margin {
      margin-top: 0
    }
  }
  .info-contacts-image {
    max-height: 5rem;
    margin-right: 0.75rem;
  }
}

.info-text {
  display: flex;
  align-items: center;
}

</style>


