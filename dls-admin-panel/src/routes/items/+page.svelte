<script lang="ts">

import { onMount } from 'svelte'

import Navbar from '../../lib/components/navbar/Navbar.svelte';

import type { Item } from '../../lib/types/types.ts';


let dialog: unknown;

onMount(() => {
	dialog = document.getElementById('confirmation-dialog');
})

let items = [
	{ id: 1, name: 'Item 1', price: 54 },
	{ id: 2, name: 'Item 2', price: 71 },
	{ id: 3, name: 'Item 3', price: 11 },
	{ id: 4, name: 'Item 4', price: 28 },
	{ id: 5, name: 'Item 5', price: 97 },
	{ id: 6, name: 'Item 6', price: 61 },
	{ id: 7, name: 'Item 7', price: 76 },
	{ id: 8, name: 'Item 8', price: 23 },
	{ id: 9, name: 'Item 9', price: 62 },
	{ id: 10, name: 'Item 10', price: 31 }
];

let selectedItem: Item = {id: 0, name: '', price: 0};

const openDialog = (item: Item) => {
	selectedItem = item;
	dialog.showModal();
}

const handleCancel = () => {
	dialog.close();
}

const handleSubmit = () => {
  if (selectedItem.id > 0) {
    items = items.map((item) =>
      item.id === selectedItem.id ? selectedItem : item
    );
  } else {
	selectedItem.id = items.length
    items = [...items, selectedItem];
  }
  dialog.close();
}

const addItem = () => {

  selectedItem = {id: 0, name: '', price: 0};
	dialog.showModal();
}

const removeItem = (itemId: number) => {
	items = items.filter(item => item.id !== itemId);
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
	align-items: center;
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

.dialog-form h3 {
	margin: 0;
	margin-bottom: 10px;
}

.items__button{
  margin-bottom: 0.75rem;
}

.dialog-form span {
	color: red;
	font-weight: bold;
	margin-top: 5px;
}
</style>

<body>

<Navbar/>
<div>
<h1>Items</h1>
<div class="items__button">
<button on:click={() => addItem()}>Add item</button>
</div>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each items as item}
      <tr>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td><button on:click={() => openDialog(item)}>Edit</button></td>
        <td><button on:click={() => removeItem(item.id)}>Remove</button></td>
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
      <input type="text" bind:value={selectedItem.name} required>
    </label>
    <label>
      Price:
      <input type="number" bind:value={selectedItem.price} required>
    </label>
    <button type="submit">Save</button>
    <button type="button" on:click={handleCancel}>Cancel</button>
  </form>
</div>
</dialog>

</body>
