<script lang="ts">

import { onMount } from 'svelte'
import type { PageData } from './$types';

import Navbar from '../../../lib/components/navbar/Navbar.svelte';

import type { Product } from '../../../lib/types/types';


let dialog: any;

let action: String;

onMount(() => {
	dialog = document.getElementById('confirmation-dialog');
/* 	const notification = sessionStorage.getItem("notification");
	if(notification){
		toast.push(notification);
	} */
})

export let data: PageData;

const products = data.products ;

let emptyProduct: Product = {
	product_id: 0,
    name: '',
    price: 0,
    description: '',
    tags: [''],
    photo_url: '',
    productStock: {
      quantity: 0
    }};


let selectedProduct: Product = emptyProduct;

const editProduct = (product_id: number) => {
	action = 'editProduct';
	selectedProduct = data.products.find((product:Product) => product.product_id === product_id);
	console.log(selectedProduct)
	dialog.showModal();
}

const handleCancel = () => {
	dialog.close();
}


const addProduct = () => {
	action = 'addProduct';

  selectedProduct = emptyProduct;
	dialog.showModal();
}

</script>

<style>
form {
	margin: 0;
	padding: 0;
}


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

.header_actions {
	text-align: center;
}

.products__button{
  margin-bottom: 0.75rem;
}

.actions {
	flex-direction: row;
	justify-content: center;
}

.edit_button{
	margin-right: 10px;
	
}

</style>

<body>

<Navbar/>
<div>
{#if data}
<h1>Products</h1>
<div class="products__button">

<button on:click={() => addProduct()}>Add product</button>
</div>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Description</th>
      <th>Tags</th>
	  <th>Photo</th>
	  <th class="header_actions">Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each products as product}
      <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
		<td>{product.description}</td>
		<td>{product.tags}</td>
		<td>
			{#if product.photo_url && product.photo_url.includes('http')}
			<img src={product.photo_url} alt="product-photo">
		  {:else}
			No photo
		  {/if}
		</td>
        <td>
			<div class="actions">
			<button class="edit_button" on:click={() => editProduct(product.product_id)}>Edit</button>
			<form method="POST" action="?/removeProduct">
			<input type="hidden" name="productId" value={product.product_id}>
			<button>Remove</button>
			</form>
		</div>
		</td>
      </tr>
    {/each}
  </tbody>
</table>
{/if}
</div>


<dialog id="confirmation-dialog">
	<div class="dialog-form">
	  <form method="POST" action="?/{action}">
		<label>
		  Name:
		  <input type="text" name="name" bind:value={selectedProduct.name} required>
		</label>
		<label>
		  Price:
		  <input type="number" name="price" bind:value={selectedProduct.price} required>
		</label>
		<label>
		  Description:
		  <textarea name="description" bind:value={selectedProduct.description}></textarea>
		</label>
		<label>
		  Tags:
		  <input type="text" name="tags" bind:value={selectedProduct.tags} required>
		</label>
		<label>
		  Photo URL:
		  <input type="text" name="photo_url" bind:value={selectedProduct.photo_url}>
		</label>
		{#if action === 'addProduct'}
		  <label>
			Stock Quantity:
			<input type="number" name="quantity" bind:value={selectedProduct.productStock.quantity}>
		  </label>
		  {:else}
		  <input type="hidden" name="productId" value={selectedProduct.product_id}>
		{/if}
		<button type="submit">Save</button>
		<button type="button" on:click={handleCancel}>Cancel</button>
	  </form>
	</div>
  </dialog>
  
  

</body>
