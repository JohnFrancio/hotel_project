<template>
	<v-row align="center" class="mt-2 mx-16" justify="center">
		<v-col cols="12" sm="6">
			<v-img class="ms-sm-10" src="../assets/404.png" width="100%" height="100%"></v-img>
		</v-col>
		<v-col cols="12" sm="6" class="text-center mt-10">
			<span class="text-h1" style="color:#0862a0;">4 0 4</span><br>
			<p class="text-h4">Page introuvable</p> <br>
			<div class="text-start ms-10">
				<p class="text-h5">La page que vous recherchez semble introuvable.</p> <br>
				<p>Code d'erreur : 404</p> <br>
				<p>Voici quelque liens utiles à la place :</p>
				<v-btn color="red-lighten-1" variant="text" @click="this.$router.push('/')">Page d'accueil</v-btn> <br>
				<v-btn color="red-lighten-1" @click="this.$router.push('/hotel')" variant="text">Voir hotel</v-btn> <br>
				<v-btn color="red-lighten-1" @click="this.$router.push('/connexion')" variant="text">Page de connexion</v-btn>
			</div>
		</v-col>
	</v-row>
</template>

<script>
	export default{
		name: 'NotFound'
	}
</script>