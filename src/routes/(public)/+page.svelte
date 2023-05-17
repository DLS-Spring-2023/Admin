<script>
/** @type {import('./$types').ActionData} */
export let form;
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
    width: 100%;
  }

  p {
    color:red;
    margin: 0;
    padding: 0;
  }

  .error{
    margin-top: 20px;
  }

  .input {
    display: flex;
    flex-direction: column;
  }

  .form{
    display: flex;
    flex-direction: column;

  }
</style>

<body>
<div>
<h1>Welcome to the Admin Page</h1>

<h2>Please log in </h2>


<form class="form" method="POST">
  
 
  <div class="input">
  <label for="username">Email:</label>
  <input type="email" id="email" name="email"> 
  

  <label for="password">Password:</label>
  <input type="password" id="password" name="password"> 
  <button type="submit">Login</button> 
</div>

  {#if form?.missing}<p class="error">Please provide a correct email</p>{/if}
  {#if form?.incorrect}<p class="error">Password or email incorrect. Try again</p>{/if}
</form>
</div>
</body>
