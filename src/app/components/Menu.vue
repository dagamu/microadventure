<template>
    <div class="card">
        <div class="card-content">
        	<span class="card-title">Menu</span>
        	<table>
        		<thead>
        			<th>Prop</th>
        			<th>Value</th>
        		</thead>
        		<tbody>
        			<tr v-for='(value, name) in cell'>
        				<td> {{ name }}</td>
        				<td> {{ value }}</td>
        			</tr>
        		</tbody>
        	</table>
        </div>

    </div>
</template>
<script>
	export default {
		computed: {
			cell: function(){
				return this.$store.state.cell
			}
		}
	}
</script>
