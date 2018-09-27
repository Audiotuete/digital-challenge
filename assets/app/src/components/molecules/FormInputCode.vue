<template>
 <div>
    <Label>
      <slot></slot>
    </Label>
    <input
      ref ='input-value'
      type ='text'
      :value='value' 
      @input='updateDate()'
      @keyup='maxInput()'
      autocomplete='off' 
      @focus='inputIsFocused = true' 
      placeholder='XXXXX'
    />
  </div>
</template>

<script>
import Label from '../atoms/Label'

export default {
  components: {
    Label
  },
  name: 'form-input',
  props: {
    
    value: {type: String, required: true},
    type: {      
      type: String,
      default: 'text',
      required: false
    },
    maxlength: {type: Number, required: true}
  },
  data() {
    return{
      inputCount: 0,
    }
  },
  methods: {
    updateDate() {
      this.$emit('input', this.value)
    },
    maxInput() {
      console.log(this.type)
      this.inputCount = this.value.length
      var max = this.maxlength; // The maxlength you want
      if(this.value.length > max) {
        this.value = this.value.substring(0, max);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    pointer-events: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    width: 65%;
    // margin-top: 1rem;
    padding: .5rem .1rem;
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 0.5rem;
    font-family: 'Open Sans';
    box-sizing: border-box;
    background: #FEFEFE;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.25);
    border-radius: 0.75vw;

    &::placeholder {
      color: #DDDDDD;
    }
  }
</style>


