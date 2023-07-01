<template>
  <v-form @submit.prevent="submit" ref="form">
    <v-text-field
      v-model="name"
      required
      :rules="nameRules"
      :counter="10"
      label="Name"
    ></v-text-field>
    <v-text-field
      v-model="email"
      required
      :rules="emailRules"
      :counter="10"
      label="Email"
    ></v-text-field>
    <v-text-field
      v-model="contact"
      required
      :rules="contactRules"
      :counter="10"
      label="Contact"
      max="10"
    ></v-text-field>
    <v-btn
      @click="submit"
      class="me-4"
      type="submit"
    >
      submit
    </v-btn>

    <v-btn @click="handleReset">
      clear
    </v-btn>
  </v-form>
</template>
<script>
import axios from 'axios'
  export default{
    data(){ 
      return {
      name: '',
      email: '',
      contact: '',
      nameRules: [
        value => {
          if (value) return true

          return 'Name is required.'
        },
        value => {
          if (value?.length >= 10) return true

          return 'Name must be less than 10 characters.'
        }
      ],
      contactRules: [
        value => {
          if (value?.length == 10  && /[0-9-]+/.test(value)) return true

        return 'Phone number needs to be 10 digits.'
        },
        value => {
          if (value?.length == 10) return true

          return 'Name must be 10 characters.'
        }
      ],
      emailRules: [
        value => {
          if (value) return true

          return 'E-mail is required.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'E-mail must be valid.'
        },]
    }
  },
  methods:{
    async submit(){
      const isValid = await this.$refs.form.validate();
      if(isValid.valid){
        axios.post("http://localhost:8081/user",{
          nom_user: this.name,
          email_user: this.email,
          contact_user: this.contact,
          mdp_user: "test"
        }).then((response)=>{
          console.log(response)
        }).catch((err)=>{
          console.log(err)
        })
      }
    }
  }
}
</script>