<script lang="ts">

import { onMount } from 'svelte'
import type { PageData } from './$types';

import Navbar from '../../../lib/components/navbar/Navbar.svelte';

onMount(() => {
	console.log(orders);
})

export let data: PageData;

const orders = data.orders;


function getStatusText(status: string) {
    return status || 'No status available';
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

.status {
	  color: white;
	  padding: 4px 8px;
	  border-radius: 4px;
	}
  
	.status--green {
	  background-color: green;
	}
  
	.status--red {
	  background-color: red;
	}

</style>

  <body>
	<Navbar />
	<div>
	  {#if data}
	  <h1>Orders</h1>
  
	  <table>
		<thead>
		  <tr>
			<th>Email</th>
			<th>Id</th>
			<th>Items</th>
			<th>Date</th>
			<th>Status</th> 
			<th>Total Price</th>
		  </tr>
		</thead>
		<tbody>
		  {#each orders as order}
		  <tr>
			<td>{order.customer_email}</td>
			<td>{order.customer_id}</td>
			<td>
				{#each order.items as item}
				<ul>
					<ul>ProductID : {item.productId}
						Name: {item.name}
						Quantity: {item.quantity}
						Price: {item.price}
					</ul>
				</ul>
				
				{/each}	
			</td>
			<td>{order.order_date}</td>
			<td>
			  <span
				class="status"
				class:status--green={order.status === 'OK'} 
				class:status--red={order.status !== 'OK'} 
			  >
			  {getStatusText(order.status)}
			  </span>
			</td>
			<td>{order.total_price}</td>
		  </tr>
		  {/each}
		</tbody>
	  </table>
	  {/if}
	</div>
  </body>
  