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
      <div id="answers">
        <button
          v-for="(option, index) in questions[currentQuestion].answer"
          :key="index"
          class="answer"
          @click="handleAnswerClick(option.answerMeaning)"
        >
          {{ option.answerText }}
        </button>
      </div>
      <div id="question-buttons">
        <button @click="handleBackClick()">
          Back
        </button>
        <button @click="handleNextClick()">
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
          questionText: 'Hello',
          answer: [
            { answerText: 'yes', answerMeaning: '' },
            { answerText: 'no', answerMeaning: '' },
            { answerText: 'yes2', answerMeaning: '' },
            { answerText: 'no2', answerMeaning: '' }
          ]
        },
        {
          questionText: 'Hello2',
          answer: [
            { answerText: 'yes', answerMeaning: '' },
            { answerText: 'no', answerMeaning: '' },
            { answerText: 'yes2', answerMeaning: '' },
            { answerText: 'no2', answerMeaning: '' }
          ]
        },
        {
          questionText: 'Hello3',
          answer: [
            { answerText: 'yes', answerMeaning: '' },
            { answerText: 'no', answerMeaning: '' },
            { answerText: 'yes2', answerMeaning: '' },
            { answerText: 'no2', answerMeaning: '' }
          ]
        }
      ],
      responses: []
    }
  },
  methods: {
    startQuestionnaireFunc () {
      this.startQuestionnaire = true
    },
    handleAnswerClick (answer) {
      const objIndex = this.responses.findIndex(obj => obj.question === this.currentQuestion)
      if (objIndex === -1) {
        this.responses.push({ question: this.currentQuestion, response: answer })
      } else {
        this.responses[objIndex].response = answer
      }
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
  width: 35%;
  margin: 6rem 6rem;
}

#question{
  padding: 1rem;
  margin-top: 1rem;
}

#answers{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 1rem;
}

#question-buttons{
  padding: 1rem;
  margin-bottom: 1rem;
}

.answer{
  margin: .5rem;
  padding: .5rem;
  height: 10vh;
  width: 25vh;
}
</style>
