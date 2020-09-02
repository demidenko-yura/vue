<template>
  <div id="app">
    <div id="game_result">{{result}}</div>
    <span id="Round">Round: {{RoundNumber}}</span>
    <div id="game" ref='game' @click="gamePlay">
      <span ref='disabled' class="disabled"></span>
      <span ref='one' class="gameColor" style="background: #1e90ff;">
        <audio ref='sound_one' preload='auto' src="src/assets/1.mp3"></audio>
      </span>
      <span ref='two' class="gameColor" style="background: #FF5643;">
        <audio ref='sound_two' preload='auto' src="src/assets/2.mp3"></audio>
      </span>
      <span ref='three' class="gameColor" style="background: #feef33;">
        <audio ref='sound_three' preload='auto' src="src/assets/3.mp3"></audio>
      </span>
      <span ref='four' class="gameColor" style="background: #BEDE15;">
        <audio ref='sound_four' preload='auto' src="src/assets/4.mp3"></audio>
      </span>
    </div>
    <form id="customization" ref='customization'>
        <input id="ez" type="radio" name="complexity" value="1500" checked><label for="ez">Easy</label>
        <input id="md" type="radio" name="complexity" value="1000"><label for="md">Middle</label>
        <input id="hd" type="radio" name="complexity" value="400"><label for="hd">Hard</label>   
    </form>
    <button 
      id="gameButton" 
      ref='gameButton' 
      @click="getMassRandom" 
      style="margin: 30px 0; font-size: 20px;">
      Play
    </button>  
  </div>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      amount: 4,
      orderNumber: 1,
      RoundNumber: 1,
      result: null,     
    }
  },  
 

  methods: {
    getMassRandom(obj, arr = []) {
      let amount = this.amount

      if (arr.length === amount) {
        let game = this.$refs.disabled
        let gameButton = this.$refs.gameButton
        let complexity = +this.$refs.customization.complexity.value
        let box = [this.$refs.one, this.$refs.two, this.$refs.three, this.$refs.four]
        let sounds = [this.$refs.sound_one, this.$refs.sound_two, this.$refs.sound_three, this.$refs.sound_four]


        this.result = null
        game.style.display = 'block'
        gameButton.disabled = true 

        let time = complexity

        let i = 0
        let j = 1
        let color


        setTimeout(function tick() {
          if (i === amount) {
            return null
          }

          color = box[arr[i]].style.background
          box[arr[i]].style.background = 'green'
          box[arr[i]].number = box[arr[i]].number ? [...box[arr[i]].number, j] : [j]
          sounds[arr[i]].play()


          setTimeout(tick, time)
        }, time)  


        setTimeout(function tick() {
          if (i === amount) {
            game.style.display = 'none'
            
            return null
          }

          box[arr[i]].style.background = color
          sounds[arr[i]].pause()
          i++
          j++

          setTimeout(tick, time)
        }, time + (time / 2 + 100))     
      } else {
        let value = Math.round(0 - 0.5 + Math.random() * (3 - 0 + 1))
        
        if(arr.some(item => item === value) && amount < 5) {
          this.getMassRandom(obj, arr)
        } else {
          arr[0] && arr[arr.length - 1] === value ? null : arr.push(value)
          this.getMassRandom(obj, arr)
        } 
      }
    },






    gamePlay(event) {
      let sound = event.target.firstChild
      let color = event.target.style.background
      let box = [this.$refs.one, this.$refs.two, this.$refs.three, this.$refs.four]

      if (this.orderNumber === this.amount && event.target.number.some( item => item === this.orderNumber)) {

        sound.play()
        event.target.style.background = 'green'
        this.orderNumber = 1
        this.RoundNumber++
        this.amount++

        for (let i = 0; i < box.length; i++) {
          box[i].number = null
        }

        this.getMassRandom()
      }
      else if (event.target.number && event.target.number.some( item => item === this.orderNumber)) {

        sound.play()
        event.target.style.background = 'green'
        this.orderNumber++

      } else {
    if (event.target.style.display === 'block') {
      return
    }

        sound.play()
        event.target.style.background = 'red'
        this.orderNumber = 1
        this.amount = 4

        for (let i = 0; i < box.length; i++) {
          box[i].number = null
        } 

        this.$refs.disabled.style.display = 'block'
        this.result = `Sorry, you lost on ${this.RoundNumber} round`
        this.RoundNumber = 1
    this.$refs.gameButton.disabled = false        
      }
      
      setTimeout(() => {
        sound.pause()
        event.target.style.background = color
      }, 250)
    }    
  }
};
</script>

<style lang='sass'>
#app 
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  margin: 80px auto;

#game 
  display: flex;
  border-radius: 50%;
  flex-wrap: wrap;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 778px)
    width: 300px;
    height: 300px;    


.disabled 
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1000;
  cursor: not-allowed;


.gameColor 
  display: block;
  width: 200px; 
  height: 200px; 
  opacity: 0.8;
  cursor: pointer;

  @media screen and (max-width: 778px)
    width: 150px; 
    height: 150px;    

.gameColor:hover 
  opacity: 1;


#customization 
  margin: 10px;
  font-size: 20px;



#Round 
  font-size: 25px;

#game_result 
  font-size: 20px;
  position: absolute;
  top: 30px;
  width: 100%;
  font-size: 30px;

</style>
