<script>
  let username = "";
  let password = "";

  function handleSubmit() {
    alert(`Username: ${username}\nPassword: ${password}`);
  }
</script>

<style>

body{
  height:100%;
background-color: #ADD8E6
}

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: #fff;
    border: none;
  }
</style>

<body>
<div>
<h1>Welcome to the Admin Page</h1>

<h2>Please log in </h2>


  <label for="username">Username:</label>
  <input type="text" id="username" bind:value={username}>

  <label for="password">Password:</label>
  <input type="password" id="password" bind:value={password}>

  <button on:click={handleSubmit}>Login</button>
</div>
</body>
