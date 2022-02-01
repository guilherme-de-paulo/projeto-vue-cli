<template>
  <v-container class="pa-8" fluid>
    <h1 class="h1">Meu dados pessoais</h1>
    <v-form>
      <v-container>
        <v-text-field label="Nome completo" v-model="nomeCompleto"></v-text-field>
        <div class="form-group">
                    <label for="dataNascimentoㅤ"><i>Data de nascimentoㅤ</i></label>
                    <input type="date" name="dataNascimento" id="dataNascimento" class="inputUser" required />
                  </div>
                  <div class="form-group">
                    <label for="inputLastName"><i>Gêneroㅤ</i></label>
                    <select id="Gênero">
                    <option value="Selecione">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                    <option value="Prefiro não dizer">Prefiro não dizer</option>
                </select>  
                </div>
                <div class="form-group">
                    <label for="inputLastName"><i>Estadoㅤ</i></label>
                    <select id="Estado">
                    <option value="Selecione">Selecione</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RR">RR</option>
                    <option value="RO">RO</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                </select>  
                </div>
        <v-text-field label="Cidade" v-model="cidade"></v-text-field>
        <v-btn color="primary" @click="salvarPerfil">Salvar dados</v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      nomeCompleto: "",
      dataNascimento: "",
      genero: "",
      estado: "",
      cidade: "",
      uid: "",
      temPerfil: false,
    };
  },
  async mounted() {
    this.uid = fb.auth.currentUser.uid;
    const userProfile = await fb.profileCollection
      .where("uid", "==", this.uid)
      .get();
    if (userProfile.docs.length > 0) {
      this.temPerfil = true;
      const perfil = userProfile.docs[0];
      this.profileId = perfil.id;
      this.nomeCompleto = perfil.data().nomeCompleto;
      this.dataNascimento= perfil.data().dataNascimento;
      this.genero = perfil.data().genero;
      this.estado = perfil.data().estado;
      this.cidade = perfil.data().cidade;

    }
  },
  methods: {
    async salvarPerfil() {
      if (this.temPerfil) {
        await fb.profileCollection.doc(this.profileId).update({
          nomeCompleto: this.nomeCompleto,
          dataNascimento: this.dataNascimento,
          genero: this.genero,
          estado: this.estado,
          cidade: this.cidade,
        });
      } else {
        await fb.profileCollection.add({
          uid: this.uid,
          nomeCompleto: this.nomeCompleto,
          dataNascimento: this.dataNascimento,
          genero: this.genero,
          estado: this.estado,
          cidade: this.cidade,
        });
      }
    },
  },
};
</script>

<style>
</style>