<template>
    <div class = "modal-mask">
         <div class = "modal-container">
            <header class = "pop-up-header">Recommendations Saved</header>
            <div class = "pop-up-button-container">
                <button v-on:click = redirectProfilePage() class = "pop-up-button">Profile</button>
                 <button v-on:click = reloadPage() class = "pop-up-button">Continue</button>
            </div>
        </div>
    </div>
</template>

<script>
export default
{
  methods: {
    redirectProfilePage () {
      window.location.href = '/profile'
    },
    reloadPage () {
      window.location.reload()
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
}
.modal-container {
  width: 300px;
  height: 100px;
  padding: 20px 30px;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  border: .35rem solid rgb(20,131,170);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.pop-up-header {
  text-align: center;
  font-size: 25px;
}
.pop-up-button-container {
    display: flex;
    align-items: center;
    min-height: 90%;
    min-width: 90%;
    gap: 10px
}
.pop-up-button {
    margin:auto;
    min-width: 50%;
    max-width: 50%;
    font-size: 25px;
    border-radius: 5px;
    border: .15rem solid black;
}
.pop-up-button:hover {
    transform: scale(1.1);
}
</style>
