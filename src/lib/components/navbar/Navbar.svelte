<script>
  let links = [
    { name: 'Items', url: '/items' },
    { name: 'Categories', url: '/categories' }
  ]
</script>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #007bff;
    color: #fff;
    height: 80px;
    padding: 0 50px;
  }

  .logo {
    font-size: 2rem;
    font-weight: bold;
  }

  .nav-links {
    display: flex;
    justify-content: space-between;
    width: 50%;
    list-style: none;
  }

  .nav-links li {
    display: flex;
    align-items: center;
  }

  .nav-links li a,
  .nav-links li button {
    display: flex; 
    align-items: center;
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .nav-links li a:hover,
  .nav-links li button:hover {
    background-color: #fff;
    color: #007bff;
  }
</style>

<nav>
  <div class="logo">Admin Panel</div>
  <ul class="nav-links">
    {#each links as link}
    <li>
      <a href={link.url}>{link.name}</a>
    </li>
    {/each}
    <li>
      <form method="post" action="/logout">
        <button type="submit">
          <p>Logout</p>
        </button>
      </form>
    </li>
  </ul>
</nav>
