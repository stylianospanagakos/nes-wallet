<template>
    <container title="Search Criteria" :disabled="wallet.form.loading">
      <div class="row align-items-center">
        <div class="col-sm">
          <select-input
            placeholder="Chain"
            :options="options"
            v-model="chainIdValue"
          />
        </div>
        <div class="col-sm">
          <input-text
            placeholder="Address"
            v-model="addressValue"
          />
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-sm">
          <check-box
            label="Show TXs"
            v-model="showTransactionsValue"
          />
        </div>
        <div class="col-sm">
          <action-button
            @click="searchClicked"
          >Search</action-button>
        </div>
      </div>
    </container>
</template>

<script>
import Container from '../../components/Container.vue';
import SelectInput from '../../components/SelectInput.vue';
import InputText from '../../components/InputText.vue';
import CheckBox from '../../components/CheckBox.vue';
import ActionButton from '../../components/ActionButton.vue';
import {mapState, mapMutations} from 'vuex';

export default {
  computed: {
    ...mapState(['wallet']),
    chainIdValue: {
      get() {
        return this.wallet.form.chainId.value;
      },
      set(value) {
        this.updateFormField({
          section: 'wallet',
          field: 'chainId',
          payload: {
            value,
            error: ''
          }
        });
      }
    },
    addressValue: {
      get() {
        return this.wallet.form.address.value;
      },
      set(value) {
        this.updateFormField({
          section: 'wallet',
          field: 'address',
          payload: {
            value,
            error: ''
          }
        });
      }
    },
    showTransactionsValue: {
      get() {
        return this.wallet.form.showTransactions;
      },
      set(value) {
        this.updateFormField({
          section: 'wallet',
          field: 'showTransactions',
          payload: value
        });
      }
    }
  },
  methods: {
    ...mapMutations(['updateFormField']),
    searchClicked() {
      alert('test');
    }
  },
  components: {
    Container,
    SelectInput,
    InputText,
    CheckBox,
    ActionButton
  }
}
</script>
