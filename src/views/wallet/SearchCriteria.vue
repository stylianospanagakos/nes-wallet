<template>
    <container title="Search Criteria" :disabled="wallet.form.loading">
      <div class="row align-items-center">
        <div class="col-sm">
          <select-input
            placeholder="Chain"
            :options="networkOptions"
            v-model="chainIdValue"
            :error="wallet.form.chainId.error"
          />
        </div>
        <div class="col-sm">
          <input-text
            placeholder="Address"
            v-model="addressValue"
            :error="wallet.form.address.error"
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
import {mapGetters, mapMutations} from 'vuex';

export default {
  computed: {
    ...mapGetters(['wallet', 'networkOptions']),
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
            error: this.isFieldEmpty(value)
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
            error: this.isFieldEmpty(value)
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
    isFieldEmpty(value) {
        return value.length ? '' : 'Field cannot be empty';
    },
    searchClicked() {
        this.updateFormField({
          section: 'wallet',
          field: 'loading',
          payload: true
        });
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
