<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">SideBar</span>
			<ul class="collapsible">
				<li>
					<div class="collapsible-header">⚪ Lipidos</div> 
					<div class="collapsible-body">
					 <h6>Tamaño ++</h6>


					</div>
				</li>
				<li>
					<div class="collapsible-header">🔵 Carbohidratos</div>
					<div class="collapsible-body"><h6>Velocidad ++</h6></div>
				</li>
				<li>
					<div class="collapsible-header">🔴 Proteina</div>
					<div class="collapsible-body"><h6> Resistencia ++</h6></div>
				</li>
			</ul>
		</div>
		<div class="card-action">
		 	<span>AutoSelect</span>	
			 <div class="switch">
			 	<label>
			 		Off
			 		<input v-model='autoselect' type="checkbox" checked>
			 		<span class="lever"></span>
			 		On
			 	</label>
			 </div>
		</div>

	</div>
</template>
<script type="text/javascript">
	
	export default {
		data() {
			return {
				elems: '',
				inst: '',
				autoselect: true
			}
		},
		mounted: function(){
			this.elems = document.querySelectorAll('.collapsible');
   		 	this.inst = M.Collapsible.init(this.elems);


			console.log(this.elems)
   		 	setInterval(this.lastFood,500);
		},
		methods: {
			lastFood: function(){
				if(this.autoselect){
					var lastFood =  this.$store.state.cell.lastFood


				var typesFood = ['Lipido', 'Carbohidrato', 'Proteina'];

				this.inst[0].open(typesFood.indexOf(lastFood))
				}
				return lastFood
			}
		}

	}
</script>
