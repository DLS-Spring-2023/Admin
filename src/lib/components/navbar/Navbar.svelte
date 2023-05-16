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

  .nav-links li a {
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .nav-links li a:hover {
    background-color: #fff;
    color: #007bff;
  }
</style>

<nav>
  <div class="logo">Admin Panel</div>
  <ul class="nav-links">
    {#each links as link}
      <li><a href={link.url}>{link.name}</a>
      </li>
    {/each}
  </ul>
</nav>
