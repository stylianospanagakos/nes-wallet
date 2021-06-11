<template>
  <div>
    <div class="nes-container with-title">
      <p class="title">
        Search Criteria
      </p>
      <div class="row align-items-center">
        <div class="col-sm">
          <select-input
            placeholder="Chain"
            :options="options"
            v-model="chainId"
          />
        </div>
        <div class="col-sm py-2">
          <input-text
            placeholder="Address"
            v-model="address"
          />
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-sm py-2">
          <label>
            <input type="checkbox" class="nes-checkbox" checked />
            <span>Show Balances</span>
          </label>
        </div>
        <div class="col-sm py-2">
          <button type="button" class="nes-btn is-primary">Search</button>
        </div>
      </div>
    </div>

    <div class="my-5"></div>
    
    <div class="nes-container with-title">
      <p class="title">
        <img class="nes-avatar is-rounded" alt="Gravatar image example" src="https://www.covalenthq.com/static/images/icons/display-icons/fantom-ftm-logo.png" style="image-rendering: pixelated;">
        Balances
      </p>
      <div class="row align-items-center">
        <div class="col">
          <p class="my-0">Total: $3204.50</p>
        </div>
        <div class="col text-end">
          <button
            type="button"
            class="nes-btn is-primary"
            @click="expanded = !expanded"
          >{{ expanded ? 'Hide' : 'Expand' }} Details</button>
        </div>
      </div>
      <div v-show="expanded" class="nes-table-responsive mt-4">
        <table class="nes-table is-bordered is-centered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Balance</th>
              <th>History</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fantom (FTM)</td>
              <td>20.8384</td>
              <td>$5.79</td>
              <td class="text-center">
                <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-default').showModal();">
                  View
                </button>
              </td>
            </tr>
            <tr>
              <td>Uniswap V2 (UNI-V2)</td>
              <td>13.5622</td>
              <td>$2.45</td>
              <td class="text-center">
                <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-default').showModal();">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="my-5"></div>

    <div class="nes-container with-title">
      <p class="title">
        <img class="nes-avatar is-rounded" alt="Gravatar image example" src="https://www.covalenthq.com/static/images/icons/display-icons/fantom-ftm-logo.png" style="image-rendering: pixelated;">
        TXs
      </p>
      <div class="nes-table-responsive">
        <table class="nes-table is-bordered is-centered">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>When</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>In</td>
              <td>1.3782</td>
              <td>
                <span class="nes-text is-success">Success</span>
              </td>
              <td>2 Jun 21, 17:37</td>
              <td class="text-center">
                <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-default').showModal();">
                  View
                </button>
                <dialog class="nes-dialog is-rounded" id="dialog-default">
                  <form method="dialog">
                    <p class="title">Dialog</p>
                    <p>Alert: this is a dialog.</p>
                    <menu class="dialog-menu">
                      <button class="nes-btn">Cancel</button>
                      <button class="nes-btn is-primary">Confirm</button>
                    </menu>
                  </form>
                </dialog>
              </td>
            </tr>
            <tr>
              <td>Out</td>
              <td>5.01231</td>
              <td>
                <span class="nes-text is-error">Fail</span>
              </td>
              <td>2 Jun 21, 17:37</td>
              <td class="text-center">
                <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-default').showModal();">
                  View
                </button>
                <dialog class="nes-dialog is-rounded" id="dialog-default">
                  <form method="dialog">
                    <p class="title">Dialog</p>
                    <p>Alert: this is a dialog.</p>
                    <menu class="dialog-menu">
                      <button class="nes-btn">Cancel</button>
                      <button class="nes-btn is-primary">Confirm</button>
                    </menu>
                  </form>
                </dialog>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SelectInput from '../components/SelectInput.vue';
import InputText from '../components/InputText.vue';

export default {
  data() {
    return {
      expanded: false,
      chainId: '',
      address: '',
      options: [
        {
          title: 'Fantom Opera',
          value: 250
        }
      ]      
    }
  },
  components: {
    SelectInput,
    InputText
  }
}
</script>
