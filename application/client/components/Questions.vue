<template>
  <div id="quiz-container">
    <div v-if="finished">
      <span>
        responses:
        {{ responses }}
      </span>
    </div>
    <div v-if="!startQuestionnaire" id="quiz-start">
      <h1 id="quiz-title">
        Welcome to our App!
      </h1>
      <button id="quiz-start-button" @click="startQuestionnaireFunc()">
        Start
      </button>
    </div>
    <div v-else id="quiz-form">
      <h1 id="question">
        {{ questions[currentQuestion].questionText }}
      </h1>
      <label
        v-if="questions[currentQuestion].questionType === 'slider'"
        class="slider-label"
      >
        {{ questions[currentQuestion].sliderMessage }}
      </label>
      <div id="answers">
        <input
          v-if="questions[currentQuestion].questionType === 'slider'"
          v-model="questions[currentQuestion].sliderValue"
          type="range"
          min="-1"
          max="1"
          step=".001"
          class="answer-slider"
          @change="handleSliderChange(questions[currentQuestion].sliderValue)"
        >
        <button
          v-for="(option, index) in questions[currentQuestion].answer"
          v-else
          :key="index"
          class="answer-button"
          @click="handleAnswerClick(option.answerText)"
        >
          {{ option.answerText }}
        </button>
      </div>
      <div>
        <button class="question-buttons" @click="handleBackClick()">
          Back
        </button>
        <button class="question-buttons" @click="handleNextClick()">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Questions',
  data () {
    return {
      currentQuestion: 0,
      startQuestionnaire: false,
      finished: false,
      questions: [
        {
          questionText: 'Genre',
          questionType: 'mc',
          answer: [
            { answerText: 'Pop' },
            { answerText: 'Hip Hop' },
            { answerText: 'R&B' },
            { answerText: 'Country' },
            { answerText: 'Electronic' },
            { answerText: 'Lofi' },
            { answerText: 'Rock' },
            { answerText: 'Latin' },
            { answerText: 'K-Pop' },
            { answerText: 'Folk' },
            { answerText: 'Indie' },
            { answerText: 'Jazz' },
            { answerText: 'Classical' }
          ]
        },
        {
          questionText: 'How energetic do you like your music to be?',
          questionType: 'slider',
          sliderValue: 0,
          sliderMessage: 'neutral'
        },
        {
          questionText: 'Dance',
          questionType: 'slider',
          sliderValue: 0,
          sliderMessage: 'neutral'
        },
        {
          questionText: 'How much do you like acoustic music?',
          questionType: 'slider',
          sliderValue: 0,
          sliderMessage: 'neutral'
        }
      ],
      responses: []
    }
  },
  methods: {
    startQuestionnaireFunc () {
      this.startQuestionnaire = true
    },
    handleAnswer (value) {
      const objIndex = this.responses.findIndex(obj => obj.question === this.currentQuestion + 1)
      if (objIndex === -1) {
        this.responses.push({ question: this.currentQuestion + 1, response: value })
      } else {
        this.responses[objIndex].response = value
      }
    },
    handleSliderChange (value) {
      if (value === 0) {
        this.questions[this.currentQuestion].sliderMessage = value
      } else if (value < 0) {
        this.questions[this.currentQuestion].sliderMessage = value
      } else if (value > 0) {
        this.questions[this.currentQuestion].sliderMessage = value
      }
    },
    handleAnswerClick (answer) {
      this.handleAnswer(answer)
      this.handleNextClick()
    },
    handleBackClick () {
      if (this.currentQuestion !== 0) {
        this.currentQuestion--
      } else {
        this.currentQuestion = 0
        this.startQuestionnaire = false
      }
    },
    handleNextClick () {
      const nextQuestion = this.currentQuestion + 1
      if (this.questions[this.currentQuestion].questionType === 'slider') {
        this.handleAnswer(this.questions[this.currentQuestion].sliderValue)
        this.sliderValue = 0
      }
      if (nextQuestion < this.questions.length) {
        this.currentQuestion = nextQuestion
      } else if (this.responses.length < this.questions.length) {
        this.currentQuestion = 0
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      this.finished = true
    }
  }
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}

#quiz-container{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
  background: rgb(255,255,255);
  background: -moz-radial-gradient(circle, rgba(255,255,255,1) 17%, rgba(246,246,246,1) 40%, rgba(235,235,235,1) 100%);
  background: -webkit-radial-gradient(circle, rgba(255,255,255,1) 17%, rgba(246,246,246,1) 40%, rgba(235,235,235,1) 100%);
  background: radial-gradient(circle, rgba(255,255,255,1) 17%, rgba(246,246,246,1) 40%, rgba(235,235,235,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ebebeb",GradientType=1);
}

#quiz-start{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 6rem 6rem;
  width: 100vh;
  box-shadow: 0 6px 12px -2px rgba(50,50,93,.25),0 3px 7px -3px rgba(0,0,0,.3);
}

#quiz-title{
  padding: 2rem;
}

#quiz-start-button{
  margin: 2rem;
  height: 10vh;
  width: 25vh;
}

#quiz-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 12px -2px rgba(50,50,93,.25),0 3px 7px -3px rgba(0,0,0,.3);
  width: 40%;
  margin: 6rem 6rem;
}

#question{
  padding: 1rem;
  margin: 1rem;
}

#answers{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  padding: 1rem;
}

.question-buttons{
  padding: .5rem;
  margin: 1rem;
}

.answer-slider{
  margin: 1rem;
  padding: .5rem;
  width: 35vh;
}

.slider-label{

}

.answer-button{
  margin: .5rem;
  padding: .5rem;
  height: 10vh;
  width: 25vh;
}
</style>
