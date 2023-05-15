<script lang="ts">
import { onMount } from 'svelte';

import Navbar from '../../../lib/components/navbar/Navbar.svelte';

import type { Category } from '../../../lib/types/types';

let dialog: any;

onMount(() => {
	dialog = document.getElementById('confirmation-dialog');
})

let categories = [
	{ id: 1, name: 'category 1' },
	{ id: 2, name: 'category 2' },
	{ id: 3, name: 'category 3' },
	{ id: 4, name: 'category 4' },
	{ id: 5, name: 'category 5' },
	{ id: 6, name: 'category 6' },
	{ id: 7, name: 'category 7' },
	{ id: 8, name: 'category 8' },
	{ id: 9, name: 'category 9' },
	{ id: 10, name: 'category 10' }
];

let selectedCategory: Category = {id: 0, name: ''};

const openDialog = (category: Category) => {
	selectedCategory = category;
	dialog.showModal();
}

const handleCancel = () => {
	dialog.close();
}

const handleSubmit = () => {
  if (selectedCategory.id > 0) {
    categories = categories.map((category) =>
      category.id === selectedCategory.id ? selectedCategory : category
    );
  } else {
	selectedCategory.id = categories.length
    categories = [...categories, selectedCategory];
  }
  dialog.close();
}

const addCategory = () => {
  selectedCategory = {id: 0, name: ''};
	dialog.showModal();
}

const removeCategory = (categoryId: number) => {
	categories = categories.filter(category => category.id !== categoryId);
}

</script>

<style>
body {
	height: 100%;
	background-color: #ADD8E6;
}

div{
	display: flex;
	flex-direction: column;
	align-items: center;
}

table {
	margin: auto;
	border-collapse: collapse;
	width: 80%;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

th,
td {
	text-align: left;
	padding: 8px;
	border-bottom: 1px solid #ddd;
}

th {
	background-color: #007bff;
	color: #fff;
	font-weight: bold;
}

button {
	background-color: #007bff;
	color: #fff;
	border: none;
	padding: 8px 12px;
	border-radius: 4px;
	cursor: pointer;
}

button:hover {
	background-color: #0056b3;
}

.dialog-form {
	display: flex;
	flex-direction: column;
	align-categories: center;
	margin-top: 20px;
}

.dialog-form label {
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
}

.dialog-form input {
	padding: 5px;
	border: none;
	border-radius: 3px;
	margin-top: 5px;
}

.dialog-form button {
	background-color: #007bff;
	color: #fff;
	border: none;
	padding: 8px 12px;
	border-radius: 4px;
	margin-top: 20px;
	cursor: pointer;
}

.dialog-form button:hover {
	background-color: #0056b3;
}

.dialog-form button[type="button"] {
	background-color: #6c757d;
	margin-right: 10px;
}


.categories__button{
  margin-bottom: 0.75rem;
}

</style>

<body>

<Navbar />
<div>
<h1>Categories</h1>
<div class="categories__button">
<button on:click={() => addCategory()}>Add category</button>
</div>
<table>
  <thead>
    <tr>
		<th>Id</th>
      <th>Name</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each categories as category}
      <tr>
		<td>{category.id}</td>
        <td>{category.name}</td>
        <td><button on:click={() => openDialog(category)}>Edit</button></td>
        <td><button on:click={() => removeCategory(category.id)}>Remove</button></td>
      </tr>
    {/each}
  </tbody>
</table>
</div>


<dialog id="confirmation-dialog">
    <div class="dialog-form">
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      Name:
      <input type="text" bind:value={selectedCategory.name} required>
    </label>
    <button type="submit">Save</button>
    <button type="button" on:click={handleCancel}>Cancel</button>
  </form>
</div>
</dialog>

</body>
