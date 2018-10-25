
<template>
  <div>
    <BaseWhitespace/>
    <BaseHeading :level='1'>
      Challenge Info
      <button class='header-icon' @click='back()'>
        <i class='sl-icon icon-arrow-left'></i>
      </button>
    </BaseHeading>
    <div class='info-container'>

      <div class='info-header'><i class='info-header-icon sl-icon icon-calendar'/><span class='info-header-title'>Termine</span></div>
      <div  class='info-dates'>
        <div v-for='challengedate in aChallenge.challengedateSet' :key="challengedate.id" class='info-date-item'>
          <span class='date'>{{challengedate.eventDate | moment("DD.MM.YYYY")}}</span> 
          <span class='dates-title'>{{challengedate.eventName}}</span>
          <span>{{challengedate.eventStartTime.slice(0, -3)}}&nbsp;-&nbsp;</span>
          <span>{{challengedate.eventEndTime.slice(0, -3)}}&nbsp;Uhr</span>
        </div>
      </div>

      <div class='info-header'><i class='info-header-icon sl-icon icon-user-female' aria-hidden='true'/><span class='info-header-title'>Ansprechpartner*innen</span></div>
      <div class='info-contact' v-for='contactInfo in aChallenge.contactInfo' :key="contactInfo.username">
        <div> <!--  Flex Container Start  -->
          <span class='info-contacts-item info-contacts-item__name'>{{contactInfo.username.replace(/[._]/g, ' ')}}</span>
          <div v-show="contactInfo.phone" class='info-contacts-item'>
            <span class='info-text'>{{contactInfo.phone}} <i class='info-contact-icon sl-icon icon-phone' aria-hidden='true'/></span>
          </div> 
          <div v-show="contactInfo.email" class='info-contacts-item info-contacts-item__no-top-margin'>
            <a :href="'mailto:'+contactInfo.email" ><span class='info-text'>{{contactInfo.email.toLowerCase()}} <i class='info-contact-icon sl-icon icon-envelope' aria-hidden='true'/></span></a>
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

import A_CHALLENGE from '../graphql/challenges/aChallenge.gql'

export default {
  name: 'challenge-info-screen',
  components: {

  },
  data () {
    return {
      aChallenge: {}
    }
  },
  apollo: {
    aChallenge: {
      query: A_CHALLENGE,
      fetchPolicy: 'cache-and-network',
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
  }
}

</script>

<style scoped lang='scss'>

  .header-icon {
    position: absolute;
    left: 0.15rem;
    top: 1rem;
    font-size: 1.5rem;
    color: #555;
  }

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

    .info-header-icon {
      color: $colorPrimary;
      font-size: 1rem;
      margin-left: 0.4rem;
      margin-right: 0.5rem;
    }

    .info-header-title {
      margin-right: 0.5rem;
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
      padding-left: 1.2rem;
    }
  }
}

.info-contact {
  display: flex;
  justify-content: space-between;
  font-size: .85rem;
  margin: 1rem 0.65rem 1.5rem 0.65rem;

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

  .info-contact-icon {
    font-size: 0.75rem;
    color: $colorPrimary;
    margin-left: 0.4rem;
    padding-top: 2px;
  }
}

.info-text {
  display: flex;
  align-items: center;
}

</style>


