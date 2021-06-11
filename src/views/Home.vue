<template>
  <div class="nes-container with-title">
    <p class="title">
      Search Criteria
    </p>
    <div class="row align-items-center">
      <div class="col-sm">
        <div class="nes-select py-2">
          <select required="" id="default_select">
            <option value="" disabled="" selected="" hidden="">Chain</option>
            <option value="0">To be</option>
            <option value="1">Not to be</option>
          </select>
        </div>
      </div>
      <div class="col-sm py-2">
        <div class="nes-field">
          <input type="text" id="name_field" placeholder="Address" class="nes-input">
        </div>
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
            <td>
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
            <td>
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
</template>

<script>

export default {

}
</script>
