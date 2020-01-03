<template>
<q-page class="q-pa-md">
  <q-card flat bordered>
    <q-card-section>
      <div class="row q-gutter-x-md no-wrap justify-center q-py-sm">
        <div class="col-3">
          <q-card flat bordered>
            <q-card-section>
              <q-input class="q-pb-xs"
                v-model="details"
                filled
                label="Detalle"
              />
              <div>
                <q-uploader
                url="http://localhost:4444/upload"
                style="max-width: 300px"
              />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-card>
</q-page>
</template>
<script>
export default {
  data() {
    return {
      order_images: null,
      details: '',
      from_address: '',
      from_latitude: -17.783384,
      from_longitude: -63.18203,
      to_address: '',
      to_latitude: -17.783384,
      to_longitude: -63.18203,

      user_identifier: 'f098ca9ec28803',
      operator_token: 'ca3686de8b9cd13abcb362e09e494210',
      access_token: '36a993750ffd0e47db62b0036dc13ed722965726976aafdb676af5d0b91e892d'
    }
  }
}
</script>