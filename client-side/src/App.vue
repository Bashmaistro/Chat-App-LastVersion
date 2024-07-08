<script setup>
import { io } from 'socket.io-client';
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

const socket = io('http://localhost:3001');
const messages = ref([]);
const messageText = ref('');
const joined = ref(false);
const name = ref('');
const typingDisplay = ref('');
const token = ref(localStorage.getItem('jwtToken'));
const email = ref('');
const password = ref('');
const registerName = ref('');
const registerEmail = ref('');
const registerPassword = ref('');

onBeforeMount(() => {
  socket.emit('findAllMessages', {}, (response) => {
    messages.value = response;
  });

  socket.on('message', (message) => {
    messages.value.push(message);
  });

  socket.on('typing', ({ name, isTyping }) => {
    if (isTyping) {
      typingDisplay.value = `${name} typing...`;
    } else {
      typingDisplay.value = '';
    }
  });
});

const sendMessage = () => {
  socket.emit('createMessage', { text: messageText.value }, (response) => {
    messages.value.push(response);
  });
  messageText.value = '';
};

const join = async () => {
  try {
    const response = await axios.post('http://localhost:3001/auth/login', {
      email: email.value,
      password: password.value,
    });

    if (response.data.success) {
      localStorage.setItem('jwtToken', response.data.token);
      name.value = response.data.user.name;
      socket.emit('join', { name: response.data.user.name }, () => {
        joined.value = true;
      });
    } else {
      alert('Login failed. Please check your credentials');
    }
  } catch (error) {
    console.error('Login Error:', error);
    alert('There is an error occured when logining');
  }
};

const register = async () => {
  try {
    const response = await axios.post('http://localhost:3001/auth/register', {
      name: registerName.value,
      email: registerEmail.value,
      password: registerPassword.value,
    });

    if (response.data.success) {
      alert('Sign in Successfull.');
      email.value = registerEmail.value;
      password.value = registerPassword.value;
      join();
    } else {
      alert('Registration failed. Please check your information.');
    }
  } catch (error) {
    console.error('Register error', error);
    alert('An error occurred during registration.');
  }
};

let timeout;

const emitTyping = () => {
  socket.emit('typing', { isTyping: true });

  timeout = setTimeout(() => {
    socket.emit('typing', { isTyping: false });
  }, 5000);
};
</script>

<template>
  <div class="chat">
    <div v-if="!joined">
      <form @submit.prevent="join">
        <label>Email:</label>
        <input type="email" v-model="email" required />
        <label>Password:</label>
        <input type="password" v-model="password" required />
        <button type="submit">Login</button>
      </form>
      <form @submit.prevent="register">
        <label>Name:</label>
        <input type="text" v-model="registerName" required />
        <label>Email:</label>
        <input type="email" v-model="registerEmail" required />
        <label>Password:</label>
        <input type="password" v-model="registerPassword" required />
        <button type="submit">Register</button>
      </form>
    </div>
    <div class="chat-container" v-else>
      <div class="message-container">
        <div v-for="message in messages">
          [{{ message.name }}] : {{ message.text }}
        </div>
        <div v-if="typingDisplay">{{ typingDisplay }}</div>
        <div class="message-input">
          <form @submit.prevent="sendMessage">
            <label>Message:</label>
            <input v-model="messageText" @input="emitTyping" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import './assets/base.css';
</style>
